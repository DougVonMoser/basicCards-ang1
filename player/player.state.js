app.config(function($stateProvider) {
    $stateProvider
    .state('player1', {
        url: '/player1',
        templateUrl: '/player/html/index.html',
        controller: 'PlayerCtrl'
    })
    .state('player2', {
        url: '/player2',
        templateUrl: '/player/html/index.html',
        controller: 'PlayerCtrl'
    })
    .state('player3', {
        url: '/player3',
        templateUrl: '/player/html/index.html',
        controller: 'PlayerCtrl'
    })
    .state('player4', {
        url: '/player4',
        templateUrl: '/player/html/index.html',
        controller: 'PlayerCtrl'
    })
})
