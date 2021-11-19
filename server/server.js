'use strict';
import express from 'express';
import cors from 'cors';
import AWS from "aws-sdk";
import dateTime from "node-datetime";
import expressSession from 'express-session'; // for managing session state    
import passport from 'passport'; // handles authentication
import passportLocal from 'passport-local';
import path from 'path';
import { get_auth, put_auth, put_data, update_sentiment_data, update_language_data, delete_data, get_data } from './crud.js'
import e from 'express';


let __dirname = path.resolve();

const LocalStrategy = passportLocal.Strategy; // username/password strategy
AWS.config.loadFromPath("secrets.json");
const comprehend = new AWS.Comprehend();
const app = express();
const port = 5500;

// Session configuration

const session = {
  secret: process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
  resave: false,
  saveUninitialized: false
};

let users = {}; //list of users, will create mongodb for this


const findUser = (name) => {
  return users[name];
}

const validatePassword = (usr, pwd) => {
  return (users[usr] === pwd);
}

// Passport configuration
const strategy = new LocalStrategy(
  async (username, password, done) => {
    if (!findUser(username)) {
      // no such user
      return done(null, false, { 'message': 'Wrong username' });
    }
    if (!validatePassword(username, password)) {
      // invalid password
      // should disable logins after N messages
      // delay return to rate-limit brute-force attacks
      await new Promise((r) => setTimeout(r, 2000)); // two second delay
      return done(null, false, { 'message': 'Wrong password' });
    }
    // success!
    // should create a user object here, associated with a unique identifier
    return done(null, username);
  });



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('client'));

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});


app.post('/login', async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  //could do something more with sessions
  let db_response = await get_auth(username, password);
  
  if (db_response.password === password) {
    res.send({
      valid: true,
      username: username
    });
  }

  else {
    res.send({
      valid: false
    })
  }


});


app.post('/signup', async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  let db_response = await put_auth(username, password);

  //later on, check if in database, if so, return response.valid = false
  if (db_response) {
    res.send({
      valid: true,
      username: username
    });
  }
  else {
    res.send({
      valid: false
    })
  }

});


app.post('/analyze/:username', (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  const date = dateTime.create().format('Y-m-d H:M:S');
  let sentiment = null;
  let language = null;

  comprehend.detectDominantLanguage({ Text: text }, async function (err, data) {
    if (err) {
      console.log(err, err.stack);
    }
    else {
      let iso = data["Languages"].slice(-1)[0]["LanguageCode"];

      if (iso === 'en') {
        language = 'ENGLISH';
      }
      else if (iso === 'es') {
        language = 'SPANISH';
      }
      else if (iso === 'fr') {
        language = 'FRENCH';
      }
      else if (iso === 'de') {
        language = 'GERMAN';
      }
      else if (iso === 'pt') {
        language = 'PORTUGUESE';
      }
      else if (iso === 'ar') {
        language = 'ARABIC';
      }
      else if (iso === 'hi') {
        language = 'HINDI';
      }
      else if (iso === 'ja') {
        language = 'JAPANESE';
      }
      else if (iso === 'ko') {
        language = 'KOREAN';
      }
      else if (iso === 'zh') {
        language = 'CHINESE';
      }
      else if (iso === 'zh-TW') {
        language = 'CHINESE (T)';
      }
      else {
        iso = 'en';
        language = 'NONE';
      }

      comprehend.detectSentiment({ Text: text, LanguageCode: iso }, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        }
        else {
          sentiment = data["Sentiment"];

          //later on actually analyze and store results in database
          res.send({
            valid: true,
            text: text,
            sentiment: sentiment,
            language: language
          });
        }
      });
    }
  });
});


app.patch('/updateSentiment/:username', async (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  const sentiment = req.body["sentiment"];

  //later on actually analyze 
  res.send({
    valid: true
  });
});


app.patch('/updateLanguage/:username', async (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  const language = req.body["update_languages_value"];

  //later on actually analyze
  res.send({
    valid: true
  });
});


app.delete('/delete/:username', async (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];

  //later on actually delete
  res.send({
    valid: true
  });
});


app.get('/getUserLog/:username', async (req, res) => {
  //req body fields: valid, id, history
  const username = req.params.username;
  let userLogs = await get_data(username);

  res.send(JSON.stringify({
    valid: true,
    data: userLogs
  }));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '/client/login.html'));
});


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});