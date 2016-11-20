const determineWinner = require('./determineWinner')

class Game {
	constructor(){
		this.plays = []
		this.trump;
		this.winner;
		this.gamesCompleted = 0
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
			this.plays = [];
			this.gamesCompleted++;
			return true
		}
	}
	getWinner(){
		return this.winner
	}
	resetGamesCompleted(){
		this.gamesCompleted = 0;
	}
}

module.exports = Game