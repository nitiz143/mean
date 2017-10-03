var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var app = express();
var mongoose = require('mongoose');




// Use connect method to connect to the Server
mongoose.connect(config.database, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected with  database');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//routes
var api = require('./app/routes/api')(app, express);
app.use('/api', api);


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(config.port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listen on port 8080");
    }
});