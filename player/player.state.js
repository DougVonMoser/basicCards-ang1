app.config(function($stateProvider) {
    $stateProvider
        .state('establish.player', {
            templateUrl: '/player/html/index.html',
            controller: 'PlayerCtrl'
        })
})
