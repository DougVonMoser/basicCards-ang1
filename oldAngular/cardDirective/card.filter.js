app.filter('cardFormat', function(){
	return function(card){
		let str = ''
		if(card.value === 11){
			str += 'J'
		} else if(card.value === 12){
			str += 'Q'
		} else if(card.value === 13){
			str += 'K'
		} else if(card.value === 14){
			str += 'A'
		} else {
			str += '' + card.value
		}
		str += ' of ' + card.suit
		return str
	}
})