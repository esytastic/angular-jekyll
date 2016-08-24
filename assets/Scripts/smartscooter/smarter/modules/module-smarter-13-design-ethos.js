/* global $:false */


gogoroApp.controller('moduleSmarter12DesignEthosController', ["$scope", "$element", "$controller", "FallbackManagerFactory", function ($scope, $element, $controller, FallbackManagerFactory) {
      angular.extend($scope, FallbackManagerFactory);

      $scope.standard = {
        init: function() {
          var $el = $($element);
          var animationDuration = 800;

          $el.on('mouseenter', function() {
            $('.background-on', $el).velocity('stop').velocity('fadeIn', {
              duration: animationDuration,
              easing: 'easeIn'
            });
          });

          $el.on('mouseleave', function() {
            $('.background-on', $el).velocity('stop').velocity('fadeOut', {
              duration: animationDuration,
              easing: 'easeIn'
            });
          });
        },
        destroy: function() {
          var $el = $($element);

          $el.unbind();

          $('.background-on, .background-off').attr('style','')
        }
      };

      $scope.fallback = {
        init: function() {

        },
        destroy: function() {

        }
      };

      // Initialize module
      $scope.init($scope, $element);
}]);
