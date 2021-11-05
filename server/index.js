'use strict';



const express = require('express');
const bodyParser = require('body-parser'); 
app.use(express.json()); 
const app = express();
const port = 3000;




app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.post('/login', (req, res) => {
    const k = req.body["username"]
    const v = req.body["password"]
    datastore[k] = v;
    res.send('Sent');
});

app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
  });
  
  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  });
  
