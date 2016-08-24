/*
|--------------------------------------------------------------------------
| Avoid `console` errors in browsers that lack a console.
|--------------------------------------------------------------------------
|
*/
(function () {
    var method;
    var noop = function () { };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());





/*
|--------------------------------------------------------------------------
| jQuery requestAnimationFrame - v0.1.3pre - 2014-02-07
| https://github.com/gnarf37/jquery-requestAnimationFrame
| Copyright (c) 2014 Corey Frang; Licensed MIT
|--------------------------------------------------------------------------
|
*/

(function (jQuery) {

    // requestAnimationFrame polyfill adapted from Erik Möller
    // fixes from Paul Irish and Tino Zijdel
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating


    var animating,
        lastTime = 0,
        vendors = ['webkit', 'moz'],
        requestAnimationFrame = window.requestAnimationFrame,
        cancelAnimationFrame = window.cancelAnimationFrame;

    for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
        requestAnimationFrame = window[vendors[lastTime] + "RequestAnimationFrame"];
        cancelAnimationFrame = cancelAnimationFrame ||
            window[vendors[lastTime] + "CancelAnimationFrame"] ||
            window[vendors[lastTime] + "CancelRequestAnimationFrame"];
    }

    function raf() {
        if (animating) {
            requestAnimationFrame(raf);
            jQuery.fx.tick();
        }
    }

    if (requestAnimationFrame) {
        // use rAF
        window.requestAnimationFrame = requestAnimationFrame;
        window.cancelAnimationFrame = cancelAnimationFrame;
        jQuery.fx.timer = function (timer) {
            if (timer() && jQuery.timers.push(timer) && !animating) {
                animating = true;
                raf();
            }
        };

        jQuery.fx.stop = function () {
            animating = false;
        };
    } else {
        // polyfill
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };

    }

}(jQuery));


/*
|--------------------------------------------------------------------------
| Application Init
|--------------------------------------------------------------------------
| Create global variables for responsive website development. 
| When page loaded this javascript will do two things: 
| 1. set breakpont:  
|    using gogoro.App.getBreakpoint() to get breakpont : xs, sm, md, lg;
|
| 2. set current sate: this will assign state to gogoro.App.currentState, 
|                      and add .state-standard or state-fallback class to the html body tag.  
|    using gogoro.App.currentState to get current state : standard or fallback 
| 
|    
*/

var Application = (function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.App = App;

    function App() {
        var self = this;
        //this.header = new global.gogoro.partials.SlidePushMenu();
        //this.slidePushMenu = new global.gogoro.partials.Header();
        //this.footer = new global.gogoro.partials.Footer();

        // FastClick
        // This prevent issues with Android browsers
        // binding both touchstart and click events
        FastClick.attach(document.body);

        App.swalConfig();
    }

    App.swalConfig = function () {
        switch(gogoro.Locale.lang) {
            case 'zh-tw':
                App.swalTitle = 'Gogoro 提醒';
                break;
        }
    }

    App.multiSearchOr = function (text, searchWords) {
        // create a regular expression from searchwords using join and |. Add "gi".
        // Example: ["ANY", "UNATTENDED","HELLO"] becomes
        // "ANY|UNATTENDED|HELLO","gi"
        // | means OR. gi means GLOBALLY and CASEINSENSITIVE
        var searchExp = new RegExp(searchWords.join("|"), "gi");
        // regularExpression.test(string) returns true or false
        return searchExp.test(text);
    }

    App.mediaQueries = {
        'xs': {
            'min': 0,
            'max': 767
        },
        'sm': {
            'min': 768,
            'max': 991
        },
        'md': {
            'min': 992,
            'max': 1199
        },
        'lg': {
            'min': 1200
        }
    };

    // For testing fallbacks
    // isMobile.any = true;

    App.getBreakpoint = function () {
        var browserWidth = $(window).outerWidth();
        if (browserWidth >= App.mediaQueries.xs.min && browserWidth <= App.mediaQueries.xs.max) {
            return 'xs';
        } else if (browserWidth >= App.mediaQueries.sm.min && browserWidth <= App.mediaQueries.sm.max) {
            return 'sm';
        } else if (browserWidth >= App.mediaQueries.md.min && browserWidth <= App.mediaQueries.md.max) {
            return 'md';
        } else if (browserWidth >= App.mediaQueries.lg.min) {
            return 'lg';
        }
    };

    // Current browser state
    App.currentState = null;

    // Get current state
    App.getState = function () {
        var state = null;
        if ($('html').hasClass('lt-ie10') || isMobile.any || gogoro.App.getBreakpoint() === 'xs' || gogoro.App.getBreakpoint() === 'sm') {
            state = 'fallback'
        } else {
            state = 'standard'
        }
        return state;
    };

    // Set current browser state
    App.setState = function () {

        // Set current state on load
        gogoro.App.currentState = gogoro.App.getState();

        // Set body state body class
        setPageState();

        // Set current on browser resize
        $(window).on('resize', function () {
            // Set current state
            gogoro.App.currentState = gogoro.App.getState();

            // Set body state body class
            setPageState();
        });

        function setPageState() {
            if (gogoro.App.currentState === 'standard') {
                $('body').removeClass('state-fallback').addClass('state-standard');
            } else {
                $('body').removeClass('state-standard').addClass('state-fallback');
            }
        }
    };

    return {
        init: function () {

            global.gogoro.app = new global.gogoro.App();

            // Set browser sate on load
            gogoro.App.setState();

            //this.header = new global.gogoro.partials.SlidePushMenu();
            //this.slidePushMenu = new global.gogoro.partials.Header();
            this.footer = new global.gogoro.partials.Footer();

            if (isMobile.phone || isMobile.tablet) {
                $('body').addClass('mobile');
            }
        }
    };

}(window.jQuery, window));

Application.init();
//console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
//console.log('gogoro.App.currentState', gogoro.App.currentState);
//console.log('-----------Application--------------');


/*
|--------------------------------------------------------------------------
| Global Variables
|--------------------------------------------------------------------------
|
*/

var GlobalForm = (function ($) {
    'use strict';

    var DOBYears = [];

    var FACEBOOK_APP_ID = 250138115102620;
    var FACEBOOK_SCOPE_PERMISSIONS = "public_profile,email,user_photos,user_education_history,user_hometown,user_birthday,user_photos,user_location";

    var init = function () {
        //generateDOBYears();
        //console.log('DOBYears', DOBYears);
    };

    var generateDOBYears = function () {
        var loop = 50;
        var startYear = 1950;
        for (var i = 0; i < loop; i++) {
            var d = new Date(startYear + i, 1, 1);
            //var fullYear = "<option value='" + d.getFullYear() + "' >" + d.getFullYear() + "</option>";
            var fullYear = d.getFullYear() ;
            var yearArray = { 'name': fullYear }
            DOBYears.push(yearArray);
        }

        return DOBYears;
    }

    var _privateMethod = function (message) {
        console.log(message);
    };

    return {
        init: init,
        generateDOBYears:generateDOBYears,
        FACEBOOK_APP_ID: FACEBOOK_APP_ID,
        FACEBOOK_SCOPE_PERMISSIONS: FACEBOOK_SCOPE_PERMISSIONS
    };

}(window.jQuery, window));
gogoro.form = GlobalForm || {};
gogoro.form.init();


/*
|--------------------------------------------------------------------------
| Display IE Alert Box
|--------------------------------------------------------------------------
|
*/
$('#btn-close-ie-alert-box').on('click', function (e) {
    e.preventDefault();
    $('#ie-upgrade-box').animate({opacity:0},500,function(){
         $(this).hide();
    });
});

/*
|--------------------------------------------------------------------------
| Drop down - foot sitemap
|--------------------------------------------------------------------------
|
*/
$(function () {
    new DropDown($('#dropdown--i18n'));
    //var $dropdowni18n = $('#dropdown--i18n');
    //var $options = $dropdowni18n.find('.dropdown li a');
    //var $choice = $dropdowni18n.find('.choice');

    //if (gogoro.Locale.lang == 'en-tw') {
    //    $dropdowni18n.find('.dropdown li.english').hide();
    //    $choice.text('English');
    //} else {
    //    $dropdowni18n.find('.dropdown li.chinese').hide();
    //    $choice.text('Chinese');
    //}


    //$options.on('click', function (e) {
    //    e.preventDefault();
    //    var url = "http://" + window.location.host;
    //    var lang = $(this).data('lang');

    //    if (gogoro.Locale.lang == 'en-tw') {

    //    } else {

    //    }

    //});
});

/*
|--------------------------------------------------------------------------
| Cycle loading animation
|--------------------------------------------------------------------------
|
*/
(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.Loader = Loader;

    // base settings 
    var $spriteLoadingWrap = $('#sprite-loading-wrap');

    // animation settings
    var fps = 30,
    currentFrame = 0,
    cycleWidth = 30,
    totalFrames = 40,
    elmLoadingCycle = document.getElementById("sprite-image"),
    bgPosition = 0;
    
    function Loader() {
        var self = this;
    }
    
    //
    Loader.setTitle = function (title) {
        title = typeof title !== 'undefined' ? title : '';

        if (title != '') {
            var $spriteTitle = $('#sprite-loading-wrap').find('#sprite-title');
            $spriteTitle.text(title);
            $spriteTitle.addClass('active');
        }
        
    }

    // update cycle image to the center of viewport
    Loader.updateLoaderPosition = function () {
        var $spriteImage = $('#sprite-loading-wrap').find('.sprite-image');
        var $spriteAssetsContainer = $('#sprite-loading-wrap').find('.sprite-assets-container');
        
        var $siteContent = $('#site-content');
        
        //console.log('bodyHeight', bodyHeight);

        setTimeout(function () {
            var bodyHeight = $('body').height();
            var siteContentHeight = $siteContent.height();
            var viewHeight = $(window).height();
            var currentScrollPosition = $(window).scrollTop();

            //console.log('currentScrollPosition', currentScrollPosition);

            //var imgPosition = currentScrollPosition + (bodyHeight / 2);
            var imgPosition = bodyHeight / 2;
            $spriteLoadingWrap.css('height', bodyHeight);
            $spriteAssetsContainer.css('top', imgPosition - 100);


            //console.log('Window Height ', viewHeight);
            //console.log('Body Height ', bodyHeight);
            //console.log('Site ContentHeight ', siteContentHeight);

            //
            // add overflow to body 
            $('body').width($('body').width());
            $('body').addClass('noscroll');

            //show loading wrap
            $spriteLoadingWrap.show();
            setTimeout(function () {
                $spriteLoadingWrap.velocity({ opacity: 1 }, 200);
            }, 20);

            // set frame per seconds 
            TweenMax.ticker.fps(fps);
            // add the listener
            TweenMax.ticker.addEventListener('tick', Loader.loadingCycleAnimate);

        },1000);
    }

    // start loading animation
    Loader.fullscreenStart = function () {
        //
        Loader.updateLoaderPosition();
    }

    // stop loading animation
    Loader.fullscreenStop = function () {

        var $spriteTitle = $('#sprite-loading-wrap').find('#sprite-title');
        $spriteTitle.text('');
        $spriteTitle.removeClass('active');

        //console.log('stop');
        //to remove the listener
        TweenLite.ticker.removeEventListener("tick", Loader.loadingCycleAnimate);
        //hide loading wrap
        $spriteLoadingWrap.velocity({ opacity: 0 }, {
            // 500
            duration: 500, complete: function () {
                $spriteLoadingWrap.hide();
                $('body').removeAttr('style');
                $('body').removeClass('noscroll');
            }
        });

    }

    Loader.loadingCycleAnimate = function () {

        // calculate css background-position
        bgPosition = currentFrame * cycleWidth;

        // change css background-position value.
        elmLoadingCycle.style.backgroundPosition = "-" + bgPosition + "px 0";

        // reset or increase currentFrame
        if (currentFrame >= totalFrames) {
            currentFrame = 0;
        } else {
            currentFrame++;
        }
    }

}(window.jQuery, window));

//setTimeout(function () {
//    gogoro.Loader.fullscreenStart();
//}, 3000);


//setTimeout(function () {
//    gogoro.Loader.fullscreenStop();
//}, 8000);


