/* global $:false */


gogoroApp.controller('moduleFaster11aCenterLockController', ["$scope", "$element", function ($scope, $element) {
    var $el = $($element);
    var animationDuration = 800;



    if (gogoro.App.getBreakpoint() !== 'xs') {
      $el.on('mouseenter', function() {
        $('img.active', $el).velocity('stop').velocity('fadeIn', {
          duration: animationDuration,
          easing: 'easeIn'
        });
      });

      $el.on('mouseleave', function() {
        $('img.active', $el).velocity('stop').velocity('fadeOut', {
          duration: animationDuration,
          easing: 'easeIn'
        });
      });
    };

  }]);
