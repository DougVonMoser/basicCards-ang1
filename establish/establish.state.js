app.config(function($stateProvider) {
    $stateProvider
        .state('establish', {
            url: '/player',
            templateUrl: '/establish/html/index.html',
            controller: 'EstablishCtrl'
        })
})
