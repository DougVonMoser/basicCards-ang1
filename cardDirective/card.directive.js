app.directive('card', function() {
  return {
    restrict: 'E',
    scope: {
      card: '='
    },
    link: function(scope, element, attrs, controllers) {

    },
    templateUrl: '/cardDirective/html/index.html'
  };
});

