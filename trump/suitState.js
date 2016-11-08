app.config(function($stateProvider) {
    $stateProvider
    .state('showOne', {
        url: '/showOne/:suit',
        templateUrl: '/trump/html/showOne.html',
        controller: 'TrumpCtrl'
    })
    .state('showAll', {
        url: '/',
        templateUrl: '/trump/html/showAll.html',
        controller: 'TrumpCtrl'
    })
})
