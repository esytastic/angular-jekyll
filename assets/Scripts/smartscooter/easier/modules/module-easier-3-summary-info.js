/* global $:false */


gogoroApp.controller('moduleEasier3SummaryInfoController', ["$scope", "$element", "$controller", "FallbackManagerFactory", function ($scope, $element, $controller, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
      init: function() {
        $.extend(this, $controller('ModuleSummaryInfoController', {
          $scope: $scope,
          $element: $element
        }));
      },
      destroy: function() {
        if (this.controller) {
          this.controller.destroy(true);
          this.contoller = null;
        }
      }
    };

    $scope.fallback = {
      init: function() {
        if (gogoro.App.getBreakpoint() !== 'lg' ) {
          // Slideshow
          $('.row', $element).slick({
            slide: '.slide',
            dots: true,
            arrows: false,
            accessibility: true,
            infinite: true,
            speed: 650,
            cssEase: 'ease',
            slidesToShow: 1,
            draggable: false
          });

          $('.row .slide', $element).on('click', function() {
            $('.row', $element).slickNext();
          });
        }
      },
      destroy: function() {
        // Unbind slideshow
        $('.row', $element).unslick();
      }
    };

    // Initialize module
    $scope.init($scope, $element);
  }]);
