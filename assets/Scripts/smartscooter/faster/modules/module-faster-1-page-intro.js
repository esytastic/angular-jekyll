/* global $:false, imgix:false, Quad:false, TimelineMax:false */


gogoroApp.controller('moduleFaster1PageIntroController', ["$scope", "$element", "$interval", "FallbackManagerFactory", "ModulePageIntroService", "$rootScope", function ($scope, $element, $interval, FallbackManagerFactory, ModulePageIntroService, $rootScope) {
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
          
          var counter;

          var didFinish = false;
          var speedMultiplier = 2;
          var duration = 4.2 * 1000 / speedMultiplier; // double speed

          imgix.fluid({
            fluidClass: 'background-image-standard'
          });
          //blocked when site intro is shown
          /*
          if($('.module-faster-0-site-intro').is(':visible')){
            return;
          }*/
          var resetTimerIfNotRunning = function() {
            if (!didFinish && !counter) {
              var startTime = new Date(Date.now());
              var endTime = new Date(Date.now() + duration);

              var $kmh0El = $($element).find('svg.kmh text tspan').eq(2);
              var $kmh1El = $($element).find('svg.kmh text tspan').eq(3);

              counter = $interval(function() {
                var currTime = new Date();
                var diff = (duration - Math.max(0, (endTime - currTime))) * speedMultiplier;

                var seconds = Math.floor(diff / 1000);
                var secondsString = seconds.toString();
                if (secondsString.length === 1) secondsString = '0' + secondsString;

                var millis = Math.floor((diff - (seconds * 1000)) / 10);
                var millisString = millis.toString();
                if (millisString.length === 1) millisString = '0' + millisString;

                var timeString = secondsString + '.' + millisString;

                $($element).find('svg.title text tspan').each(function(index) {
                  this.textContent = timeString[index];
                });

                var kmh = Math.min(50, Math.round(50 * (currTime - startTime) / duration));
                var kmh0 = Math.floor(kmh / 10);
                if(!$kmh0El[0]){
                  return;
                }
                $kmh0El[0].textContent = kmh0;
                $kmh1El[0].textContent = kmh - (kmh0 * 10);

                if (currTime > endTime) {
                  $interval.cancel(counter);
                  counter = null;
                  didFinish = true;
                  $rootScope.finishPlay = true;
                }
              }, 1000 / 30);
            }
          };

          
          
          // bring in title
          var findString = $scope.isFF() ? '.title-wrapper text' : '.title-wrapper tspan';
          var titleTween = ModulePageIntroService.createElementFadeInTween($($element).find(findString), 2.5, 0.5, {
            ease: Quad.easeIn,
            onStart: resetTimerIfNotRunning
          });
           // bring in body

          var bodyTween = ModulePageIntroService.createBodyFadeInTween($element, null, 0.5);

          //

          this.timeline = new TimelineMax({ delay: 0.25 }); // slight delay to allow page to frame up
          this.timeline.insert(bodyTween).insert(titleTween).play();
         
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
