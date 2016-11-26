app.controller('PregameCtrl', function($scope, $rootScope, playerFactory) {
    $scope.orderUp = function(suit) {
        socket.emit('orderUp', suit)
    }
    $scope.pass = function() {
        socket.emit('pass')
    }
});
