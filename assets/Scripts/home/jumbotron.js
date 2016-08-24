gogoroApp.controller('JumbotronController', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", "GogoroUrlService", "$location", "$window", function ($scope, $element, FallbackManagerFactory, $rootScope, GogoroUrlService, $location, $window) {
    angular.extend($scope, FallbackManagerFactory);

    $('body').css('visibility', 'hidden');

    //
    $scope.viewPortHeight = viewportSize.getHeight();
    //console.log('$scope.viewPortHeight', $scope.viewPortHeight);

    $scope.urls = GogoroUrlService.gogoroUrlGenerate();
    $scope.selectedlanguage = {};

    //console.log('scope.viewPortHeight', scope.viewPortHeight);

    //
    $scope.languages = [
        { name: '台灣 (繁中)', href: 'http://' + $location.host() + '/tw' },
        { name: 'Global', href: 'http://' + $location.host() + '/' },
        { name: 'Taiwan (EN)', href: 'http://' + $location.host() + '/tw/en' }
    ];

    // on select option change and redirect
    $scope.languageRedirect = function () {
        //console.log('scope.selectedlanguage.href', scope.selectedlanguage.href);
        location.href = $scope.selectedlanguage.href;
    }

    //
    $scope.bannerRedirect = function (url) {
        location.href = url;
    }

    //
    $(window).load(function () {

        // initial slick
        $('.jumbotron-container').slick({
            infinite: true,
            dots: true,
            fade: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: false,
            onInit: function () {
                $('body').css('visibility', 'visible');
            },
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        dots: true
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    });


    $scope.carouselResize = function () {
        $scope.viewPortHeight = viewportSize.getHeight();
        $('#jumbotron').css('height', $scope.viewPortHeight);
        $('.jumbotron-container').css('height', $scope.viewPortHeight);
        $('.banner').css('height', $scope.viewPortHeight);
    }

    $scope.standardAdjuestment = function () {
        $('#footer-sitemap').hide();
        $('#home-footer').show();
    }

    // functions for md, lg
    $scope.standard = {
        init: function () {

            // show or hide
            $scope.standardAdjuestment();

            // resize carousel
            $scope.carouselResize();

            // window resize process
            $($window).resize(function () {
                $scope.standardAdjuestment();
                $scope.carouselResize();
            });

            // Initial variables
            //var $elm = $element;
            //console.log('--- standard ---');
            //console.log('$element', $element);
            //console.log('gogoro.App.currentState', gogoro.App.currentState);
            //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };

    // functions for sm, xs
    $scope.fallback = {
        init: function () {

            // process for init loading or resizing windows
            $scope.fallbackAdjuestment = function () {
                $scope.viewPortHeight = viewportSize.getHeight();
                $('#footer-sitemap').hide();

                if (gogoro.App.getBreakpoint() === 'lg') {
                    //
                    $('.banner').css('height', $scope.viewPortHeight);
                }

                if (gogoro.App.getBreakpoint() === 'md' && (viewportSize.getHeight() < viewportSize.getWidth())) {
                    //
                    $('.banner').css('height', $scope.viewPortHeight);
                }

                if (gogoro.App.getBreakpoint() === 'xs') {
                    $('#footer-sitemap').show();
                    $('#home-footer').hide();
                }
            }

            // Show differenct footer for desktop and mobile
            $scope.fallbackAdjuestment();

            // Resize
            $($window).resize(function () {
                $scope.fallbackAdjuestment();
            });

            console.log('--- fallback ---');
            //console.log('$element', $element);
            console.log('gogoro.App.currentState', gogoro.App.currentState);
            console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
            console.log('');
        },
        destroy: function () { }
    };

    /*
    |--------------------------------------------------------------------------
    | Initialize module
    |--------------------------------------------------------------------------
    |  parame $scope
    |  parame $element
    |  parame true or false
    */
    $scope.init($scope, $element, false);
}]);
