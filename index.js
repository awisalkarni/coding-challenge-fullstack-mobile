require('dotenv').config()
// Import express
let express = require('express')
// Initialize the app
let app = express();

let bodyParser = require('body-parser');
let mongoose  = require('mongoose');
const path = require('path');

// Setup server port
var port = process.env.PORT || 3000;

// Add the code below to index.js
// Import routes
let apiRoutes = require("./api-routes")
app.use(express.static(__dirname + '/assets'));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/carsome-api', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

var db = mongoose.connection;

// Use Api routes in the App
app.use('/api', apiRoutes)


// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running carsome api on " + port);
});