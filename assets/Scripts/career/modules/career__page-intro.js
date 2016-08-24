gogoroApp.controller('CareerPageIntroController', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", function ($scope, $element, FallbackManagerFactory, $rootScope) {
    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
        init: function () {

            // initial variables
            var viewPortHeight = viewportSize.getHeight();
            var $elm = $($element);
            var $contentWrap = $elm.find('.content-wrap');
            var $btnPosition = $elm.find('.btn.position');
            var $video = $elm.find('video');
            
            //
            var mySkrollr = skrollr.init();

            //
            $btnPosition.on('click', function () {

                //console.log('clicked');

                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 500);
                        return false;
                    }
                }
            });

            //
            //var backgroundPositionY = 0;
            //var total = 1800;
            //var elmDistance = 300;
            //var moveSpeed = total / elmDistance;
            //var lastScrollTop = 0;
            //$(window).on('scroll', function () {
            //    var currentScrollingPosition = $(window).scrollTop();
            //    console.clear();
            //    console.log('currentScrollingPosition', currentScrollingPosition);
            //    if (currentScrollingPosition > lastScrollTop) { // Scroll DOWN
            //        console.log('Scroll Down');
            //        if (backgroundPositionY < elmDistance) {
            //            backgroundPositionY = backgroundPositionY + moveSpeed;
            //        }
            //    } else {
            //        console.log('Scroll Up');
            //        if (backgroundPositionY > 0) {
            //            backgroundPositionY = backgroundPositionY - moveSpeed;
            //        }
            //    }
            //    if (currentScrollingPosition > total) {
            //        backgroundPositionY = elmDistance;
            //    }
            //    if (currentScrollingPosition == 0) {
            //        backgroundPositionY = 0;
            //    }
            //    $('.imagewall').css('backgroundPositionY', '-' + backgroundPositionY + 'px');
            //    console.log('backgroundPositionY', '-' + backgroundPositionY + 'px');
            //    lastScrollTop = currentScrollingPosition;
            //});



            //var controller = new ScrollMagic.Controller();



            // initiate a ScrollMagic Controller
            //var scrollMagicController = new ScrollMagic();

            //// move video or background-image
            //new ScrollScene({ triggerElement: ".career__page-intro", duration: 1000, offset: -100, triggerHook: "onCenter" })
            //                 .addTo(scrollMagicController)
            //                 .setTween(TweenMax.to($('.imagewall'), 1, { backgroundPositionY: "-300px" }));

            // move text content
            //new ScrollScene({ triggerElement: ".career__what-we-do", duration: 500, offset: 0, triggerHook: 'onCenter' })
            //                 .addTo(scrollMagicController)
            //                 .setTween(TweenMax.to($contentWrap, 1, { top: "+=450px" }));



            // initial settings
            //$elm.css('height', viewPortHeight);
            
            //$(window).resize(function () {
            //    $elm.css('height', viewportSize.getHeight());
            //});

            //console.log('--- standard ---');
            //console.log('$element', $element);
            //console.log('gogoro.App.currentState', gogoro.App.currentState);
            //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };

    $scope.fallback = {
        init: function () {

            // initial variables
            var viewPortHeight = viewportSize.getHeight();
            var $elm = $($element);
            var video = $elm.find('#bgvid').get(0);
            var $btnPosition = $elm.find('.btn.position');

            // destroy skrollr on mobile
            skrollr.init().destroy();

            //
            $btnPosition.on('click', function () {

                //console.log('clicked');

                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 500);
                        return false;
                    }
                }
            });

            //$(video).removeAttr('autoplay');

            // initial settings
            //$elm.css('height', viewPortHeight);

            //$(window).resize(function () {
            //    $elm.css('height', viewportSize.getHeight());
            //});

            //console.log('--- fallback ---');
            //console.log('$element', $element);
            //console.log('gogoro.App.currentState', gogoro.App.currentState);
            //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };

    /*
    |--------------------------------------------------------------------------
    | Initialize module
    |--------------------------------------------------------------------------
    |  parame $scope
    |  parame $scope
    |  parame true or false
    */
    $scope.init($scope, $element, true);
}]);
