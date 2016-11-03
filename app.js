var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var submissions = require('./routes/submissions');

var app = express();

app.set('port', (process.env.PORT || 5000));

// parse json bodies in post requests
app.use(bodyParser.json());

// serve all files out of public folder
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/submissions', submissions);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
