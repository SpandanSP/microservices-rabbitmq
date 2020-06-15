//Require 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');




//Require Routes
let consumer = require('./service/consumer');


//Setting Port
app.set('port', (process.env.PORT || 5002));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send("Consumer Server Started!");
});

app.listen(app.get('port'), function () {
  console.log('Consumer Server is running on port', app.get('port'));
});


//Configure Routes
consumer.configure(app);
