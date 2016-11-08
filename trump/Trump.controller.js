app.controller('TrumpCtrl', function($scope, $state, $stateParams) {

	$scope.trump = $stateParams.suit;

	$scope.deck = ['clubs','diamonds','hearts','spades'];

	$scope.changeTrump = function(suit){
		socket.emit('trump', suit)
	}


});