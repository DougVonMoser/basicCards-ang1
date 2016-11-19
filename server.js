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

let findOtherSuits = require('./server/utilities/findOtherSuits')
let NewHands = require('./server/utilities/newHands')
let newHands;
let possibleSuits;
let Flow = require('./server/utilities/flow')

let openPlayerSlots = [1, 2, 3, 4];
let dealer = new Flow();
let turn = new Flow();
let selectTrump = false;
let currentTrump;



io.on('connection', function(socket) {
    socket.emit('pickAChair', openPlayerSlots)

    socket.on('satDown', function(chair) {
        openPlayerSlots.splice(openPlayerSlots.indexOf(chair), 1)
        socket.broadcast.emit('pickAChair', openPlayerSlots)
    })

    socket.on('established', function() {
        let currentDealer = dealer.next()
        turn.setAfter(currentDealer)
        io.sockets.emit('youreTheDealer', currentDealer)
    })

    socket.on('deal', function() {
        newHands = new NewHands();
        io.sockets.emit('goToPregame', newHands)
        io.sockets.emit('yourTurn', {
            turn: turn.current,
            todo: 'orderOrPass'
        })
    })

    socket.on('pass', function() {
        let newTurn = turn.next();
        if(newTurn === Flow.getAfter(dealer.current)){
            io.sockets.emit('clearTable')
            selectTrump = true;
            possibleSuits = findOtherSuits(newHands.turnOver[0].suit)
        }
        io.sockets.emit('yourTurn', {
            turn: newTurn,
            selectTrump, 
            possibleSuits
        })
    })
    socket.on('orderUp', function(suit){
        if(suit){
            currentTrump = suit;
        } else {
            currentTrump = newHands.turnOver[0].suit;
        }
    })  






    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
