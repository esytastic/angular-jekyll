/* global $:false */


gogoroApp.controller('moduleSmarter8SmartVisionController', ["$scope", "$element", function ($scope, $element) {

    var $el = $($element);

    var $toggleEl = $el.find('.day-night-toggle');
    var $dayToggleEl = $toggleEl.children('.day');
    var $nightToggleEl = $toggleEl.children('.night');

    var $dayBgdEl = $el.children('.background-day');
    var $nightBgdEl = $el.children('.background-night');
    var animationDuration = 800;

    $dayToggleEl.on('click', function(e) {
      e.preventDefault();

      if (!$el.hasClass('day')) {
        $dayToggleEl.velocity('stop').velocity({
          opacity: 1
        });

        $nightBgdEl.velocity('stop').velocity({
          opacity: 0.3
        });

        $nightBgdEl.velocity('stop').velocity('fadeOut', {
          duration: animationDuration,
          easing: 'easeIn'
        });

        $('p, h2', $el).velocity('stop').velocity({
          color: '#000000'
        }, {
          duration: animationDuration,
          easing: 'easeIn'
        });

        $el.velocity('stop').velocity({
          backgroundColor: '#eeeeee'
        }, {
          duration: animationDuration,
          easing: 'easeIn'
        });

        $el.addClass('day');
        $el.removeClass('night');
      }
    });

    $nightToggleEl.on('click', function(e) {
      e.preventDefault();

      if (!$el.hasClass('night')) {
        $dayToggleEl.velocity('stop').velocity({
          opacity: 0.3
        });

        $nightBgdEl.velocity('stop').velocity({
          opacity: 1
        });

        $nightBgdEl.velocity('stop').velocity('fadeIn', {
          duration: animationDuration,
          easing: 'easeIn'
        });

        $('p, h2', $el).velocity('stop').velocity({
          color: '#eeeeee'
        }, {
          duration: animationDuration,
          easing: 'easeIn'
        });

        $el.velocity('stop').velocity({
          backgroundColor: '#323237'
        }, {
          duration: animationDuration,
          easing: 'easeIn'
        });

        $el.addClass('night');
        $el.removeClass('day');
      }
    });
  }]);
