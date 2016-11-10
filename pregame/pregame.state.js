app.config(function($stateProvider) {
    $stateProvider
        .state('player.pregame', {
            url: '/pregame',
            templateUrl: '/pregame/html/index.html',
            controller: 'PregameCtrl'
        })
})
