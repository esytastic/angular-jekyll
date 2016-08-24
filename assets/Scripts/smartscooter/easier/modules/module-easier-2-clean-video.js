/* global $:false */


gogoroApp.controller('moduleEasier2CleanVideoController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
      init: function() {
        $('.video', $element).css({
          display: 'block'
        });
        $.extend(this, $controller('ModuleVideoController', {
          $scope: $scope,
          $element: $element,
          $window: $window
        }));
        var videoModal = new gogoro.common.VideoModal();
      },
      destroy: function() {
        $('.video', $element).css({
          display: 'none'
        })
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
