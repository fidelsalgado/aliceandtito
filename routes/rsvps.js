var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource. very cool.');
});

router.post('/', function(req, res, next) {
  var message;
  if (!req.body) message = "Sorry there was an error receiving your rsvp.";
  
  if (!message) {
    var rsvp = req.body.rsvpcheck;
    var name = req.body.name;
    var email = req.body.email;
    var date = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    console.log("Date = " + date);

    if (!rsvp || !name || !email)
      message = "Sorry there was an error receiving your rsvp. Please make sure you " +
                "check the rsvp, enter your name, and email address.";
    else {
      message = "Thank you for RSVPing! We look forward to have you at our wedding.";
      pg.defaults.ssl = true;
      pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');
        client.query({
          text: "INSERT INTO rsvps (rsvp, name, email, date) VALUES ($1, $2, $3, $4)",
          values: [rsvp, name, email, date]
        }, function(err, result) {
          console.log("Successfull insert!");
          console.log("err = " + err);
          console.log("result = " + JSON.stringify(result));
        });
      });
    }
  }

  res.send(message);
});

module.exports = router;
