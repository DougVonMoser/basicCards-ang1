app.controller('EstablishCtrl', function($state, $scope, $rootScope, PlayerFactory) {
    $scope.chairs;
    $scope.player;
    $scope.dealer;
    $scope.established;
    socket.on('pickAChair', function(chairs) {
        $scope.chairs = chairs;
        $scope.$evalAsync()
        if ($scope.chairs.length === 1 && !$scope.player) {
            $scope.sitIn($scope.chairs[0], true)
            socket.emit('established')
        }
    })
    $scope.sitIn = function(chair, final) {
        $scope.chairs.splice($scope.chairs.indexOf(chair), 1)
        $scope.player = chair
        if (!final) {
            socket.emit('satDown', chair)
        }
    }
    socket.on('youreTheDealer', function(dealer) {
        console.log('youreTheDealer', dealer)
        if ($scope.player === dealer) {
            $scope.dealer = true;
        }
        $scope.$evalAsync()
    })
    $scope.deal = function() {
        socket.emit('deal')
    }
    socket.on('goToPregame', function(hands) {
        $scope.hand = hands[$scope.player]
        $scope.established = true;
        console.log('got the command to go to pregame')
        $state.go('establish.player.pregame')
    })
});
