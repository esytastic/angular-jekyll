/* global $:false */


gogoroApp.controller('moduleFaster11CompoundTireController', ["$scope", "$element", function ($scope, $element) {
    var $el = $($element);
    var animationDuration = 800;

      // console.log(gogoro.App.getBreakpoint())

      $el.on('mouseenter', function() {
        if (gogoro.App.getBreakpoint() !== 'xs' && gogoro.App.getBreakpoint() !== 'sm') {
          $('img.active', $el).velocity('stop').velocity('fadeIn', {
            duration: animationDuration,
            easing: 'easeIn'
          });
          $('.descriptions .center, .descriptions .edge', $el).velocity('stop').velocity('transition.slideRightIn', {
            duration: animationDuration / 2,
            easing: 'easeIn',
            stagger: 150
          });
          $('.descriptions .center .line, .descriptions .edge .line', $el).velocity('stop').velocity('fadeIn', {
            duration: animationDuration / 2,
            easing: 'easeIn',
            delay: animationDuration / 2
          });
        }
      });

      $el.on('mouseleave', function() {
        if (gogoro.App.getBreakpoint() !== 'xs' && gogoro.App.getBreakpoint() !== 'sm') {
          $('img.active', $el).velocity('stop').velocity('fadeOut', {
            duration: animationDuration,
            easing: 'easeIn'
          });
          $('.descriptions .center, .descriptions .edge', $el).velocity('stop').velocity('transition.slideRightOut', {
            duration: animationDuration / 2,
            easing: 'easeOut',
            stagger: 150
          });
          $('.descriptions .center .line, .descriptions .edge .line', $el).velocity('stop').velocity('fadeOut', {
            duration: animationDuration / 2,
            easing: 'easeOut'
          });
        }
      });

  }]);
