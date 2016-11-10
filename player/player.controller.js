app.controller('PlayerCtrl', function($state, $scope, $rootScope, PlayerFactory) {

    function removeCardFromHand(card) {
        $scope.hand.splice($scope.hand.indexOf(card), 1)
    }

});
