app.controller('PlayerCtrl', function($state, $scope, $rootScope, PlayerFactory) {

    $scope.chairs;
    $scope.player;
    $scope.dealer;
    $scope.established;
    $scope.turnOver;
    $scope.gamePlay;
    $scope.restricted;

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
        $scope.gamePlay = false;
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
                console.log(turnObj.state)

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
            $scope.gamePlay = true;
            $state.go('player')
        }
        let leadSuit;
        if($scope.gamePlay){
            // if there is a lead card played on the table
            if(turnObj.state.plays.length > 0 && $scope.myTurn){
                leadSuit = turnObj.state.plays[0].card.suit;
                $scope.restricted = $scope.hand.some(card => {
                    if(card.suit === leadSuit){
                        return true
                    }
                })
                console.log('are you restricted? ', $scope.restricted)
                if($scope.restricted){
                    $scope.hand.forEach(card => {
                        if(card.suit !== leadSuit){
                            card.disabled = true;
                        }
                    })
                } else {
                    console.log('all disables are cleared')
                    $scope.hand.forEach(card => {card.disabled = false})
                }

            } else {
                // there is not a lead card on the table
                console.log('lead card about to be played')
                $scope.restricted = false;
                $scope.hand.forEach(card => {card.disabled = false})
            }
        }
        $scope.$evalAsync()
    })

    function removeCardFromHand(card) {
        $scope.hand.splice($scope.hand.indexOf(card), 1)
    }
    
    $scope.playCard = function(card){
        $scope.dealer = false;
        socket.emit('cardPlayed', {player: $scope.player, card})
        removeCardFromHand(card)
    }
});
