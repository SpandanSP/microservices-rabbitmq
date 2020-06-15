//Require 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const amqp = require('amqplib');



//Require Routes
let broker = require('./service/broker');


//Setting Port
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send("Broker Server Started!");
});

app.listen(app.get('port'), function () {
  console.log('Broker Server is running on port', app.get('port'));
});

//Connection to rabbitmq
connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    
    broker.configure(app, connection, channel, result);

  } catch (error) {
    console.error(error);
  }
}





