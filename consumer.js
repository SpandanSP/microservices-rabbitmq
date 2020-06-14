const amqp = require('amqplib');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');


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


app.get('/recive_msg', function (req, res) {
  try {
    connect();
    async function connect() {
      try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
    
        channel.consume("jobs", (message) => {

          let input = JSON.parse(message.content.toString());
          console.log("Recived job with input:", input);

        }).then(() =>{
          res.json({ status: true, message: "data recieved" });
        })
        
      } catch (error) {
        console.error(error);
        res.json({ status: false, message: error });

      }
    }
  } catch (er) {
    console.log("error occurred : " + er);
    res.json({ status: false, message: er });
  }
});

