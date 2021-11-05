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
    //ask elias on what how are we storing username and passwords.
    //really just a guess 
    if (datastore[username] !== null){
      if (datastore[username] === password) {
        res.send(true);
      }
    }
    else {
      res.send(false);
    }
});

app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
  });
  
  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  });
  
