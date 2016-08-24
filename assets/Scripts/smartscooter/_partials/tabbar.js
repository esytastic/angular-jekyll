/* global $:false, gogoro:false */

angular.module('gogoro.partial.tabbarView', [])
  .directive('tabbar', ["$window", function($window) {
    return {
      scope: {},
      link: function(scope, element, attrs) {
        var storedScrollPosition = 0;
        var currentScrollPosition = 0;
        var scrollTolerance = 100;
        var navOffset = $(element).offset().top;
        var $el = $(element).find('.tabbar-wrapper');
        var $elInner = $el.find('.tabbar');

        // Set active link onload
        var current_action = $(element).data('current-action');
        var links = $(element).find('a');
        links.each(function (i) {
            var action_name = $(this).data('action-name');
            if (action_name == current_action) {
                $(this).addClass('active');
            }
        });

        //
        if ($($window).scrollTop() >= navOffset) {
           $el.addClass('fixed');
        }

        var setup = function() {
          navOffset = $(element).offset().top;
        };


        var showTabbarNav = function(current) {
          var currentSection = current.attr('class').split(' ')[0];

          $('.tabbar-container').clone().addClass('cloned').addClass(currentSection).appendTo('body');

          $('<i>',{
            'class': 'icon icon-close'
          }).appendTo('.tabbar-container.cloned .tabbar-wrapper');

          $('.tabbar-container.cloned .icon-close').on('click', function() {
            removeTabbarNav();
          });

          $('.tabbar-container.cloned').velocity('fadeIn', {
            duration: 150,
            ease: 'easeOut'
          });

          $('.tabbar-container.cloned .tabbar').velocity('transition.expandIn', {
            delay: 100,
            duration: 150,
            ease: 'easeOut',
            display: 'table-cell'
          });

          $('.tabbar-container.cloned a, .tabbar-overlay').on('click', function() {
            $(element).removeClass('active');
            removeTabbarNav();
          });
        }

        var removeTabbarNav = function() {
          $('.tabbar-container.cloned').velocity('fadeOut', {
            duration: 250,
            complete: function() {
              $('.tabbar-container.cloned').remove();
            }
          });
        }

        var xsTabbar = function() {
          $('a', $el).unbind().on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            showTabbarNav($this);
          });
        };

        if (gogoro.App.getBreakpoint() === 'xs') {
          xsTabbar();
        }

        setup();

        $($window).on('scroll', function() {
          currentScrollPosition = $($window).scrollTop();

          // Show/hide subnav
          if (currentScrollPosition >= navOffset) {
             $el.addClass('fixed');
          } else {
             $el.removeClass('fixed');
          }

          storedScrollPosition = currentScrollPosition;
        });

        $($window).on('resize', function() {
          if (gogoro.App.getBreakpoint() === 'xs') {
            xsTabbar();
          } else {
            $('a', $el).unbind();
          }
        });
      }

    };
  }]);
