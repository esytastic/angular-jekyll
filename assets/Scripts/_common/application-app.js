var Applications = (function ($, global) {
    'use strict';
    global.gogoro = global.gogoro || {};
    global.gogoro.Apps = Apps;

    function Apps() {
        var self = this;
        //this.header = new global.gogoro.partials.Header();
        this.footer = new global.gogoro.partials.Footer();

        // FastClick
        // This prevent issues with Android browsers
        // binding both touchstart and click events
        FastClick.attach(document.body);

        // // Test for Android Chrome, there's a nasty bug when preloading.
        // var state = document.visibilityState || document.webkitVisibilityState;

        // if ( state !== 'visible' ) {
        //   // This alert will never be seen, since it will only be invoked during preloading,
        //   // but it will abort the preloading and force regular loading
        //   alert( 'Please reload this page.' );
        // }

        // Pjax
        if ($.support.pjax) {
            $(global.document).pjax('a[data-pjax]', '#site-content', {
                fragment: '#site-content'
            })
            .on('pjax:clicked', function () {
                self.header.closeNav();
            })
            .on('pjax:complete', function () { self.onNewPage(); });
        }
        this.onNewPage();

        var responsiveImages = new global.gogoro.common.responsiveImages();
    }

    Apps.prototype.onNewPage = function () {
        var state = $('#site-content div:first-child').first().data().state;
        //this.header.setPg(state);
        if (typeof global.gogoro[state] != 'undefined') {
            var pg = new global.gogoro[state]();
        }
    };

    //Apps.mediaQueries = {
    //    'xs': {
    //        'min': 0,
    //        'max': 767
    //    },
    //    'sm': {
    //        'min': 768,
    //        'max': 991
    //    },
    //    'md': {
    //        'min': 992,
    //        'max': 1199
    //    },
    //    'lg': {
    //        'min': 1200
    //    }
    //};

    //Apps.getBreakpoint = function () {
    //    var browserWidth = $(window).outerWidth();
    //    if (browserWidth >= App.mediaQueries.xs.min && browserWidth <= App.mediaQueries.xs.max) {
    //        return 'xs';
    //    } else if (browserWidth >= App.mediaQueries.sm.min && browserWidth <= App.mediaQueries.sm.max) {
    //        return 'sm';
    //    } else if (browserWidth >= App.mediaQueries.md.min && browserWidth <= App.mediaQueries.md.max) {
    //        return 'md';
    //    } else if (browserWidth >= App.mediaQueries.lg.min) {
    //        return 'lg';
    //    }
    //};

    return {
        init: function () {
            global.gogoro.app = new global.gogoro.Apps();
        }
    };

}(window.jQuery, window));

$(Applications.init);
