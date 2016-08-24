/* global $:false */


gogoroApp.controller('moduleFaster9ChassisController', ["$scope", "$element", "$window", "$timeout", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $timeout, $controller, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);

    imgix.fluid({
      fluidClass: 'faster-9-background-image'
    });




    $scope.standard = {
      init: function() {
        // frame times in seconds

        $('.module-video-slider-content', $element).css({
          display: 'block'
        });

        var videoFrameTimes = [
          1,
          5,
          14.5,
          23,
          30
        ];

        $.extend(this, $controller('ModuleVideoSliderController', {
          $scope: $scope,
          $element: $element,
          $window: $window,
          $timeout: $timeout,
          videoFrameTimes: videoFrameTimes,
          shouldCrossFade: true
        }));

        

      },
      destroy: function() {
        // Unbind
        $('.module-video-slider-content', $element).unbind();

        // Remove pagination dots
        $('.frame-pagination div', $element).remove();

        // Reset inline styles
        $('.frame', $element).attr('style', '');
      }
    };


    $scope.fallback = {
      init: function() {
        // slider for mobile, ie8/9

        // Slideshow
        $('.module-video-slider-content', $element).slick({
          slide: '.frame',
          dots: true,
          arrows: false,
          infinite: true,
          speed: 650,
          cssEase: 'ease',
          slidesToShow: 1,
          draggable: false,
          onInit: function() {
            imgix.onready(function() {
              imgix.fluid();
            });
          }
        });

        $('.module-video-slider-content .frame', $element).on('click', function() {
          $('.module-video-slider-content', $element).slickNext();
        });
      },
      destroy: function() {
        // Unbind slideshow
        $('.module-video-slider-content', $element).unslick().css({
          display: 'none'
        });
      }
    };

    // Initialize module
    $scope.init($scope, $element);
  }]);
