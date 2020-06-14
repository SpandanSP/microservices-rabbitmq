const amqp = require('amqplib');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');


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

app.post('/send_msg', function (req, res) {
  try {
    if (req.body.hasOwnProperty("text")) {

      let msg = { "text": req.body.text };
      connect();
      async function connect() {
        try {
          const connection = await amqp.connect("amqp://localhost:5672");
          const channel = await connection.createChannel();
          const result = await channel.assertQueue("jobs");
          channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
          console.log("Msg sent successfully", msg.text);
          res.json({ status: true, message: "Msg sent successfully" });


        } catch (error) {
          console.error(error);
          res.json({ status: false, message: error });
        }
      }

    }
    else {
      res.json({ status: false, message: "text parameter missing" });
    }
  } catch (er) {
    console.log("error occurred : " + er);
    res.json({ status: false, message: er });
  }
});

