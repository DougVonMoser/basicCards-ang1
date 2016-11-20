const complementOf = require('./getComplement');
let trump;
let leadSuit;

function jackOfTrump(card){
	if(card.suit === trump && card.value === 11){
		return true
	}
}
function jackOfCompliment(card){
	if(card.suit === complementOf(trump) && card.value === 11){
		return true
	}
}
function remainingTrump(card){
	if(card.suit === trump){
		return true
	}
}
function remainingLeadSuit(card){
	if(card.suit === leadSuit){
		return true
	}
}

function determineWinner(suit, plays){
	trump = suit;
	leadSuit = plays[0].card.suit;
	plays.forEach(play =>{
			if(jackOfTrump(play.card)){
				play.rank = play.card.value * 4
			} else if(jackOfCompliment(play.card)){
				play.rank = play.card.value * 3
			} else if(remainingTrump(play.card)){
				play.rank = play.card.value * 2
			} else if(remainingLeadSuit(play.card)){
				play.rank = play.card.value * 1
			} else {
				play.rank = 0
			}
		})
	return plays.reduce((prev, play) => {
			if(play.rank > prev.rank){
				return play
			} else {
				return prev
			}
		}, {rank: 0})
		.player
}

module.exports = determineWinner
