/* global $:false, gogoro:false */


gogoroApp.controller('moduleEasier5SwapAndGoController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {
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
            });
        }
    };

    $scope.fallback = {
        init: function() {
          var videoModal = new gogoro.common.VideoModal();
        },
        destroy: function() {

        }
    };

    // Initialize module
    $scope.init($scope, $element);

}]);
