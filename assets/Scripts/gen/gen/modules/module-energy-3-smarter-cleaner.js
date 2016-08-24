/* global $:false, gogoro:false */

gogoroApp.controller('moduleEnergy3SmarterCleanerController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {

    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
        init: function() {

        },
        destroy: function() {

        }
    };

    $scope.fallback = {
        init: function() {

        },
        destroy: function() {

        }
    };

    $scope.init($scope, $element);
}]);
