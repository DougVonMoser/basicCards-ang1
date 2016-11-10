app.config(function($stateProvider) {
    $stateProvider
        .state('establish.player.pregame', {
            templateUrl: '/pregame/html/index.html',
            controller: 'PregameCtrl'
        })
})
