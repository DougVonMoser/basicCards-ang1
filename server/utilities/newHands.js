let Euchre24 = require('./card')
let deck = new Euchre24()

class NewHands extends Euchre24 {
    constructor() {
        super()
        for (let i = 1; i < 5; i++) {
            this[i] = this.draw(5)
        }
        this.turnOver = this.draw(1)
    }
}


module.exports = NewHands;
