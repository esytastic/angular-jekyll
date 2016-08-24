

var SmartScooter = (function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.AppIntro = AppIntro;

    function AppIntro() {
        var self = this;
    }

    AppIntro.bootstrapTakeover = function () {

        AppIntro.isTakeoverActive = false;
        AppIntro.takeoverDetect = true;
        AppIntro.enableMove = false;

        AppIntro.LoadTakeover = function () {

            if (!$('body').hasClass('intro-takeover-loaded')) {

                $('.navbar-header').removeClass('white');
                $(window).scrollTop(0);

                $('body').addClass('intro-takeover');

                $('#landingPage').css({ top: 0 });

                $('.module-faster-0-site-intro').css({
                    height: $(window).outerHeight(),
                    top: 0,
                    display: 'block'
                });

                $(window).on('resize', function () {
                    if ($('body').hasClass('intro-takeover')) {
                        $('.module-faster-0-site-intro').css({
                            height: $(window).outerHeight()
                        });
                    }
                });

                /*
                imgix.onready(function() {
                  imgix.fluid({
                    fluidClass: 'intro-gogoro'
                  });
                });*/

                gogoro.scene = 0;
                AppIntro.setupMovie();
                $('.module-faster-0-site-intro .intro-container').css({ top: 0 });

                //binding scroll event
                $('.module-faster-0-site-intro').unbind('mousewheel DOMMouseScroll MozMousePixelScroll').on('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
                    if (!gogoro.AppIntro.enableMove) {
                        return;
                    }
                    if (!gogoro.AppIntro.takeoverDetect) {
                        return;
                    }
                    if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
                        //scroll down
                        //console.log('scroll down');

                        gogoro.AppIntro.removeTakeover();
                        //}
                    } else {
                        //scroll up
                        //console.log('scroll up');
                        if (gogoro.scene === 1) {
                            AppIntro.rollBackTakeover();
                        }
                    }
                });
            }

            if ($('.module-faster-0-site-intro')[0] && gogoro.App.getState === 'fallback') {
                swipedetect($('.module-faster-0-site-intro')[0], function (swipedir) {

                    if (swipedir == 'up') {
                        if (gogoro.scene === 0) {
                            gogoro.AppIntro.LoadMovieClip();
                        } else {
                            gogoro.AppIntro.removeTakeover();
                        }
                    } else if (swipedir == 'down') {
                        if (gogoro.scene === 1) {
                            AppIntro.rollBackTakeover();
                        }
                    }
                });
            }
        }

        AppIntro.setupMovie = function () {
            var videoId = 'zIwkHeG1hAE';
            //var videoId = 'tmeOjFno6Do';
            if (!gogoro.AppIntro.loadedApi) {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            global.onYouTubeIframeAPIReady = function () {
                gogoro.AppIntro.loadedApi = true;
                launchPlayer();
            }
            if (undefined !== gogoro.AppIntro.ytplayer) {
                //gogoro.App.ytplayer.seekTo(0);
                //gogoro.App.ytplayer.stopVideo();
                try {
                    gogoro.AppIntro.ytplayer.loadVideoById(videoId, 0, 'hd1080');
                    gogoro.AppIntro.ytplayer.pauseVideo();
                } catch (e) {
                    launchPlayer();
                }
            }
            function launchPlayer() {
                gogoro.AppIntro.ytplayer = new YT.Player('bgPlayer', {
                    videoId: videoId,
                    playerVars: { controls: 1, autoplay: 0 /*, wmode:'transparent'*/ },
                    events: {
                        'onReady': function () {
                            gogoro.AppIntro.ytplayer.loadVideoById(videoId, 0, 'hd1080');
                            gogoro.AppIntro.ytplayer.pauseVideo();
                        },
                        'onStateChange': onStateChange
                    }
                });
            }
            function onStateChange(e) {
                if (e.data === 0) {
                    gogoro.AppIntro.removeTakeover();
                }
            }
        };
        AppIntro.LoadMovieClip = function () {
            gogoro.AppIntro.takeoverDetect = false;
            $('#landingPage').animate({ top: '-100%' }, 'slow', 'linear', function () {
                //document.getElementById('bgPlayer').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                //gogoro.AppIntro.ytplayer.playVideo();
                //main-header
                $('.navbar-header').addClass('white');
                gogoro.AppIntro.enableTakeoverDetect();
                gogoro.scene = 1;
            });
        }
        AppIntro.rollBackTakeover = function () {
            gogoro.scene = 0;
            gogoro.AppIntro.takeoverDetect = false;
            //document.getElementById('bgPlayer').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            if (undefined !== gogoro.AppIntro.ytplayer) {
                gogoro.AppIntro.ytplayer.pauseVideo();
            }
            $('#landingPage').animate({ top: '0' }, 'slow', 'linear', function () {
                gogoro.scene = 0;
                $('.navbar-header').removeClass('white');
                gogoro.AppIntro.enableTakeoverDetect();
            });
        }
        AppIntro.enableTakeoverDetect = function () {
            setTimeout(function () {
                gogoro.AppIntro.takeoverDetect = true;
            }, 1000);
        };

        AppIntro.removing = false;

        AppIntro.removeTakeover = function () {

            if (gogoro.AppIntro.removing) {
                return;
            }

            if (gogoro.App.getState() === 'standard') {
                // When .module-faster-0-site-intro is removed, play again ('module-faster-1-page-intro')).scope().standard.init();
                angular.element(document.getElementById('module-faster-1-page-intro')).scope().standard.destroy();
                angular.element(document.getElementById('module-faster-1-page-intro')).scope().standard.init();
            }

            gogoro.AppIntro.removing = true;
            $('.nav-bar-stop').hide();
            $('.navbar').show();
            $('.navbar-header').removeClass('white');
            $('.video_hero .container').removeClass('transparent');
            var windowHeight = $(window).outerHeight();
            $('body').scrollTop(0)

            $('.module-faster-0-site-intro').velocity({
                top: -2 * windowHeight
            }, {
                duration: windowHeight,
                ease: 'easeOut',
                complete: function () {

                    $('.module-faster-0-site-intro').unbind('mousewheel').css({
                        display: 'none'
                    });

                    $('.inavbar-header').removeClass('white');
                    try {
                        gogoro.AppIntro.ytplayer.stopVideo();
                        gogoro.AppIntro.removing = false;
                    } catch (e) {

                    }
                    setTimeout(function () {
                        $('body').removeClass('intro-takeover').addClass('intro-takeover-loaded');

                    }, 300);


                }
            });
        }

    }
    return {
        initTakeover: function () {
            gogoro.AppIntro.bootstrapTakeover();
            // When user click the top left of gogoro logo
            $('.navbar-brand').on('click', function (e) {

                if (gogoro.App.getState() === 'standard') {
                    gogoro.AppIntro.isTakeoverActive = true;
                    $('body').removeClass('intro-takeover-loaded').addClass('intro-takeover');
                    AppIntro.removing = false;
                    AppIntro.LoadTakeover();

                }
            });
        }
    };

}(window.jQuery, window));

var gogoroApp = angular.module('gogoro', [
  'ui.bootstrap',
  'ui.router',
  'angular-inview',
  'gogoro.partial.tabbarView',
  'gogoro.partial.fallbackManager',
  'gogoro.partial.modulePageIntro',
  'gogoro.partial.moduleSummaryInfo',
  'gogoro.partial.moduleVideo',
  'gogoro.partial.moduleVideoSlider',
  'gogoro.partial.GaContentTracking',
  'ngTouch',
  'LocalStorageModule',
  'ipCookie'
])

// App controller is used for handling global events,
// and catching errors if lower level resources cannot be resolved.
.controller('AppController', ["$scope", "$rootScope", "$state", "localStorageService", "GogoroUrlService", "GogoroUserService", "$http", function ($scope, $rootScope, $state, localStorageService, GogoroUrlService, GogoroUserService, $http) {
    $rootScope.$on('$stateChangeSuccess', function (event, current, previous, rejection) {
        $rootScope.stateName = $state.current.name;
    });

    /*
    |--------------------------------------------------------------------------
    | Build url for local, dev and product
    |--------------------------------------------------------------------------
    |
    */
    //console.log('gogoro', gogoro.Locale.lang);
    $rootScope.gogoro = GogoroUrlService.gogoroUrlGenerate();
    //console.log("$rootScope.gogoro", $rootScope.gogoro);

    /*
    |--------------------------------------------------------------------------
    | user login cookie
    |--------------------------------------------------------------------------
    |
    */
    GogoroUserService.init();

    if (Modernizr.sessionstorage)
    {
        if (sessionStorage.getItem('languageRedirectPerformed') || location.pathname != '/') {
            return true;
        }

        var currentLang = gogoro.Locale.lang;

        $http.get('https://freegeoip.net/json/')
        .then(function (res) {

            var data = res.data;

            // 1. make sure everyone outside TW goes to www.gogoro.com (global)

            if (data.country_code.toLowerCase() !== 'tw' && currentLang !== 'en') {
                location.href = location.protocol + '//' + location.host + '/';
            }

            // 2. go to /tw for folks in TW

            if (data.country_code.toLowerCase() === 'tw' && currentLang !== 'zh-tw') {
                location.href = location.protocol + '//' + location.host + '/tw';
            }

            sessionStorage.setItem('languageRedirectPerformed', true);
        })
        .catch(function () {
            console.error('Couldn\'t determine user location via GeoIP');
            sessionStorage.setItem('languageRedirectPerformed', true);
        });
    }
}])
.run(["$rootScope", function ($rootScope) {

}]);

SmartScooter.initTakeover();

/*
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}])
.directive('video', function() {
  return {
    restrict : 'EA',
    template: '{{ngVideo}}',
    //'<source ng-repeat="source in ngVideo.sources" src="{{source.url|trusted}}" type="{{source.type}}"></source>',
    scope : {
      ngVideo : "@"
    },
    link : function(scope , el){
      console.log(scope.ngVideo);
      if(typeof(scope.callback) === 'function'){
        scope.callback();
      }
    }
  };
})*/;

var dist;
function swipedetect(el, callback){
      console.log(el);
       var touchsurface = el,
       swipedir,
       startX,
       startY,
       distX,
       distY,
       threshold = 150, //required min distance traveled to be considered swipe
       restraint = 100, // maximum distance allowed at the same time in perpendicular direction
       allowedTime = 300, // maximum time allowed to travel that distance
       elapsedTime,
       startTime,
       handleswipe = callback || function(swipedir){}

       touchsurface.addEventListener('touchstart', function(e){

        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        e.preventDefault();
        console.log('touch start ~');
       }, false)

       touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
        console.log('touch move ~');
       }, false)

       touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
         if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
          swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
         }
         else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
          swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
         }
        }
        handleswipe(swipedir)
        e.preventDefault();
        console.log('touch end ~');
       }, false)
 }



$(document).ready(function(){

  preloadImg = ['//gogoro.imgix.net/site-intro-gogoro.png?w=550', '//images.gogoroapp.com/icons/loading/loading_circle_v2.png'];

  $.each(preloadImg, function (i, obj) {
    var _img = new Image();
    _img.src = obj;
  });

  $('img.svg').each(function(){
      var $img = jQuery(this);

      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');

          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          $img.replaceWith($svg);

      }, 'xml');
      setTimeout(function(){
          window.scrollTo(0, 1);
      }, 100);
  });

});



setTimeout(function () {
    $("body").velocity({ opacity: 1 }, 500);
    console.log('fadeIn body tag');
}, 250);
