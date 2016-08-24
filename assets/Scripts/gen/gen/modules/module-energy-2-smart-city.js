/* global $:false, gogoro:false */


gogoroApp.controller('moduleEnergy2SmartCityController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);

    var sliderMade = false;

    var makeSlider = function () {
        $('.slider', $element).slick({
            slide: '.slider-content',
            dots: true,
            arrows: false,
            infinite: true,
            speed: 650,
            cssEase: 'ease',
            slidesToShow: 1,
            draggable: false,
            fade: true,
            appendDots: '.slider-dots-container'
        });
    }

    $scope.standard = {
        init: function() {
            if (!sliderMade) {
                makeSlider();
                sliderMade = true;
            }
        },
        destroy: function() {
        }
    };

    $scope.fallback = {
        init: function() {
            if (!sliderMade) {
                makeSlider();
                sliderMade = true;
            }
        },
        destroy: function() {
        }
    };

    // Initialize module
    $scope.init($scope, $element);

}]);
