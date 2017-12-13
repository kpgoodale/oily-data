var express = require('express');
var path = require('path');

const port = 3000;
const app = express();

// Starts the express web server on the desired port
app.listen(port, function (error) {
    if(error) {
        console.log(error);
    }
});

// Makes the static/transpiled files directory accessible through the root directory of the server
// so the entry point of the app (index.html) can be accessed through the desired url (localhost:3000)
app.use(express.static('dist'))
