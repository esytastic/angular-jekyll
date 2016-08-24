(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.common = global.gogoro.common || {};
    global.gogoro.common.VideoModal = VideoModal;

    function VideoModal() {
        var self = this;
        $('.launch-video-modal').on('click', function (e) {
            e.preventDefault();
            self.launch(this);
        });
    }

    VideoModal.prototype.launch = function (element) {
        var self = this;
        var videoSrc = $(element).attr('data-video-src');
        var videoId = '#' + $(element).attr('data-video-id');
        var youTubeVideoId = 'GSYs4IEclpU';

        $('<div>', {
            'class': 'video-modal'
        }).appendTo('body');

        $('<a>', {
            'href': '#',
            'class': 'close-video-modal',
            html: '<i class="icon-close"></i>'
        }).appendTo('.video-modal');

        $('<div>', {
            'class': 'container'
        }).appendTo('.video-modal');

        $('<div>', {
            'class': 'row vertical-center-container'
        }).appendTo('.video-modal .container');

        $('<div>', {
            'class': 'col-sm-10 col-sm-offset-1 vertical-center video-container embed-responsive embed-responsive-16by9'
        }).appendTo('.video-modal .row');

        $('<iframe>', {
            'id': 'vision-video',
            'class': 'embed-responsive-item',
            'src': '//www.youtube.com/embed/' + youTubeVideoId + '?enablejsapi=1&autoplay=1&rel=0&vq=hd720',
            'allowfullscreen': '',
            'frameborder': '0'
        }).appendTo('.video-modal .video-container');

        // Add video height/width attribute
        $('#vision-video').attr('width', 972);
        $('#vision-video').attr('height', 547);

        // Prevent scroll
        $('body').addClass('video-modal-active');

        $.doTimeout('videoModal', 100, function () {
            // Modal created, fade in
            $('.video-modal').velocity('stop').velocity('fadeIn');

            // Bind click event
            $('.video-modal .close-video-modal, .video-modal').on('click', function (e) {
                e.preventDefault();
                self.close(videoSrc, videoId);
            });
        });

        if ($('html.lt-ie9').length) {
            setTimeout(function () {
                var videoPosY = ($('.video-modal .video-container').outerHeight() - $(window).outerHeight()) / 2;
                $('.video-modal .video-container').css({
                    top: Math.abs(videoPosY)
                });
            }, 1000);

            $(window).resize(function () {
                var videoPosY = ($('.video-modal .video-container').outerHeight() - $(window).outerHeight()) / 2;
                $('.video-modal .video-container').css({
                    top: Math.abs(videoPosY)
                });
            });
        }

    };

    VideoModal.prototype.close = function (src, id) {
        var $target = $('.video-modal');

        $(id)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

        $target.velocity('stop').velocity('fadeOut', {
            complete: function () {
                $target.remove();
            }
        });

        $('body').removeClass('video-modal-active');
    };

}(window.jQuery, window));
