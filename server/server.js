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

app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
  });
  
  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  });
  
