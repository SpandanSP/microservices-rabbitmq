const axios = require('axios')
const config = require('../config.json');

module.exports = {

  configure: function (app) {

    app.post('/send_msg', function (req, res) {
      try {
        if (req.body.hasOwnProperty("text")) {

          let msg = { "text": req.body.text };

          axios.post(`${config.brokerUrl}messageSender`, msg, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }).then((response) => {
            // console.log("data", data)
            res.json({ status: true, message: response.data.message });
          }).catch((error) => {
            res.json({ status: false, message: error });
          })
        }
        else {
          res.json({ status: false, message: "text parameter missing" });
        }
      } catch (er) {
        console.log("error occurred : " + er);
        res.json({ status: false, message: er });
      }
    });


  }
}