(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.common = global.gogoro.common || {};
    global.gogoro.common.gradientHeader = GradientHeader;

    function GradientHeader() {
        if (global.gogoro.App.getBreakpoint() === 'xs' || global.gogoro.App.getBreakpoint() === 'sm') {
            return false;
        }
        // Set parameters
        var gradientParameters = [  
          {
              'posX': -getRandomInt(200, 1000),
              'posY': -getRandomInt(200, 1000),
              'duration': getRandomInt(15 * 1000, 20 * 1000)
          }, {
              'posX': -getRandomInt(200, 1000),
              'posY': -getRandomInt(200, 1000),
              'duration': getRandomInt(15 * 1000, 20 * 1000)
          }
        ];

        if (global.Modernizr.cssgradients) {
            // Create gradient divs
            $('<div>', {
                'class': 'gradient gradient-one'
            }).appendTo('#hero-header');

            $('<div>', {
                'class': 'gradient gradient-two'
            }).appendTo('#hero-header');

            // Set gradient position and animate
            $('.gradient-one').css({
                top: gradientParameters[0].posY,
                right: gradientParameters[0].posX
            }).velocity({
                top: 0,
                right: 0
            }, {
                duration: gradientParameters[0].duration,
                loop: true,
                easing: 'easeOutExpo'
            });

            $('.gradient-two').css({
                bottom: gradientParameters[1].posY,
                left: gradientParameters[1].posX
            }).velocity({
                bottom: 0,
                left: 0
            }, {
                duration: gradientParameters[1].duration,
                loop: true,
                easing: 'easeOutExpo'
            });
        }
    }

    /********************
      PRIVATE
    *********************/

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}(window.jQuery, window));
