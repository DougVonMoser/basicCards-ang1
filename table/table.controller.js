app.controller('TableCtrl', function($scope, $rootScope, PlayerFactory) {
    socket.on('goToPregame', function(newHands) {
        console.log(newHands)
        $scope.turnOver = newHands.turnOver[0]
        $scope.$evalAsync()

    })
});
