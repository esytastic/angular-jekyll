(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.common = global.gogoro.common || {};
    global.gogoro.common.IntroSequence = IntroSequence;

    var gogoro = global.gogoro;
    var videoSupported = false;

    /* Full screen (cover) video */
    var minW = 300; // minimum video width allowed
    var vidWOrig;  // original video dimensions
    var vidHOrig;

    function IntroSequence() {
        if ($('html.lt-ie9').length) {
            this.error();
            return false;
        } else {
            this.initialize();
        }
    }

    /**********************
      PRIVATE FUNCTIONS
      *********************/

    IntroSequence.prototype.error = function () {
        $('body').removeClass('intro-active');
        $('#intro-sequence').remove();
    };

    IntroSequence.prototype.complete = function () {
        $(window).off('resize');
        $('#intro-sequence').remove();
        $('body').removeClass('intro-active');
        $(global.document).unbind('touchmove');
    };

    IntroSequence.prototype.setSequenceType = function () {
        var sequenceType;

        var unsupportedDevice = /(iPad|iPhone|iPod|Android)/g.test(global.navigator.userAgent);

        if (global.Modernizr.video && !unsupportedDevice) {
            sequenceType = 'video';
        } else {
            sequenceType = 'image';
        }

        return sequenceType;
    };

    IntroSequence.prototype.initialize = function () {
        //remove intro ~ Gavin
        this.complete();
        return;
        if (global.document.cookie.indexOf('intro') !== -1 && getQueryString('intro') !== 'true') {
            this.complete();
            return;
        }

        var sequenceType = this.setSequenceType();
        this.frameCount = 0;

        if (sequenceType === 'video') {
            // Setup video
            $('#intro-sequence-background').html(
                '<div class="video-viewport">' +
                  '<video id="intro-sequence-video" width="1280" height="720" muted preload="auto">' +
                    '<source src="/video/intro-sequence.mp4" type="video/mp4">' +
                    '<source src="/video/intro-sequence.webm" type="video/webm">' +
                  '</video>' +
                '</div>');

            // Prepare video
            this.video = $('#intro-sequence-video');

            vidWOrig = parseInt($('#intro-sequence-video').attr('width'));
            vidHOrig = parseInt($('#intro-sequence-video').attr('height'));

            $(window).resize(function () { resizeToCover(); });
            $(window).trigger('resize');

        } else {
            // Setup images
            $('<div>', {
                'class': 'intro-sequence-image frame-one'
            }).appendTo('#intro-sequence-background');

            $('<div>', {
                'class': 'intro-sequence-image frame-two'
            }).appendTo('#intro-sequence-background');

            $('<div>', {
                'class': 'intro-sequence-image frame-three'
            }).appendTo('#intro-sequence-background');
        }

        // Prepare page to run intro
        $('body').addClass('intro-active');

        //Add a cookie so this won't play again for a 1 hour
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);

        // Cookie intro
        global.document.cookie = 'intro=true; expires=' + now.toUTCString();

        // Show intro container
        $('#intro-sequence').css({ display: 'block' });

        $(global.document).on('touchmove', function (e) {
            e.preventDefault();
        });

        this.beginLoading();
    };

    IntroSequence.prototype.beginLoading = function () {

        var self = this;

        // Fade in welcome text
        $('section.loading').velocity('fadeIn', {
            duration: 900,
            easing: 'easeOut',
            complete: function () {
                // Start loading animation
                $('.layer-mask').velocity({ left: $('.layer-mask').outerWidth() }, {
                    delay: 200, duration: 4900, easing: 'easeOutCubic',
                    complete: function () {
                        self.initializeBackground();
                    }
                });
            }
        });
    };

    IntroSequence.prototype.initializeBackground = function () {
        var self = this;

        var sequenceType = this.setSequenceType();

        if (sequenceType === 'video') {

            self.video = $('#intro-sequence-video');

            // Check when video is loaded and ready to play
            var checkReadyStateInterval = 0;

            var checkReadyState = setInterval(function () {

                if (self.video.get(0).readyState >= self.video.get(0).HAVE_FUTURE_DATA) {

                    clearInterval(checkReadyState);

                    $('#loading-text').velocity({ opacity: 0 }, {
                        delay: 150,
                        duration: 800,
                        easing: 'easeOutQuad',
                        complete: function () {
                            $(this).remove();
                            frameOne.initialize(self);
                        }
                    });
                }

                // Error out if video isn't loaded in 10 seconds
                if (checkReadyStateInterval > 100) {
                    self.error();
                    clearInterval(checkReadyState);
                }

                checkReadyStateInterval++;
            }, 100);

        } else {
            $('#loading-text').velocity({ opacity: 0 }, {
                duration: 400,
                easing: 'easeOut',
                complete: function () {
                    $(this).remove();
                    $('.intro-sequence-image.frame-one').velocity('fadeIn', {
                        duration: 800,
                        easing: 'easeOut',
                        complete: function () {

                            frameOne.initialize(self);
                            $('.intro-sequence-image').css({ 'display': 'block' });
                        }
                    });
                }
            });
        }
    };

    var frameOne = {
        initialize: function (self) {
            var sequenceType = self.setSequenceType();

            if (sequenceType === 'video') {
                self.video = $('#intro-sequence-video');

                self.video.css({ display: 'block' });

                self.video.get(0).currentTime = 0;

                resizeToCover();
                self.video.get(0).play();

                // Start video sequence
                $('#frame-one').css({ display: 'block' });
                frameOne.text(self);

            } else {
                // Start image sequence
                $('#frame-one').css({ display: 'block' });

                setTimeout(function () {
                    frameOne.text(self);
                }, 1000);
            }
        },
        text: function (self) {
            self.frameCount++;

            $('#frame-one .frame-' + self.frameCount)
                .velocity('transition.slideLeftIn', { delay: 100, duration: 680, easing: 'easeOut' })
                .velocity({ opacity: 0, translateX: '12px' }, {
                    delay: 100, duration: 320, easing: 'easeIn', complete:
                      function () {
                          if (self.frameCount === 5) {
                              // Remove animated element
                              $('#frame-one').remove();

                              $('.intro-sequence-image.frame-one').velocity('fadeOut', {
                                  duration: 800,
                                  easing: 'easeOut',
                                  complete: function () {
                                      // Remove image frame one
                                      $(this).remove();
                                  }
                              });

                              frameTwo.initialize(self);
                          } else {
                              // Step through animation
                              frameOne.text(self);

                              // Remove animated element
                              $(this).remove();
                          }
                      }
                });
        }
    };

    var frameTwo = {
        initialize: function (self) {
            $('#frame-two').css({
                display: 'block'
            });

            var sequenceType = self.setSequenceType();

            setTimeout(function () {
                frameTwo.text(self);
            }, 1000);
        },
        text: function (self) {
            $('#frame-two h1 span').not('.faster').velocity('transition.slideLeftIn', { stagger: 600, duration: 500, easing: 'easeOut' });

            $('#frame-two h1 span.faster').velocity('transition.slideLeftIn', { delay: 1800, stagger: 600, duration: 500, easing: 'easeOut' });

            $('#frame-two').velocity('fadeOut',
              {
                  delay: 4550,
                  duration: 400,
                  easing: 'easeOut',
                  complete: function () {
                      $('#frame-two').remove();

                      $('.intro-sequence-image.frame-two').velocity('fadeOut', {
                          duration: 800,
                          easing: 'easeOut',
                          complete: function () {
                              // Remove image frame two
                              $(this).remove();
                          }
                      });

                      frameThree.initialize(self);
                  }
              });
        }
    };

    var frameThree = {
        initialize: function (self) {
            var sequenceType = self.setSequenceType();

            if (sequenceType !== 'video') {
                $('.intro-sequence-image.frame-three').css({
                    display: 'block'
                });
            }

            $('#frame-three').velocity('transition.slideLeftIn',
            {
                delay: 1000,
                duration: 1200,
                easing: 'easeOut',
                complete: function () {
                    frameThree.text(self);
                }
            });
        },
        text: function (self) {

            // Show site content
            $('.intro-active #site-content, .intro-active #main-header').css({
                display: 'block'
            });

            $('#frame-three').velocity('fadeOut',
              {
                  delay: 1800,
                  duration: 800,
                  easing: 'easeOut',
                  complete: function () {
                      $('#intro-sequence').velocity({ translateY: '-100%' },
                        {
                            duration: 1000,
                            easing: 'easeOut',
                            complete: self.complete
                        });
                  }
              });
        }
    };

    function resizeToCover() {
        // set the video viewport to the window size
        $('.video-viewport').width($(window).width());
        $('.video-viewport').height($(window).height());

        // use largest scale factor of horizontal/vertical
        var scaleH = $(window).width() / vidWOrig;
        var scaleV = $(window).height() / vidHOrig;
        var scale = scaleH > scaleV ? scaleH : scaleV;

        // don't allow scaled width < minimum video width
        if (scale * vidWOrig < minW) { scale = minW / vidWOrig; }

        // now scale the video
        $('.video-viewport video').width(scale * vidWOrig);
        $('.video-viewport video').height(scale * vidHOrig);

        // and center it by scrolling the video viewport
        $('.video-viewport').scrollLeft(($('video').width() - $(window).width()) / 2);
        $('.video-viewport').scrollTop(($('video').height() - $(window).height()) / 2);
    }

    function getQueryString(obj) {
        var string = window.location.search.substring(1);
        var strings = string.split('&');
        for (var i = 0; i < strings.length; i++) {
            var set = strings[i].split('=');
            if (set[0] === obj) {
                return set[1];
            }
        }
    }

}(window.jQuery, window));
