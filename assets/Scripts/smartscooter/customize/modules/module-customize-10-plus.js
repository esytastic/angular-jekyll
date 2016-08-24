/* global $:false */
gogoroApp
//angular.module('gogoro.customize.moduleCustomize10PlusView', [])
.controller('moduleCustomize10PlusController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);
    //preload image
    var _images = [
      '//gogoro.imgix.net/Gogoro_off.png',
      '//gogoro.imgix.net/Gogoro_on.png',
      '//gogoro.imgix.net/GogoroPlus_off.png',
      '//gogoro.imgix.net/GogoroPlus_0616_on.png',
      '//gogoro.imgix.net/ColorBtn_white_off.png',
      '//gogoro.imgix.net/ColorBtn_white_on.png',
      '//gogoro.imgix.net/ColorBtn_grey_off.png',
      '//gogoro.imgix.net/ColorBtn_grey_on.png',
      '//gogoro.imgix.net/ColorBtn_silver_off.png',
      '//gogoro.imgix.net/ColorBtn_silver_on.png',
      '//gogoro.imgix.net/ColorBtn_blue_off.png',
      '//gogoro.imgix.net/ColorBtn_blue_on.png',
      '//gogoro.imgix.net/ColorBtn_yellow_off.png',
      '//gogoro.imgix.net/ColorBtn_yellow_on.png',
      '//gogoro.imgix.net/ColorBtn_orange_off.png',
      '//gogoro.imgix.net/ColorBtn_orange_on.png',
      '//gogoro.imgix.net/AAA_0616_white.jpg',
      '//gogoro.imgix.net/AAA_0616_grey.jpg',
      '//gogoro.imgix.net/AB2_0616_white.jpg',
      '//gogoro.imgix.net/AB2_0616_grey.jpg',
      '//gogoro.imgix.net/AB2_0616_blue.jpg',
      '//gogoro.imgix.net/AB2_0616_silver.jpg',
      '//gogoro.imgix.net/AB2_0616_yellow.jpg',
      '//gogoro.imgix.net/AB2_0616_orange.jpg',
    ];
    $.each(_images, function (k, img) {
        var _i = new Image();
        _i.src = img;
    });

    $scope.standard = {
        init: function () {

            var _option = {
                original: [{ type: 'white' }, { type: 'grey' }],
                plus: [{ type: 'yellow' }, { type: 'blue' }, { type: 'orange' }, { type: 'white' }, { type: 'grey' }, { type: 'silver' }, ],
            }
            $scope.activeType = 'original';
            $scope.activeColor = 'white';
            $scope.options = _option[$scope.activeType];

            $scope.setOrigin = function () {
                $scope.activeType = 'original';
                $scope.activeColor = 'white';
                $scope.options = _option[$scope.activeType];
                $scope.$evalAsync();
            }

            $scope.setPlus = function () {
                $scope.activeType = 'plus';
                $scope.activeColor = 'yellow';
                $scope.options = _option[$scope.activeType];
                $scope.$evalAsync();
            }
            $scope.setColor = function (color) {
                //$('.colorful-sccoter').fadeOut(500 ,function(){ $('.colorful-sccoter').fadeIn();});
                $scope.activeColor = color;
                $scope.$evalAsync();
            }

            /*
            hide fallback
            */

        },
        destroy: function () {

        }
    };

    $scope.fallback = {
        init: function () {
            // Slideshow

            $('.original-slider', $element).slick({
                slide: '.slide',
                dots: true,
                arrows: false,
                infinite: true,
                speed: 650,
                cssEase: 'ease',
                slidesToShow: 1,
                draggable: false,
                onInit: function () {

                    imgix.onready(function () {
                        imgix.fluid();
                    });

                }
            });

            $('.plus-slider', $element).on('click', function () {
                $('.original-slider', $element).slickNext();
            });

            $('.plus-slider', $element).slick({
                slide: '.slide',
                dots: true,
                arrows: false,
                infinite: true,
                speed: 650,
                cssEase: 'ease',
                slidesToShow: 1,
                draggable: false,
                onInit: function () {

                    imgix.onready(function () {
                        imgix.fluid();
                    });

                }
            });

            $('.original-slider', $element).on('click', function () {
                $('.original-slider', $element).slickNext();
            });

        },
        destroy: function () {

        }
    };

    // Initialize module
    $scope.init($scope, $element);

}]);
