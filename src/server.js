var express = require('express');
var path = require('path');

const port = process.env.PORT || 8080;
const app = express();

// Starts the express web server on the desired port
app.listen(port, function (error) {
    if(error) {
        console.log(error);
    }
    console.log('Our app is running on http://localhost:' + port);
});

// Makes the static/transpiled files directory accessible through the root of the server
// so the entry point of the app (index.html) can be accessed through the desired url (localhost:3000)
app.use(express.static('dist'))


// Notes REST API
app.route('/note/:id?')
    .get(function (req, res) {
        // param limiters only required if the id is not provided
        if(!req.params.id)
        {
            // params limit, order, start
            // order: asc, desc (defeault: desc). Based on creation date
            // limit: max number of notes to get (default: all)
            // start: where in the sorted notes to begin getting notes (default: 1)
            res.send('Get a random note');
        }
        else {
            res.send('Get a random note' + req.params.id)
        }
    })
    .put(function (req, res) {
        res.send('Update the note')
    })
    .delete(function (req, res) {
        res.send('Delete a note')
});

app.route('/note/add')
    .post(function (req, res) {
        res.send('Add a note')
    })