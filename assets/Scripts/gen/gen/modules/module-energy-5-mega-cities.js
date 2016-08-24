/* global $:false, gogoro:false */

gogoroApp.controller('moduleEnergy5MegaCitiesController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {

    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
        init: function () {

        },
        destroy: function () {

        }
    };

    $scope.fallback = {
        init: function () {

        },
        destroy: function () {

        }
    };

    $scope.init($scope, $element);

    $scope.selectedView = 'basic';

    $scope.change = function (view) {

        $scope.selectedView = view;

        if (view === 'basic') {
            $($element).find('.basic-map').fadeIn(500);
            $($element).find('.data-map').fadeOut(500);
        } else {
            $($element).find('.basic-map').fadeOut(500);
            $($element).find('.data-map').fadeIn(500);
        }
    }
}]);
