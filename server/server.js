'use strict';
import express from 'express';
import cors from 'cors';
import AWS from "aws-sdk";
import passport from 'passport'
import dateTime from "node-datetime";
import expressSession from 'express-session'; // for managing session state    
import passport from 'passport'; // handles authentication


const LocalStrategy = passport.Strategy; // username/password strategy
AWS.config.loadFromPath("secrets.json");
const comprehend = new AWS.Comprehend();
const app = express();
const port = 5500;

// Session configuration

const session = {
  secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
  resave : false,
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
        return done(null, false, { 'message' : 'Wrong username' });
    }
    if (!validatePassword(username, password)) {
        // invalid password
        // should disable logins after N messages
        // delay return to rate-limit brute-force attacks
        await new Promise((r) => setTimeout(r, 2000)); // two second delay
        return done(null, false, { 'message' : 'Wrong password' });
    }
    // success!
    // should create a user object here, associated with a unique identifier
    return done(null, username);
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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


app.post('/login', (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  res.send({
    valid: true,
    username: username
  });
});


app.post('/signup', (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  //later on, check if in database, if so, return response.valid = false
  res.send({
    valid: true,
    username: username
  });
});


app.post('/analyze/:username', (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  const date = dateTime.create().format('Y-m-d H:M:S');
  let sentiment = null;
  let language = null;

  comprehend.detectDominantLanguage({ Text: text }, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    }
    else {
      language = data["Languages"].slice(-1)[0]["LanguageCode"];
      comprehend.detectSentiment({ Text: text, LanguageCode: language }, function (err, data) {
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


app.patch('/updateSentiment/:username', (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  const sentiment = req.body["sentiment"];
  
  //later on actually analyze 
  res.send({
    valid: true
  });
});


app.patch('/updateLanguage/:username', (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  const language = req.body["update_languages_value"];
  
  //later on actually analyze
  res.send({
    valid: true 
  });
});


app.delete('/delete/:username', (req, res) => {
  const username = req.params.username;
  const text = req.body["text"];
  
  //later on actually delete
  res.send({
    valid: true
  });
});


app.get('/getUserLog/:username', (req, res) => {
  //req body fields: valid, id, history
  const username = req.params.username;
  let userLogs = [
    { 'text': 'RECORD HIGH', 'sentiment': '80', 'languages': 'English', 'date': '10/14/1990' },
    { 'text': 'RECORD HIGH', 'sentiment': '80', 'languages': 'English', 'date': '10/14/1990' },
    { 'text': 'RECORD HIGH', 'sentiment': '80', 'languages': 'English', 'date': '10/14/1990' },
    { 'text': 'RECORD HIGH', 'sentiment': '80', 'languages': 'English', 'date': '10/14/1990' }
  ];
  
  res.send(JSON.stringify({
    valid: true,
    data: userLogs
  }));
});


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});