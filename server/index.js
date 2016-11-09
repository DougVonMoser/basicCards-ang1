let router = require('express').Router();
let Euchre24 = require('./card')

let player = 1;
let cardsReceivedCount = 0;
let deck = new Euchre24()
router.get('/', function(req, res) {
    res.json({
        hand: deck.draw(5),
        player: player++
    })
})

router.post('/', function(req, res) {
    cardsReceivedCount++;
    console.log(req.body)
    if (cardsReceivedCount >= 20) {
        deck = new Euchre24()
        cardsReceivedCount = 0;
    }
    res.sendStatus(200);
})

module.exports = router
