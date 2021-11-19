'use strict';
import express from 'express';
import cors from 'cors';
import AWS from "aws-sdk";
import dateTime from "node-datetime";
import expressSession from 'express-session'; // for managing session state    
import passport from 'passport'; // handles authentication
import passportLocal from 'passport-local';
import path from 'path';
import { Dynamo } from './crud.js'
import e from 'express';


let __dirname = path.resolve();
const LocalStrategy = passportLocal.Strategy; // username/password strategy
AWS.config.loadFromPath("secrets.json");
const comprehend = new AWS.Comprehend();
const table1 = 'auth_table';
const table2 = 'data_table';
const app = express();
const port = 5500;
const db = new Dynamo();


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
  const params = {
      TableName: table1,
      KeyConditionExpression: "username = :val",
      ExpressionAttributeValues: {
          ":val": username
      }
  };
  let db_response = await db.get(params);
  
  if (db_response[0].password === password) {
    res.send({
      valid: true,
      username: username
    });
  }
  else {
    res.send({
      valid: false,
      username: username
    })
  }
});


app.post('/signup', async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];
  const params = {
      TableName: table1,
      Items: {
          username: username,
          password: password
      }
  }
  let db_response = await db.put(params);

  res.send({
    valid: db_response,
    username: username
  });
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
          let params = {
              TableName: table1,
              Items: {
                  username: username,
                  text: text,
                  sentiment: sentiment,
                  language: language,
                  date: date
              }
          }
          let db_response = await db.put(params);

          res.send({
            valid: db_response,
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
  //TO DO
  const params = {
    TableName: table2,
  }

  res.send({
    valid: true
  });
});


app.patch('/updateLanguage/:username', async (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  const language = req.body["update_languages_value"];
  //TO DO
  const params = {
    TableName: table2,
  }

  res.send({
    valid: true
  });
});


app.delete('/delete/:username', async (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  //TO DO
  const params = {
      TableName: table2,
      Key: {
        username: username
      }
  };

  res.send({
    valid: true
  });
});


app.get('/getUserLog/:username', async (req, res) => {
  const username = req.params.username;
  const params = {
      TableName: table2,
      KeyConditionExpression: "username = :val",
      ExpressionAttributeValues: {
          ":val": username
      }
  };
  let userLogs = await db.get(params);

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