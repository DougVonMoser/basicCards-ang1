const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, './dist/')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));

//socket and game flow below - - - - - - - - - - - - - - - - -

const findOtherSuits = require('./server/utilities/findOtherSuits')
const NewHands = require('./server/utilities/newHands')
const Flow = require('./server/utilities/flow')
const Game = require('./server/utilities/game')

let dealer = new Flow();
let turn = new Flow();
const game = new Game()

let openPlayerSlots = [1, 2, 3, 4];
let selectTrump = false;
let newHands;
let possibleSuits;



io.on('connection', function(socket) {
    console.log('buhneckted')
    socket.emit('pickAChair', openPlayerSlots)
    socket.emit('fuck', 'something')

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
            turn: turn.setAfter(dealer.current),
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
            possibleSuits,
            state: game.getState()
        })
    })

    socket.on('orderUp', function(suit){
        // if not suit, then assume a card needs to be swapped
        if(!suit){
            io.sockets.emit('trumpSwap', newHands.turnOver[0], newHands.turnOver[0].suit);
            return
        }
        let currentTrump;
        if(suit){
            currentTrump = suit;
        } else {
            currentTrump = newHands.turnOver[0].suit;
        }
        //set player after dealer to their turn
        game.setTrump(currentTrump)
        io.sockets.emit('table-setTrump', currentTrump)
        let firstTurn = turn.setAfter(dealer.current)
        console.log('emitting a true gamePlay')
        io.sockets.emit('yourTurn', {
            turn: firstTurn,
            gamePlay: true,
            state: game.getState()
        })
    })

    socket.on('cardPlayed', function(play){
        let nextTurn;
        let thatWasTheFourthCard = game.played(play)
        io.sockets.emit('table-cardPlayed', game.getState())
        if(thatWasTheFourthCard){
            nextTurn = turn.set(game.getWinner())
            game.clearPlays();
        } else {
            nextTurn = turn.next();
        }
        if(game.gamesCompleted < 5){
            console.log(game.getState())
            io.sockets.emit('yourTurn', {
                turn: nextTurn,
                gamePlay: true,
                state: game.getState()
            })
        } else {
            game.resetGamesCompleted()
            io.sockets.emit('youreTheDealer', dealer.next())
        }
    })

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
