class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

class Euchre24 {
    constructor() {
        this.genDeck()
    }
    genDeck() {
        this.bank = [];
        let values = 'ace 9 10 jack queen king'.split(' ');
        let suits = 'hearts clubs spades diamonds'.split(' ');
        values.forEach(value => {
            suits.forEach(suit => {
                this.bank.push(new Card(suit, value))
            })
        })
        this.shuffle()
    }
    draw(num) {
        if (this.bank.length > num) {
            return this.bank.splice(0, num)
        } else {
            return null
        }
    }
    reset() {
        this.genDeck()
    }
    shuffle() {
        let currentIndex = this.bank.length,
            temporaryValue, randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1;

            temporaryValue = this.bank[currentIndex]
            this.bank[currentIndex] = this.bank[randomIndex]
            this.bank[randomIndex] = temporaryValue;
        }
    }
}

module.exports = Euchre24
