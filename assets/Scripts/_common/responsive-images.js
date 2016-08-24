(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.common = global.gogoro.common || {};
    global.gogoro.common.responsiveImages = responsiveImages;

    function responsiveImages($container) {

        $('img').each(function (i, img) {

            var $img = $(img);

            if ($img.attr('data-src-lg')) {
                if (global.gogoro.App.getBreakpoint() === 'xs' || global.gogoro.App.getBreakpoint() === 'sm') {
                    $img.attr('src', $img.attr('data-src-xs'));
                } else {
                    $img.attr('src', $img.attr('data-src-lg'));
                }
            }
        });

    }

}(window.jQuery, window));
