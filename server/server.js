'use strict';
import {join} from 'path';
import {readFileSync, existsSync} from 'fs';
import {parse} from 'url';
import express from 'express';

const app = express();
const port = 5500;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// login endpoint
app.post('/login', (req, res) => {
  const username = req.body["username"]
  const password = req.body["password"]

  console.log(username);

  res.send({
    valid: true,
    username: username
  });
});

// signup endpoint
app.post('/signup', (req, res) => {
  const username = req.body["username"]
  const password = req.body["password"]

  //later on, check if in database, if so, return response.valid = false
  res.send({
    valid: true,
    username: username
  });
});

// analyze endpoint
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

// updateSentiment endpoint
app.post('/updateSentiment', (req, res) => {
  const username = req.body["username"];
  const text = req.body["text"]
  const sentiment = req.body["sentiment"]
  
  //later on actually analyze 
  res.send({
    valid: true
  });
});

// updateLanguage endpoint
app.post('/updateLanguage', (req, res) => {
  const username = req.body["username"];
  const language = req.body["update_languages_value"]
  
  //later on actually analyze
  res.send({
    valid: true 
  });
});

// delete endpoint
app.delete('/delete', (req, res) => {
  const username = req.body["username"];
  const text = req.body["text"];
  
  //later on actually delete
  res.send({
    valid: true
  });
});

// getUserLog endpoint
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


app.get('*', (req, res) => {
  const parsed = parse(req.url, true);
  const filename = parsed.pathname === '/' ? "/client" : parsed.pathname.replace('/', '');
  const  path = join("client/", filename);
  console.log("trying to serve " + path + "...");
  if (existsSync(path)) {
    res.write(readFileSync(path));
    res.end();
  }
});


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});