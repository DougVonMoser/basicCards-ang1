app.factory('PlayerFactory', function('httpProvider'){

	var playerObj = {
		getHand: function(){
			$http.get('/')
		}
	}
	return playerObj;
})
