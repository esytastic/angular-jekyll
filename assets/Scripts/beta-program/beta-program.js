(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.BetaProgram = BetaProgram;

    function BetaProgram() {
        //global.gogoro.common.gradientHeader();
        global.gogoro.common.socialShare();

        $(window).resize(function () {
            console.log($( window ).width());
        });
    }
}(window.jQuery, window));
