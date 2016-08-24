/* global $:false */
gogoroApp.controller('moduleCustomize7LightingThemes', ["$scope", "$element", "FallbackManagerFactory", function ($scope, $element, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);
        /**
         $video.readyState
            0 = HAVE_NOTHING - no information whether or not the audio/video is ready
            1 = HAVE_METADATA - metadata for the audio/video is ready
            2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
            3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
            4 = HAVE_ENOUGH_DATA - enough data available to start playing
         */
    $scope.standard = {
        init: function() {
          var lightingTheme = {
            'one': 0,
            'two': 4,
            'three': 8
          };

          var $video;

          setTimeout(function() {

                  $(".video-lighting-themes").append(
                        '<video class="video-delay" width="2560" height="600" muted preload="auto" loop autoplay  >' +
                            '<source src="//movies.gogoroapp.com/lighting-themes.webm" type="video/webm">' +
                            '<source src="//movies.gogoroapp.com/lighting-themes_2015-01-21.mp4" type="video/mp4">' +
                        '</video>');

                  $video = $('video', $element)[0];
                  //
                  $('.video', $element).css({
                      //  display: 'block'
                  });

                  $('video', $element).on('timeupdate', function(event) {
                      onTimeUpdate(this.currentTime, this.duration);
                  });

                  $('.video-indicator a', $element).unbind().on('click', function(e) {

                      e.preventDefault();

                      $('.video-overlay').velocity({
                          opacity: 0.40
                      }, {
                          display: 'block',
                          duration: 50,
                          easing: 'easeOut',
                          complete: function() {
                              $('.video-overlay').velocity('fadeOut', {
                                  duration: 300,
                                  easing: 'easeOut'
                              })
                          }
                      });

                      var $this = $(this);
                      var theme = $this.attr('data-theme');

                      $video.currentTime = lightingTheme[theme];
                      //$video.play();

                      $('.video-indicator a', $element).removeClass('active');
                      $this.addClass('active');
                  });

          },500);

          function onTimeUpdate(currentTime, duration) {
            if (currentTime > lightingTheme.one && currentTime < lightingTheme.two) {

              $('.video-indicator a', $element).removeClass('active');
              $('.video-indicator a[data-theme*="one"]', $element).addClass('active');

            } else if (currentTime > lightingTheme.two && currentTime < lightingTheme.three) {

              $('.video-indicator a', $element).removeClass('active');
              $('.video-indicator a[data-theme*="two"]', $element).addClass('active');

            } else if (currentTime > lightingTheme.three && currentTime < duration) {

              $('.video-indicator a', $element).removeClass('active');
              $('.video-indicator a[data-theme*="three"]', $element).addClass('active');

            }
          }

        },
        destroy: function() {

//          var $video = $('video', $element)[0];
//          if ($video.readyState === 4) {
//              $video.pause();
//              $video.currentTime = 0;
//          }
//          $('.video', $element).css({
//            display: 'none'
//          });
        }
      };

      $scope.fallback = {
        init: function() {
        },
        destroy: function() {
        }
      };

    // Initialize module
    $scope.init($scope, $element, true);

  }]);
