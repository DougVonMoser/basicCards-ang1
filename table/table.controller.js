app.controller('TableCtrl', function($scope, $rootScope, PlayerFactory) {

    socket.on('goToPregame', function(newHands) {
    	$scope.state = undefined
        $scope.trumpSelected = false;
        $scope.turnOver = newHands.turnOver[0]
        $scope.$evalAsync()
    })

    socket.on('table-setTrump', function(trump){
    	$scope.trumpSelected = true;
    	$scope.trump = trump;
        $scope.$evalAsync()
    })

    socket.on('table-cardPlayed', function(state){
    	console.log(state)
    	$scope.state = state;
        $scope.$evalAsync()

    })
});
