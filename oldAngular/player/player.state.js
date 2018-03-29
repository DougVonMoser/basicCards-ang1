app.config(function($stateProvider) {
    $stateProvider
        .state('player', {
            url: '/player',
            templateUrl: '/player/html/index.html',
            controller: 'PlayerCtrl'
        })
})
