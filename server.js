'use strict'

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', require('./server/index'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname));

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('trump', function(suit) {
        console.log('server recieved: ' + suit);
        socket.broadcast.emit('centerConsole', suit)
    })

    socket.on('newScore', function(scoreObj) {
        socket.broadcast.emit('centerConsole', '')
        socket.broadcast.emit('newScore', scoreObj)
    })

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
