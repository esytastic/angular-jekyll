/* global $:false */


gogoroApp.controller('moduleFaster10SuspensionController', ["$scope", "$window", "$element", "$timeout", function ($scope, $window, $element, $timeout) {
    var moduleFaster10Suspension = {
      configure: {
        currentState: gogoro.App.getBreakpoint()
      },

      init: function() {
        var obj = this;

        obj.getState();

        $(window).on('resize', function() {
          // Detect state change
          if (obj.configure.currentState !== gogoro.App.getBreakpoint()) {
            // Redefine current state
            obj.configure.currentState = gogoro.App.getBreakpoint();

            obj.getState();
          }
        });
      },

      getState: function() {
        var obj = this;
        if (obj.configure.currentState === 'lg' || obj.configure.currentState === 'md') {
          obj.fallback.destroy();
          obj.standard.init();
        } else if (obj.configure.currentState === 'sm' || obj.configure.currentState === 'xs') {
          obj.standard.destroy();
          obj.fallback.init();
        }
      },

      standard: {
        init: function() {
          imgix.fluid(
              {
                fluidClass: 'faster-10-standard'
              }
          );

          $('.timeline').css({
            display: 'block'
          });

          var timelineData = {
          'totalItems': 4,
          'currentItem': 1,
          'centerPoint': {
            'item_1': gogoro.App.getBreakpoint() === 'xs' ? 640 : 1280,
            'item_2': gogoro.App.getBreakpoint() === 'xs' ? 120 : 40,
            'item_3': gogoro.App.getBreakpoint() === 'xs' ? -420 : -1250,
            'item_4': gogoro.App.getBreakpoint() === 'xs' ? -992 : -2500
          },
          'isAnimating': false,
          'currentIndicator': 1
        };

        $('.timeline-indicator').on('click', function(e){
          e.stopPropagation();
        });

        $('.timeline-indicator i').on('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          var $this = $(this);
          var selected = $this.attr('data-index');
          $timeout.cancel($scope.promise);
          timelineGoto(selected)
        });

        $('.timeline').unbind().on('click', function(e) {
          $timeout.cancel($scope.promise);
          timelineGoto();
        });

        $('.timeline-control').css({
          left: ($($window).outerWidth() / 2) - timelineData.centerPoint.item_1
        });

        function timelineGoto(item) {
          if (timelineData.isAnimating) {
            return false;
          }
          

          timelineData.isAnimating = true;
          var currentItem = timelineData.currentItem;
          $scope.currentItem = currentItem;
          
          var nextItem = function() {
            if (item) {
              return (item*1) + 1;
            } else {
              return currentItem + 1;
            }
          };

          var $this = $('.module-faster-10-suspension .timeline');

          setTimeout(function() {
            $this.removeClass('current-item-1 current-item-2 current-item-3 current-item-4');
            $this.addClass('current-item-' + nextItem());
          }, 350);

          $('.content-wrapper.content-' + currentItem).velocity('fadeOut', {
            duration: 350
          });

          $('.content-wrapper.content-' + nextItem()).velocity('fadeIn', {
            delay: 250,
            duration: 350
          });

          if (nextItem() === 4) {
            $('.content-wrapper.content-1').velocity('fadeIn', {
              duration: 0
            });
          }

          $('.timeline-control').velocity({
            left: ($($window).outerWidth() / 2) - timelineData.centerPoint['item_' + nextItem()]
          }, {
            duration: 700,
            easing: 'ease',
            complete: function() {

              if (timelineData.currentItem === timelineData.totalItems) {
                // Reset to first position
                $(this).css({
                  left: ($($window).outerWidth() / 2) - timelineData.centerPoint.item_1
                });

                timelineData.currentItem = 1;
              }

              timelineData.isAnimating = false;
            }
          });

          // Increment indicator
          timelineData.currentIndicator = nextItem();

          // Loop indicator
          if (timelineData.currentIndicator === timelineData.totalItems) {
            timelineData.currentIndicator = 1;
          }

          // Update indicator
          $('.timeline-indicator li i.icon-bullet-active').removeClass('icon-bullet-active').addClass('icon-bullet-inactive');
          $('.timeline-indicator li i:eq(' + (timelineData.currentIndicator - 1) + ')').removeClass('icon-bullet-inactive').addClass('icon-bullet-active');

          if (nextItem() <= timelineData.totalItems) {
            timelineData.currentItem = nextItem();
          }
          setPromise();
        }

        $($window).on('resize', function(e) {
          var windowWidth = $($window).outerWidth();
          var windowCenter = windowWidth / 2;

          // Center timeline based on widow size and current slide
          $('.timeline-control').css({
            left: windowCenter - timelineData.centerPoint['item_' + timelineData.currentItem]
          });
        });

        function checkPosition(){
      
          var _bottom = $(window).scrollTop() + $(window).innerHeight();
          var _top = $(window).scrollTop();
          var sceneBottom = $($element).offset().top + $($element).height();
          if(sceneBottom > _top && sceneBottom < _bottom){
            //visible auto play
            autoPlay();
          }else{
            //drop it
            stopIt();

          }
        }

        function autoPlay(){
          if($scope.playNext){
            return;
          }

          $scope.playNext = true;
          setPromise();

        }
        $scope.promise = null;
        $scope.currentItem = 0;
        function setPromise(){
          return;
          $scope.promise = $timeout(function(){
            //$('.timeline-indicator i:eq('+$scope.+')').click();
            timelineGoto( ($scope.currentItem%3) + 1);
          }, 3000);
        }

        function stopIt(){
            $scope.playNext = false;
            $timeout.cancel($scope.promise);
        }
        //$($window).on('scroll', checkPosition);



        },
        destroy: function() {

          $('.timeline').css({
            display: 'none'
          });
        }
      },

      fallback: {
        init: function() {
          imgix.fluid({
            fluidClass: 'faster-10-fallback'
          });
        },
        destroy: function() {

        }
      }
    };

    // Initialize module
    moduleFaster10Suspension.init();
  }]);
