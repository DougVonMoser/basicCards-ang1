app.controller('PlayerCtrl', function($state, $scope, $rootScope, PlayerFactory) {
    socket.on('pregame', function() {
        $state.go('player.pregame')
    })

    function removeCardFromHand(card) {
        $scope.hand.splice($scope.hand.indexOf(card), 1)
    }

    $scope.hand;

    $scope.getHand = function() {
        PlayerFactory.getHand()
            .then(response => {
                $scope.hand = response.hand;
                if (!$scope.player) {
                    $scope.player = response.player;
                }
                // $state.go('player.pregame')
            })
    }
    $scope.playCard = function(card) {
        removeCardFromHand(card);
        PlayerFactory.playCard($scope.player, card)
    }
    $scope.getHand()

});
