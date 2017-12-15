var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //helps parse body of http posts


db.serialize(function () {
    db.run('CREATE TABLE notes (note_id integer PRIMARY KEY, content TEXT, creation_date integer)');
    var stmt = db.prepare('INSERT INTO notes (content,creation_date) VALUES (?,?)');

    stmt.run("some note content goes here", new Date().getTime());
    stmt.run("some nooooooooooote", new Date().getTime());
    stmt.run("another note", new Date().getTime());
    stmt.run("yet another note", new Date().getTime());
    stmt.finalize();
});


// Starts the express web server on the desired port
app.listen(port, function (error) {
    if(error) {
        console.log(error);
    }
    console.log('Our app is running on http://localhost:' + port);
});

// Makes the static/transpiled files and entry point accessible through the root of the server
app.use(express.static('dist'))


// Notes REST API
app.route('/note/:id?')
    .get(function (req, res) {
        if(!req.params.id) // retrieve bulk notes
        {
            // order: asc, desc (default: desc). Based on creation date
            var order = req.query.order ? " ORDER BY creation_date " + req.query.order : " ORDER BY creation_date desc";
            // limit: max number of notes to get (default: all)
            var limit = req.query.limit ? " LIMIT " + req.query.limit : " LIMIT -1";
            // start: where in the sorted notes to begin getting notes (default: 1)
            var offset = req.query.start ? " OFFSET " + req.query.start : " OFFSET 0";
            var sql = ["SELECT * FROM notes",order,limit,offset].join('');
            db.all(sql, function(err, rows){
                res.json(rows);
            });
        }
        else { // retrieve specific note
            var stmt = db.prepare('SELECT * FROM notes WHERE note_id = ?');
            stmt.get(req.params.id, function(err,row) {
                res.json(row);
            });
            stmt.finalize();
        }
    })
    .put(function (req, res) {
        var stmt = db.prepare('UPDATE notes SET content = ? WHERE note_id = ?');
        stmt.run([req.body.text,req.params.id], function(err,row) {
            res.send('updated');
        });
    })
    .delete(function (req, res) {
        var stmt = db.prepare('DELETE FROM notes WHERE note_id = ?');
        stmt.run(req.params.id, function(err,row) {
            res.send('deleted');
        });
});

app.route('/note/add')
    .post(function (req, res) {
        var stmt = db.prepare('INSERT INTO notes (content,creation_date) VALUES (?,?)');
        stmt.run([req.body.text, new Date().getTime()], function(err) {
            // No arrow function used for the callback, because the npm sqlite driver adds properties to "this". it's weird
            res.send('Note added. Note ID: ' + this.lastID)
        });
    })