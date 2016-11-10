'use strict'
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use('/api', require('./server/index'))
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.use(express.static(__dirname));

//socket and game logic below - - - - - - - - - - - - - - - - -

let NewHands = require('./server/utilities/newHands')
let newHands;
let Flow = require('./server/utilities/flow')

let openPlayerSlots = [1, 2, 3, 4];
let flow = new Flow();

io.on('connection', function(socket) {
    socket.emit('pickAChair', openPlayerSlots)

    socket.on('satDown', function(chair) {
        console.log('satDown')
        openPlayerSlots.splice(openPlayerSlots.indexOf(chair), 1)
        socket.broadcast.emit('pickAChair', openPlayerSlots)
    })

    socket.on('established', function() {
        console.log('established')
        io.sockets.emit('youreTheDealer', flow.nextDealer())
    })

    socket.on('deal', function() {
        console.log('heard the command to deal')
        newHands = new NewHands();
        io.sockets.emit('goToPregame', newHands)
    })

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
