(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.About = About;

    var gogoro = global.gogoro;

    function About() {
        var intro = new gogoro.common.IntroSequence();

        // Parallax scroll on video image
        if (!global.Modernizr.touch) {
            $.stellar();
        }

        // init fade in up
        gogoro.common.FadeInUp($('#pg-home'));

        // init video
        var videoModal = new gogoro.common.VideoModal();

        /*
          "Play Video" button animation
        */
        $('#gogoro-video .btn').on('mouseenter', function () {

            var $this = $(this);

            if (!$this.hasClass('hovered')) {
                $this.doTimeout('hover', 100, function (elem) {
                    $('span', elem).velocity('stop').velocity('transition.slideLeftBigOut', { duration: 200, easing: 'easeOut' });
                    $('i', elem).velocity('stop').velocity('transition.slideRightBigIn', { duration: 200, easing: 'easeOut' });
                    $this.addClass('hovered');
                }, $this);
            }
        }).on('mouseleave', function () {
            var $this = $(this);

            $this.doTimeout('hover');

            if ($this.hasClass('hovered')) {
                $this.removeClass('hovered');
                $('span', this).velocity('stop').velocity('transition.slideLeftBigIn', { duration: 200, easing: 'easeOut' });
                $('i', this).velocity('stop').velocity('transition.slideRightBigOut', { duration: 200, easing: 'easeOut' });
            }
        });

        initCarousel();
    }


    /**********************
      Private Functions
    ***********************/

    function initCarousel() {
        $('#our-team .slider').slick({
            centerMode: true,
            dots: false,
            arrows: false,
            accessibility: true,
            infinite: true,
            speed: 650,
            centerPadding: '195px',
            cssEase: 'ease',
            slidesToShow: 1,
            draggable: false,
            onInit: function (element) {
                var $this = element;
                var $teamBio = $('#team-bio');
                var teamBio = $('.slick-active .slide-content').html();

                // Clear slider indicator
                $('#slider-indicator').html('');

                // Create and set slider indicator to current slide
                $('<span>', {
                    'class': 'slider-current',
                    html: $this.currentSlide + 1
                }).appendTo('#slider-indicator');

                // Create divider
                $('<span>', {
                    html: '/'
                }).appendTo('#slider-indicator');

                // Create and set slider indicator total slides
                $('<span>', {
                    'class': 'slider-total',
                    html: $this.slideCount
                }).appendTo('#slider-indicator');

                // Set team member bio to current
                $('.row', $teamBio).html('').html(teamBio);

                // Fade in team member bio
                $teamBio.velocity('fadeIn', { duration: 250 });

                // Set next/prev slides
                $('.slick-active').next().addClass('slick-next-slide');
                $('.slick-active').prev().addClass('slick-prev-slide');

                // Bind next/prev
                $('.slick-next-slide').on('click', function (e) {
                    e.preventDefault();
                    $('#our-team .slider').slickNext();
                });

                $('.slick-prev-slide').on('click', function (e) {
                    e.preventDefault();
                    $('#our-team .slider').slickPrev();
                });

                // Fade in active slide
                $('.slick-active img').velocity('fadeIn', { delay: 100, duration: 200, ease: 'easeOut' });
            },
            onBeforeChange: function (element, slide) {
                 //console.log('onBeforeChange');

                var $this = element;
                var $teamBio = $('#team-bio');

                $teamBio.velocity('stop');

                // Fade out team member bio
                $teamBio.velocity('fadeOut', {
                    duration: 300,
                    complete: function () {
                        var teamBio = $('.slick-active .slide-content').html();

                        // Set team member bio to current
                        $('.row', $teamBio).html('').html(teamBio);

                        // Fade in team member bio
                        $teamBio.velocity('fadeIn', { delay: 100, duration: 350 });
                    }
                });

                // Remove next/prev classes
                $('.slick-next-slide').unbind().removeClass('slick-next-slide');
                $('.slick-prev-slide').unbind().removeClass('slick-prev-slide');
            },
            onAfterChange: function (element) {
                 //console.log('onAfterChange');

                var $this = element;
                var $teamBio = $('#team-bio');
                var teamBio = $('.slick-active .slide-content').html();

                // Set slider indicator current slide
                $('#slider-indicator .slider-current').html($this.currentSlide + 1);

                // Set next/prev slides
                $('.slick-active').next().addClass('slick-next-slide');
                $('.slick-active').prev().addClass('slick-prev-slide');

                // Bind next/prev
                $('.slick-next-slide').on('click', function (e) {
                    e.preventDefault();
                    $('#our-team .slider').slickNext();
                });

                $('.slick-prev-slide').on('click', function (e) {
                    e.preventDefault();
                    $('#our-team .slider').slickPrev();
                });
            },
            responsive: [
            {
                breakpoint: gogoro.App.mediaQueries.md.max,
                settings: {
                    centerPadding: '162px'
                }
            }, {
                breakpoint: gogoro.App.mediaQueries.sm.max,
                settings: {
                    centerPadding: '125px'
                }
            }, {
                breakpoint: gogoro.App.mediaQueries.xs.max,
                settings: {
                    centerPadding: '27px'
                }
            }]
        });
    }

    $('.hint-scroll-down').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: ($('#gogoro-video').offset().top - 200) }, 500);
    });


}(window.jQuery, window));
