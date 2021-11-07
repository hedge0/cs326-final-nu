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



//four different requests:
// '/analyze' 
// '/updateSentiment'
//'/updateLanguage'
app.post('/analyze', (req, res) => {
  const username = req.body["username"];
  const sentiment = req.body["update_sentiment_value"]
  const language = req.body["update_languages_value"]
  res.send({
    valid: true//later on actually analyze 
  });
});
=
app.post('/updateSentiment', (req, res) => {
  const username = req.body["username"];
  const sentiment = req.body["update_sentiment_value"]
  res.send({
    valid: true//later on actually analyze 
  });
})
app.post('/updateLanguage', (req, res) => {
  const username = req.body["username"];
  const language = req.body["update_languages_value"]
  res.send({
    valid: true//later on actually analyze 
  });
});


//get user log

app.get('/getUserLog', (req, res) => {
  //req body fields: valid, id, history
  let response = [
    {'text':'RECORD HIGH', 'sentiment':'80', 'languages':'English', 'date':'10/14/1990'},
    {'text':'RECORD HIGH', 'sentiment':'80', 'languages':'English', 'date':'10/14/1990'},
    {'text':'RECORD HIGH', 'sentiment':'80', 'languages':'English', 'date':'10/14/1990'},
    {'text':'RECORD HIGH', 'sentiment':'80', 'languages':'English', 'date':'10/14/1990'}
  ];

  res.send(response);

});




app.get('*', (req, res) => {
  res.send('NO FOOL, BAD COMMAND');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

