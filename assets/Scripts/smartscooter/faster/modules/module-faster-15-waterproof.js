/* global $:false */

gogoroApp.controller('moduleFaster15WaterproofController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
        init: function() {
          $('.water-level').velocity('stop').velocity('transition.slideUpBigIn').velocity({
            top: 25,
          }, {
            loop: true,
            duration: 1500,
            ease: 'easeOut'
          });
        },
        destroy: function() {

        }
      };

      $scope.fallback = {
        init: function() {
          imgix.fluid({
            fluidClass: 'faster-15-fallback'
          });
        },
        destroy: function() {

        }
      };

    // Initialize module
     $scope.init($scope, $element, true);
}]);

