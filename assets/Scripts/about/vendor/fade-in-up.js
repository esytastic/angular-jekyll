(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.common = global.gogoro.common || {};
    global.gogoro.common.FadeInUp = FadeInUp;

    function FadeInUp($container) {

        $container.find('.fade-in-up').velocity({
            opacity: 1,
            translateY: -5
        }, {
            delay: 200,
            duration: 450,
            ease: 'easeOut'
        });

    }

}(window.jQuery, window));
