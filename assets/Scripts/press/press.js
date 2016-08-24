(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.Press = Press;

    function Press() {
        global.gogoro.common.gradientHeader();
        global.gogoro.common.socialShare();

        // Match press sidebar to press article height
        $('.press-sidebar').css({
            height: $('.press-main').outerHeight()
        });

        // Press topbar collapse toggle
        $('.navigation-topbar .target').on('click', function (e) {
            e.preventDefault();
            $('#page-navigation').collapse('toggle');
        });

        //initNav();
        //monitorScrollForPaging();
    }

    /*******************************
      PRIVATE FUNCTIONS
    *******************************/

    function initNav() {

        $('#press-navigation .navigate-newer').on('mouseenter', $.debounce(100, function () {
            $(this).velocity('stop').velocity({
                right: -2
            }, {
                duration: 300,
                easing: 'easeOutSine'
            });
        })).on('mouseleave', $.debounce(400, function () {
            $(this).velocity('stop').velocity({
                right: -204
            }, {
                duration: 300,
                easing: 'easeInSine'
            });
        }));

        $('#press-navigation .navigate-older').on('mouseenter', $.debounce(100, function () {
            $(this).velocity('stop').velocity({
                left: -2
            }, {
                duration: 300,
                easing: 'easeOutSine'
            });
        })).on('mouseleave', $.debounce(400, function () {
            $(this).velocity('stop').velocity({
                left: -204
            }, {
                duration: 300,
                easing: 'easeInSine'
            });
        }));
    }

    function monitorScrollForPaging() {

        if ($('#hero-header').length) {
            var headerWatcher = global.scrollMonitor.create($('#hero-header'));

            headerWatcher.enterViewport(function () {
                hidePressNavigation();
            });

            headerWatcher.exitViewport(function () {
                showPressNavigation();
            });
        }

        if ($('#main-footer').length) {
            var footerWatcher = global.scrollMonitor.create($('#main-footer'));

            footerWatcher.enterViewport(function () {
                hidePressNavigation();
            });

            footerWatcher.exitViewport(function () {
                showPressNavigation();
            });
        }

    }

    function showPressNavigation() {
        $('#press-navigation .navigate-older').velocity({ left: -204 },
        {
            duration: 400,
            easing: 'easeOut'
        });

        $('#press-navigation .navigate-newer').velocity({ right: -204 },
        {
            duration: 400,
            easing: 'easeOut'
        });
    }

    function hidePressNavigation() {
        $('#press-navigation .navigate-older').velocity({ left: -252 },
        {
            duration: 200,
            easing: 'easeIn'
        });

        $('#press-navigation .navigate-newer').velocity({ right: -252 },
        {
            duration: 200,
            easing: 'easeIn'
        });
    }

}(window.jQuery, window));



