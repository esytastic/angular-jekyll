/* global $:false, imgix:false, TweenMax:false, Elastic:false, Linear:false, Quint:false, TimelineMax:false */

gogoroApp.controller('moduleEasier1PageIntroController', ["$scope", "$element", "FallbackManagerFactory", "ModulePageIntroService", function ($scope, $element, FallbackManagerFactory, ModulePageIntroService) {
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

          var createElementRevealDownTween = function($element, startPercent, endPercent, duration, delay) {
            var w = 2560; //$($element).width();
            var h = 800; //$($element).height();


            var tween = TweenMax.fromTo($element, duration, {
              clip: 'rect(0, ' + w + 'px, ' + (h * startPercent) + 'px, 0)',
              opacity: 1
            }, {
              clip: 'rect(0, ' + w + 'px, ' + (h * endPercent) + 'px, 0)',
              opacity: 1,

              delay: delay,
              repeat: 0,
              immediateRender: false,
              ease: Linear.easeOut
            });

            return tween;
          };

          var createElementBounceTween = function($element, duration, delay) {
            var tween = TweenMax.to($element, duration, {
              top: '+=50px',

              delay: delay,
              repeat: 0,
              immediateRender: false,
              ease: Elastic.easeOut
            });

            return tween;
          };

          // fade in the grid + route
          var gridTween = ModulePageIntroService.createElementFadeInTween($($element).find('.route'), 0.5, 0.5);

          // fade out the route
          var routeTween = createElementRevealDownTween($($element).find('.grid'), 0.51, 1, 3);

          // fade + bounce the pins

          var pinsTimeline = new TimelineMax();

          var fadePinsTween = ModulePageIntroService.createElementFadeInTween($($element).find('.pins'), 0.5, 0.25);
          var bouncePinsTween = createElementBounceTween($($element).find('.pins'), 0.75, 0.25);

          pinsTimeline.insert(fadePinsTween);
          pinsTimeline.insert(bouncePinsTween);

          // bring in title
          
          var findString = $scope.isFF() ? '.title-wrapper text' : '.title-wrapper tspan';
          var titleTween = ModulePageIntroService.createTitleFadeInTween($($element).find(findString));

          // bring in body

          var bodyTween = ModulePageIntroService.createBodyFadeInTween($element, null, 0.5);

          //

          this.timeline = new TimelineMax({ delay: 0.25 }); // slight delay to allow page to frame up
          this.timeline
            .insert(bodyTween)
            .add(gridTween)
            .add(routeTween)
            .add(pinsTimeline)
            .add(titleTween)
            .play();
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
