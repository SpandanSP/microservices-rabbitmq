const amqp = require('amqplib');

module.exports = {

  configure: function (app, connection, channel, result) {
    let consumeData = [];
    
    //Listening to channel and pushing all messages.
    channel.consume("jobs", (message) => {

      let input = JSON.parse(message.content.toString());
      console.log("Recived job with input:", input);
      consumeData.push(input);

    });

    //Recives message from publisher and sends to rabbitmq
    app.post('/messageSender', function (req, res) {
      try {
        if (req.body !== undefined) {

          let msg = { "text": req.body.text };

          channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
          console.log("Msg sent successfully", msg.text);
          res.json({ status: true, message: "Msg sent successfully" });
        }
        else {
          res.json({ status: false, message: "Data is missing" });
        }
      } catch (er) {
        console.log("error occurred : " + er);
        res.json({ status: false, message: er });
      }
    });

    //Returns all consumed data
    app.get('/recieveMsg', function (req, res) {
      try {
        // console.log("data====", data)
        let input = consumeData;
        res.json({ status: true, "message": input });
      } catch (er) {
        console.log("error occurred : " + er);
        res.json({ status: false, message: er });
      }
    });


  }
}