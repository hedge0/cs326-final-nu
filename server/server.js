'use strict';

const express = require('express');
app.use(express.json());
const app = express();
const port = 3000;

let datastore = {};

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.post('/login', (req, res) => {
  const username = req.body["username"]
  const password = req.body["password"]

  res.send({
    valid: true,
    id: username
  });
});


app.post('/signup', (req, res) => {
  const username = req.body["username"]
  const password = req.body["password"]

  //later on, check if in database, if so, return response.valid = false
  res.send({
    valid: true,
    id: username
  });
});


// four different requests:
// analyze
// updateSentiment
// updateLanguage
// delete


app.post('/analyze', (req, res) => {
  const username = req.body["username"];
  const text = req.body["text"];
  const sentiment = req.body["sentiment"];
  const language = req.body["language"];
  
  //later on actually analyze 
  res.send({
    valid: true
  });
});

app.post('/updateSentiment', (req, res) => {
  const username = req.body["username"];
  const text = req.body["text"]
  const sentiment = req.body["sentiment"]
  
  //later on actually analyze 
  res.send({
    valid: true
  });
})
app.post('/updateLanguage', (req, res) => {
  const username = req.body["username"];
  const language = req.body["update_languages_value"]
  
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

//get user log
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
    response: userLogs
  }));
});



app.get('*', (req, res) => {
  res.send('NO FOOL, BAD COMMAND');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});