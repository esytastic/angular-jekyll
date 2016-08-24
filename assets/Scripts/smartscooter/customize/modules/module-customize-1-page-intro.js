/* global $:false, imgix:false, TimelineMax:false */


gogoroApp.controller('moduleCustomize1PageIntroController', ["$scope", "$element", "FallbackManagerFactory", "ModulePageIntroService", function ($scope, $element, FallbackManagerFactory, ModulePageIntroService) {
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

          var createTitleFadeInTween = function($el, delay) {
            var duration = 0.75;

            return ModulePageIntroService.createElementFadeInTween($el, duration, delay);
          };

          var createTitleFadeOutTween = function($el, delay) {
            var duration = 0.5;

            return ModulePageIntroService.createElementFadeOutTween($el, duration, delay);
          };

          var $el = $($element);
          var findSuffix = $scope.isFF() ? ' text' : ' tspan';

          var title0InTween = createTitleFadeInTween($el.find('.title-0' + findSuffix));

          var title1InTween = createTitleFadeInTween($el.find('.title-1' + findSuffix));
          var title1OutTween = createTitleFadeOutTween($el.find('.title-1' + findSuffix), 0.25);

          var title2InTween = createTitleFadeInTween($el.find('.title-2' + findSuffix));
          var title2OutTween = createTitleFadeOutTween($el.find('.title-2' + findSuffix), 0.25);

          var title3InTween = createTitleFadeInTween($el.find('.title-3' + findSuffix));

          // bring in body

          var bodyTween = ModulePageIntroService.createBodyFadeInTween($element, null, 0.5);

          //

          this.timeline = new TimelineMax({ delay: 0.25 }); // slight delay to allow page to frame up
          this.timeline
            .insert(bodyTween)
            .add(title0InTween)
            .add(title1InTween)
            .add(title1OutTween)
            .add(title2InTween)
            .add(title2OutTween)
            .add(title3InTween)
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






/*¦r*/
var main = function () {

    $('.original-btn').click(function () {
        $(".colorPotionsWord2").addClass("All_You_hide");
        $(".colorPotionsWord1").removeClass("All_You_hide");

    });


    $('.plus-btn').click(function () {
        $(".colorPotionsWord1").addClass("All_You_hide");
        $(".colorPotionsWord2").removeClass("All_You_hide");
        $(".colorPotionsWord2").addClass("All_You_Show");
    });


};