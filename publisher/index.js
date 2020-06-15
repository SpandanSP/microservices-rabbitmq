//Require 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');




//Require Routes
let publisher = require('./service/publisher');


//Setting Port
app.set('port', (process.env.PORT || 5001));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send("Publisher Server Started!");
});

app.listen(app.get('port'), function () {
  console.log('Publisher Server is running on port', app.get('port'));
});


//Configure Routes
publisher.configure(app);
