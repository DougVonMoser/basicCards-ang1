app.controller('PlayerCtrl', function($state, $scope, $rootScope, PlayerFactory) {
    $scope.chairs;
    $scope.player;
    $scope.dealer;
    $scope.established;
    $scope.turnOver;
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
        $scope.turnOver = hands.turnOver;
        $scope.hand = hands[$scope.player]
        $scope.established = true;
        if (!$state.is('table')) {
            $state.go('player.pregame')
        }
    })

    socket.on('yourTurn', function(turnObj) {
        if (turnObj.turn === $scope.player) {
            $scope.myTurn = true;
            if(turnObj.selectTrump){
                $scope.selectTrump = true;
                $scope.possibleSuits = turnObj.possibleSuits
            }
        } else {
            $scope.myTurn = false;
        }
        if(turnObj.gamePlay === true){
            $state.go('player')
        }
        $scope.$evalAsync()
    })

    function removeCardFromHand(card) {
        $scope.hand.splice($scope.hand.indexOf(card), 1)
    }
    $scope.playCard = function(card){
        if(!$scope.myTurn){
            return
        }
        socket.emit('cardPlayed', {player: $scope.player, card})
        removeCardFromHand(card)
    }
});
