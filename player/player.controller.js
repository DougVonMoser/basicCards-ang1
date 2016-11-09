app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory) {
    function removeCardFromHand(card) {
        $scope.hand.splice($scope.hand.indexOf(card), 1)
    }

    $scope.hand;

    $scope.getHand = function() {
        PlayerFactory.getHand()
            .then(response => {
                $scope.hand = response.hand;
                if(!$scope.player){
                    $scope.player = response.player;
                }
            })
    }
    $scope.playCard = function(card) {
        removeCardFromHand(card);
        PlayerFactory.playCard($scope.player, card)
    }
    $scope.getHand()
});
