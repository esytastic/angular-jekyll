(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.NewsCoverage = NewsCoverage;

    function NewsCoverage() {
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
    }
}(window.jQuery, window));