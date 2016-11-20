function getComplement(suit){
	switch(suit){
		case 'hearts':
			return 'diamonds'
		case 'diamonds':
			return 'hearts'
		case 'spades':
			return 'clubs'
		case 'clubs':
			return 'spades'
	}
}

module.exports = getComplement;