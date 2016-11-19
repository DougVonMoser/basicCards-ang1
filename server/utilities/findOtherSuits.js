module.exports = function(suit){
	 let suits = ['hearts', 'spades', 'diamonds', 'clubs'];
	 suits.splice(suits.indexOf(suit), 1);
	return suits
}