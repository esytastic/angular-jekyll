/* global $:false, imgix:false, Quad:false, TimelineMax:false */


gogoroApp.controller('moduleEnergy1PageIntroController', ["$scope", "$element", "$interval", "FallbackManagerFactory", "$rootScope", function ($scope, $element, $interval, FallbackManagerFactory, $rootScope) {
    angular.extend($scope, FallbackManagerFactory);
    // Drastic measures
    var $el = $($element);
    if (!$scope.isIE10OrLess()) {
       // inject our svg into title-wrapper

       $el.find('.title-wrapper').append($el.find('script.svg').html());
    }

    $scope.standard = {
        init: function() {
          $rootScope.finishPlay = false;
          $('.navbar-header').removeClass('white');

          var createBodyFadeInTween = function($element, callback, additionalDelay) {
              if (additionalDelay === undefined) additionalDelay = 2;

              var $el = $($element);
              var $bodyEl = $el.find('.body');

              var opacityDuration = 0.45 * 2;
              var slideDuration = 0.3 * 2;

              var opacityDelay = 0.225 + additionalDelay;
              var slideDelay = 0.15 + additionalDelay;

              var opacityTween = TweenMax.fromTo($bodyEl, opacityDuration, { opacity: 0 },
                  {
                      opacity: 1,

                      delay: opacityDelay,
                      repeat: 0,
                      immediateRender: true,
                      ease: Cubic.easeIn,
                  }
              );

              var bottomTween = TweenMax.fromTo($bodyEl, slideDuration, { bottom: 0 },
                  {
                      bottom: '100px',
                      delay: slideDelay,
                      repeat: 0,
                      immediateRender: true,
                      ease: Linear.easeOut,
                      onComplete: function() {
                          if (callback) callback();
                      }
                  }
              );

              var timeline = new TimelineMax();
              timeline.insert(opacityTween).insert(bottomTween);

              return timeline;
          };

          var bodyTween = createBodyFadeInTween($element, null, 0.5);

          this.timeline = new TimelineMax({ delay: 0.25 }); // slight delay to allow page to frame up
          this.timeline.insert(bodyTween)/*.insert(titleTween)*/.play();

        },
        destroy: function() {
          delete $rootScope.finishPlay ;
          if (this.timeline) {
            this.timeline.pause(0, true).remove();
            this.timeline = null;
          }
          $('.body', $element).attr('style', '');
        }
      };

      $scope.fallback = {
        init: function() {
          $('.navbar-header').removeClass('white');
        },
        destroy: function() {
        }
      };

     // Initialize module
     $scope.init($scope, $element, true);
}]);
