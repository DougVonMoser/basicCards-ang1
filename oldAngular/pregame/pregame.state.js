app.config(function($stateProvider) {
    $stateProvider
        .state('player.pregame', {

            templateUrl: '/pregame/html/index.html',
            controller: 'PregameCtrl'
        })
})
