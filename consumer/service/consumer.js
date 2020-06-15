const axios = require('axios')
const config = require('../config.json');

module.exports = {

  configure: function (app) {

    app.post('/fetchMsg', function (req, res) {
      try {

        axios.get(`${config.brokerUrl}recieveMsg`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }).then((response) => {
          console.log("Message consumed :", response.data)
          res.json({ status: true, message: response.data.message });
        }).catch((error) => {
          res.json({ status: false, message: error });
        })

      } catch (er) {
        console.log("error occurred : " + er);
        res.json({ status: false, message: er });
      }
    });


  }
}