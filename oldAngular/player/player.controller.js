app.controller('PlayerCtrl', function($state, $scope, $rootScope, playerFactory) {

    $scope.chairs;
    $scope.player;
    $scope.dealer;
    $scope.established;
    $scope.turnOver;
    $scope.gamePlay;
    $scope.restricted;
    $scope.trump;

    socket.on('pickAChair', function(chairs) {
        $scope.chairs = chairs;
        $scope.$evalAsync();

        //if im the last person, sit my ass down
        if ($scope.chairs.length === 1 && !$scope.player) {
            $scope.sitIn($scope.chairs[0], true)
            socket.emit('established');
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
    socket.on('trumpSwap', function(turnOver, trump){
        console.log('finding dealer', turnOver)
        $state.go('player')
        if (!$scope.dealer){
            $scope.myTurn = false
            return
        }
        console.log('dealer received orders to swap trump')
        $scope.swapped = true;
        $scope.myTurn = true
        $scope.gamePlay = true;
        $scope.trump = trump;
        $scope.hand.push(turnOver);
        $scope.hand.forEach(card => {
            card.enabled = true;
        })
        $scope.$evalAsync()
    })

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
            console.log('SETTING scope.gameplay to true')
            $scope.gamePlay = true;
            $state.go('player')
        }
        if($scope.gamePlay){
        let leadSuit;
            // if there is a lead card played on the table
            if(turnObj.state.plays.length > 0 && $scope.myTurn){
                leadSuit = playerFactory.getLeadSuit(turnObj.state);
                $scope.restricted = $scope.hand.some(card => {
                let isLeftBower = playerFactory.isLeftBower(card, turnObj.state.trump);
                    if((card.suit === leadSuit && !isLeftBower ) || (leadSuit === turnObj.state.trump && isLeftBower)){
                        return true
                    }
                })
                console.log("restricted? ", $scope.restricted)
                if($scope.restricted){
                    // i want to do stuff if the card isnt of the lead unless trump led and card is jack
                    $scope.hand.forEach(card => {
                    let isLeftBower = playerFactory.isLeftBower(card, turnObj.state.trump);
                    console.log("leftBower?", isLeftBower)
                        if((card.suit === leadSuit && !isLeftBower ) || (leadSuit === turnObj.state.trump && isLeftBower)){
                            card.enabled = true;
                        } else {
                            card.enabled = false;
                        }
                    })
                } else {
                    console.log('all cards enabled')
                    $scope.hand.forEach(card => {card.enalbed = true})
                }

            } else {
                // there is not a lead card on the table
                console.log('lead card about to be played')
                $scope.restricted = false;
                $scope.hand.forEach(card => {card.enabled = true})
            }
        }
        $scope.$evalAsync()
    })

    function removeCardFromHand(card) {
        $scope.hand.splice($scope.hand.indexOf(card), 1)
    }

    $scope.playCard = function(card, swapped){
        $scope.dealer = false;
        removeCardFromHand(card)
        console.log('$scope.gamePlay is not getting set to true', $scope.gamePlay)
        console.log('swapped', swapped)
        if (!$scope.gamePlay || swapped){
            console.log('im ordering up in a way')
            $scope.swapped = false;
            socket.emit('orderUp', $scope.trump)
        } else  {
            console.log('im playing a card actually')
            socket.emit('cardPlayed', {player: $scope.player, card})
        }
    }
});
