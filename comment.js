//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/commentDB', { useNewUrlParser: true});

var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Create new comment
app.post('/comment', function(req, res) {
    var new_comment = new Comment(req.body);
    new_comment.save(function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
});

// Retrieve all comments
app.get('/comment', function(req, res) {
    Comment.find({}, function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
});

// Retrieve single comment by id
app.get('/comment/:commentId', function(req, res) {
    Comment.findById(req.params.commentId, function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
});

// Update comment by id
app.put('/comment/:commentId', function(req, res) {
    Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
});

// Delete comment by id
app.delete('/comment/:commentId', function(req, res) {
    Comment.remove({
        _id: req.params.commentId
    }, function(err, comment) {
        if (err)
            res.send(err);
        res.json({ message: 'Comment successfully deleted' });
    });
});

// Launch app to listen to specified port
app.listen(port, function() {
    console.log("Running RestHub on port " + port);
});