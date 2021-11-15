'use strict';
import express from 'express';
import cors from 'cors';

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


app.post('/analyze', (req, res) => {
  const username = req.body["username"];
  const text = req.body["text"];
  
  //later on actually analyze 
  res.send({
    text: text,
    sentiment: 70,
    language: "English"
  });
});


app.patch('/updateSentiment', (req, res) => {
  const username = req.body["username"];
  const text = req.body["text"];
  const sentiment = req.body["sentiment"];
  
  //later on actually analyze 
  res.send({
    valid: true
  });
});


app.patch('/updateLanguage', (req, res) => {
  const username = req.body["username"];
  const text = req.body["text"];
  const language = req.body["update_languages_value"];
  
  //later on actually analyze
  res.send({
    valid: true 
  });
});


app.delete('/delete', (req, res) => {
  const username = req.body["username"];
  const text = req.body["text"];
  
  //later on actually delete
  res.send({
    valid: true
  });
});


app.get('/getUserLog', (req, res) => {
  //req body fields: valid, id, history
  const username = req.body["username"];
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