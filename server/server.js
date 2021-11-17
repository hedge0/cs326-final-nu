'use strict';
import express from 'express';
import cors from 'cors';
import AWS from "aws-sdk";
import dateTime from "node-datetime";

const comprehend = new AWS.Comprehend();
const app = express();
const port = 5500;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


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
  let sentiment;
  let language;

  comprehend.batchDetectDominantLanguage({ TextList: "I love apples" }, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    }
    else {
      console.log(data);
      comprehend.detectSentiment({ Text: "I love apples", LanguageCode: "en" }, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        }
        else {
          console.log(data);
        }
      });
    }
  });
  
  //later on actually analyze and store results in database
  res.send({
    text: text,
    sentiment: sentiment,
    language: language
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