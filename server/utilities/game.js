const determineWinner = require('./determineWinner')

class Game {
	constructor(){
		this.plays = []
		this.trump;
		this.winner;
	}
	setTrump(suit){
		this.trump = suit;
	}
	played(play){
		this.plays.push(play);
		if(this.plays.length < 4){
			return false
		} else {
			console.log('this.plays has a length of 4')
			this.winner = determineWinner(this.trump, this.plays);
			this.clearTable()
			return true
		}
	}
	getWinner(){
		console.log('getWinner was called and returning', this.winner)
		return this.winner
	}
	clearTable(){
		this.plays = []
	}
}

module.exports = Game