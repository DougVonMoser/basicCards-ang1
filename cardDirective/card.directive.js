app.directive('card', function() {
  return {
    restrict: 'E',
    scope: {
      cardie: '='
    },
    link: function(scope, element, attrs, controllers) {

    },
    templateUrl: '/cardDirective/html/index.html'
  };
});

