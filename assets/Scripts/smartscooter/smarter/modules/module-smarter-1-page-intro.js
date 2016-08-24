/* global $:false, imgix:false, Linear:false, Quad:false, TweenMax:false, TimelineMax:false */


gogoroApp.controller('moduleSmarter1PageIntroController', ["$scope", "$element", "ModulePageIntroService", "FallbackManagerFactory", function ($scope, $element, ModulePageIntroService, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);
     
    // Drastic measures
    var $el = $($element);
    if (!$scope.isIE10OrLess()) {
       // inject our svg into title-wrapper 

       $el.find('.title-wrapper').append($el.find('script.svg').html());
    }

    $scope.standard = {
        init: function() {

          imgix.onready(function() {
            imgix.fluid({
              fluidClass: 'background-image-standard'
            });
          });

          // sensors

          var createSensorTween = function($element, duration, delay) {
            var fromProperties = {
              opacity: 0,
              width: 0,
              height: 0,
            };

            var toProperties = {
              opacity: 1,
              width: 14,
              height: 14,
              left: -7,
              top: -7,

              delay: delay,
              repeat: 0,
              immediateRender: true,
              ease: Linear.easeIn
            };

            return TweenMax.fromTo($element, duration, fromProperties, toProperties);
          };

          var createSensorRippleTween = function($element, duration, delay) {
            // create a new ripple

            var $rippleEl = $('<div class="ripple">');
            var $wrapperEl = $('<div class="sensor-wrapper">').append($rippleEl);

            $element.parent().parent().append($wrapperEl);

            $wrapperEl.css({
              left: $element.parent().css('left'),
              top: $element.parent().css('top')
            });

            var fromProperties = {
              opacity: 0.5,
              width: 14,
              height: 14,
              left: -7,
              top: -7,
            };

            var toProperties = {
              opacity: 0,
              width: 128,
              height: 128,
              left: -64,
              top: -64,

              delay: delay,
              repeat: 0,
              immediateRender: false,
              ease: Quad.easeOut
            };

            return TweenMax.fromTo($rippleEl, duration, fromProperties, toProperties);
          };

          var $sensorsEl = $($element).find('.background-image .sensors .sensor');
          var sensorsTimeline = new TimelineMax();

          var findString = $scope.isFF() ? '.title-wrapper text' : '.title-wrapper tspan';
          var $titleLettersEl = $($element).find(findString);
          var order = [1, 4, 3, 0, 2];

          var $wifiWavesEl = $($element).find('.title-wrapper .wifi > div');
          var wifiTimeline = new TimelineMax();

          var smt = $sensorsEl.length - $titleLettersEl.length;
          for (var i = 0; i < $sensorsEl.length; i++) {
            sensorsTimeline.insert(createSensorTween($sensorsEl.eq(i), 0.5, 0.2 * i));

            if (i >= smt) {
              sensorsTimeline.insert(ModulePageIntroService.createElementFadeInTween($titleLettersEl.eq(order[i - smt]), 0.5, 0.3 * i + 0.2));
            }

            sensorsTimeline.insert(createSensorRippleTween($sensorsEl.eq(i), 0.8, 0.3 * i + 0.25));
            sensorsTimeline.insert(createSensorRippleTween($sensorsEl.eq(i), 0.8, 0.3 * i + 0.4));
          }

          // wifi waves

          var count = $wifiWavesEl.length;

          for (i = 0; i < count; i++) {
            wifiTimeline.insert(ModulePageIntroService.createElementFadeInTween($wifiWavesEl.eq(i), 0.4, 0.2 * i));
          }

          for (i = 0; i < count; i++) {
            wifiTimeline.insert(ModulePageIntroService.createElementFadeOutTween($wifiWavesEl.eq(i), 0.8, 0.2 * i + (count * 0.2)));
          }

          // body

          var bodyTween = ModulePageIntroService.createBodyFadeInTween($element, null, 0.5);

          //

          this.timeline = new TimelineMax({ delay: 0.25 }); // slight delay to allow page to frame up

          // bring in the body and sensors
          this.timeline.insert(bodyTween).add(sensorsTimeline);

          // bring in wifi (add sensor fadeout to wifi timeline)

          wifiTimeline.insert(ModulePageIntroService.createElementFadeOutTween($sensorsEl, 0.8, 1));

          this.timeline.add(wifiTimeline).play();
        },
        destroy: function() {
          if (this.timeline) {
            this.timeline.pause(0, true).remove();
            this.timeline = null;
          }
          $('.body', $element).attr('style', '');
        }
      };

      $scope.fallback = {
        init: function() {
          imgix.onready(function() {
            imgix.fluid({
              fluidClass: 'background-image-fallback'
            });
          });
        },
        destroy: function() {
        }
      };

     // Initialize module
     $scope.init($scope, $element, true);
}]);
