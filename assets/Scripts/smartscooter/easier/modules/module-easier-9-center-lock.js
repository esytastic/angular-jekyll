/* global $:false */


gogoroApp.controller('moduleEasier9CenterLockController', ["$scope", "$element", function ($scope, $element) {
    var $el = $($element);
    var animationDuration = 800;




      $el.on('mouseenter', function() {
        if (gogoro.App.getBreakpoint() !== 'xs' && gogoro.App.getBreakpoint() !== 'sm') {
          $('img.active', $el).velocity('stop').velocity('fadeIn', {
            duration: animationDuration,
            easing: 'easeIn'
          });
        }
      });

      $el.on('mouseleave', function() {
        if (gogoro.App.getBreakpoint() !== 'xs' && gogoro.App.getBreakpoint() !== 'sm') {
          $('img.active', $el).velocity('stop').velocity('fadeOut', {
            duration: animationDuration,
            easing: 'easeIn'
          });
        }
      });
  }]);
