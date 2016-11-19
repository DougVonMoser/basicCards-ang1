app.controller('PregameCtrl', function($scope, $rootScope, PlayerFactory) {
    $scope.orderUp = function(suit) {
        socket.emit('orderUp', suit)
    }
    $scope.pass = function() {
        socket.emit('pass')
    }
});
