gogoroApp.controller('SmartscooterHomeController', ["$scope", "$window", "$element", "FallbackManagerFactory", '$location', 'GogoroUrlService', 'preloaderService', function ($scope, $window, $element, FallbackManagerFactory, $location, GogoroUrlService, preloaderService) {
    angular.extend($scope, FallbackManagerFactory);

    //var lang = gogoro.Locale.lang; // en(全球網站), en-tw(台灣英文), zh-tw(台灣中文)

    //$window.scrollTo(0, 0);

    /*
    |--------------------------------------------------------------------------
    | Preload images
    |--------------------------------------------------------------------------
    */
    // I keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;

    // I am the image SRC values to preload and display./
    // --
    // NOTE: "cache" attribute is to prevent images from caching in the
    // browser (for the sake of the demo).
    //$scope.imageLocations = [
    //    ("http://gogoro.imgix.net/bgd-module-faster-10-scooter_0616.jpg?w=1088"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-11-front-blue.jpg?w=1280"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-11-front.jpg?w=1280"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-14.jpg?w=2560"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-16.jpg?w=1140"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-5-1.jpg?w=1910"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-5-2.jpg?w=1910"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-5-3.jpg?w=1910"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-5-4.jpg?w=1910"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-5-5.jpg"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-5-5.jpg?w=1910"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-5-6-2015-03-29.jpg?w=1910"),
    //    ("http://gogoro.imgix.net/bgd-module-faster-8.jpg?w=2560"),
    //    ("http://images.gogoroapp.com/bgd-module-faster-4_0618.jpg?w=1920")
    //];

    $scope.imageLocations = [];

    // Preload the images; then, update display when returned.
    preloaderService.preloadImages($scope.imageLocations).then(
        function handleResolve(imageLocations) {

            // Loading was successful.
            $scope.isLoading = false;
            $scope.isSuccessful = true;

            console.log("");
            console.info("Preload images Successful");
            angular.forEach(imageLocations, function (img) {
                console.info(img);
            });


        },
        function handleReject(imageLocation) {

            // Loading failed on at least one image.
            $scope.isLoading = false;
            $scope.isSuccessful = false;

            console.error("Image Failed", imageLocation);
            console.info("Preload Failure");
        },
        function handleNotify(event) {
            $scope.percentLoaded = event.percent;
            console.info("Percent loaded:", event.percent);
        }
    );


    // initial variables
    $scope.urls = GogoroUrlService.gogoroUrlGenerate();
    $scope.viewPortHeight = viewportSize.getHeight();
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

    $scope.bannerRedirect = function (name) {

        switch (name) {
            case 'faster':
                location.href = $scope.urls.wwwGogoroUrl + 'smartscooter/faster';
                break;
            case 'store':

                if (gogoro.Locale.lang === "zh-tw") {
                    location.href = '//www.gogoro.com/tw/faq?hash=Faq_DownPayment';
                } else {
                    location.href = '//store.gogoro.com/tw/';
                }

                break;
            case 'book':
                if (gogoro.Locale.lang === "zh-tw") {
                    location.href = 'http://events.gogoro.com/book-a-ride';
                } else {
                    location.href = '//events.gogoro.com/en/book-a-ride';
                }
                break;
            case 'stay':
                location.href = '//www.gogoro.com/contact/stay-tuned';
                break;
            case 'store-open':
                location.href = '//www.gogoro.com/tw/faq?hash=Faq_Taoyuan';
                break;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | START　New Index
    |--------------------------------------------------------------------------
    */
    $scope.carouselResize = function () {
        $scope.viewPortHeight = viewportSize.getHeight();
        //console.log("$scope.viewPortHeight", $scope.viewPortHeight);
        $('#smartscooter-home').css('height', $scope.viewPortHeight);
        $('.banner').css('height', $scope.viewPortHeight);
    }

    $('body').css('visibility', 'hidden');

    //
    $(window).load(function () {

        // initial slick
        $('.banner-container').slick({
            infinite: true,
            dots: true,
            fade: true,
            arrows: false,
            autoplay: false,
            autoplaySpeed: 5000,
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

    /*
    |--------------------------------------------------------------------------
    | END　New Index
    |--------------------------------------------------------------------------
    */

    // functions for md, lg
    $scope.standard = {
        init: function () {
            /*
            |--------------------------------------------------------------------------
            | START　New Index
            |--------------------------------------------------------------------------
            */



            $scope.standardAdjuestment = function () {
                $('#footer-sitemap').hide();
                $('#home-footer').show();
            }



            // show or hide
            $scope.standardAdjuestment();

            // resize carousel
            $scope.carouselResize();

            // window resize process
            $($window).resize(function () {
                $scope.standardAdjuestment();
                $scope.carouselResize();
            });

            //console.log("$mainFooter.css('display')");
            //setInterval(function () {
            //    console.log($mainFooter.css('display'));
            //}, 3000);
            /*
            |--------------------------------------------------------------------------
            | END　New Index
            |--------------------------------------------------------------------------
            */
        },
        destroy: function () { }
    };

    // functions for sm, xs
    $scope.fallback = {
        init: function () {
            $scope.fallbackAdjuestment = function () {

                $scope.viewPortHeight = viewportSize.getHeight();
                $('#footer-sitemap').hide();

                if (gogoro.App.getBreakpoint() !== 'xs') {
                    //
                    $('#smartscooter-home').css('height', $scope.viewPortHeight - 120);
                    $('#smartscooter-home .banner').css('height', $scope.viewPortHeight);
                }

                if (gogoro.App.getBreakpoint() === 'md') {
                    //
                    $('#smartscooter-home').css('height', $scope.viewPortHeight);
                    //$('#smartscooter-home .banner').css('height', 'auto');
                }

                if (gogoro.App.getBreakpoint() === 'sm') {
                    //
                    $('#smartscooter-home').css('height', $scope.viewPortHeight - 120);
                    $('#smartscooter-home .banner').css('height', $scope.viewPortHeight - 170);
                }


                if (gogoro.App.getBreakpoint() === 'xs') {

                    $('#footer-sitemap').show();
                    $('#home-footer').hide();

                    //
                    $('#smartscooter-home').css('height', '100%');
                    $('#smartscooter-home .banner').css('height', 'auto');
                }
            }


            // Show differenct footer for desktop and mobile
            $scope.fallbackAdjuestment();

            // Resize
            $($window).resize(function () {
                $scope.fallbackAdjuestment();
            });
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



/*
|--------------------------------------------------------------------------
| Home Page Version 2
|--------------------------------------------------------------------------
*/
gogoroApp.controller('HomePageV2Controller', ["$window", "$scope", "$element", "FallbackManagerFactory", "$location", "GogoroUrlService", "preloaderService", function ($window, $scope, $element, FallbackManagerFactory,$location, GogoroUrlService, preloaderService) {
    angular.extend($scope, FallbackManagerFactory);

    // Initial variables
    var $elm = $element;

    // initial variables
    $scope.urls = GogoroUrlService.gogoroUrlGenerate();
    $scope.viewPortHeight = viewportSize.getHeight();
    $scope.selectedlanguage = {};

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

    $scope.bannerRedirect = function (name) {
        console.log('bannerRedirect',name);
        switch (name) {
            case 'faster':
                location.href = $scope.urls.wwwGogoroUrl + 'smartscooter/faster';
                break;
            case 'store':

                if (gogoro.Locale.lang === "zh-tw") {
                    location.href = '//www.gogoro.com/tw/faq?hash=Faq_DownPayment';
                } else {
                    location.href = '//store.gogoro.com/tw/';
                }

                break;
            case 'book':
                if (gogoro.Locale.lang === "zh-tw") {
                    location.href = 'http://events.gogoro.com/book-a-ride';
                } else {
                    location.href = '//events.gogoro.com/en/book-a-ride';
                }
                break;
            case 'stay':
                location.href = '//www.gogoro.com/contact/stay-tuned';
                break;
            case 'store-open':
                location.href = '//www.gogoro.com/tw/faq?hash=Faq_Taoyuan';
                break;
        }
    }

    //
    $scope.bannerHeight = 0;

    $(window).load(function () {

        // initial slick
        $('.banner-container').slick({
            infinite: true,
            dots: true,
            fade: true,
            arrows: false,
            autoplay: false,
            autoplaySpeed: 5000,
            pauseOnHover: false,
            onInit: function () {
                $('body').css('visibility', 'visible');
                $scope.$apply(function () {
                    $scope.bannerHeight = $('.banner-container').css('height');
                });

                console.log("$scope.bannerHeight", $scope.bannerHeight);
            },
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        dots: true
                    }
                }
            ]
        });
    });

    // functions for md, lg
    $scope.standard = {
        init: function () {

            $scope.carouselResize = function () {
                $scope.viewPortHeight = viewportSize.getHeight();
                console.log("$scope.viewPortHeight", $scope.viewPortHeight);
                $('#home-page-v2').css('height', $scope.viewPortHeight);
                $('.banner').css('height', $scope.viewPortHeight);
            }

            $scope.standardAdjuestment = function () {
                $('#footer-sitemap').hide();
                $('#home-footer').show();
            }

            // show or hide
            $scope.standardAdjuestment();

            // resize carousel
            $scope.carouselResize();

            // window resize process
            $($window).resize(function () {
                $scope.standardAdjuestment();
                $scope.carouselResize();
            });
        },
        destroy: function () { }
    };

    // functions for sm, xs
    $scope.fallback = {
        init: function () {



            $scope.fallbackAdjuestment = function () {

                $scope.viewPortHeight = viewportSize.getHeight();
                $('#footer-sitemap').hide();

                // iPad Pro (1366x1024)
                if (gogoro.App.getBreakpoint() === 'lg') {
                    $('#home-page-v2').css('height', $scope.viewPortHeight);
                    $('.banner').css('height', $scope.viewPortHeight);
                    console.log('iPad Pro (1366x1024)');
                }

                //if (gogoro.App.getBreakpoint() === 'md') {
                //    $('#home-page-v2').css('height', $scope.viewPortHeight);
                //    $('.banner').css('height', $scope.viewPortHeight);
                //    console.log('iPad Pro (1024x1366)');
                //}

                //
                if (gogoro.App.getBreakpoint() !== 'xs') {
                    //
                    $('#smartscooter-home').css('height', $scope.viewPortHeight);
                }

                //
                if (gogoro.App.getBreakpoint() === 'xs') {

                    $('#footer-sitemap').show();
                    $('#home-footer').hide();

                    //
                    $('#smartscooter-home').css('height', '100%');
                }
            }


            // Show differenct footer for desktop and mobile
            $scope.fallbackAdjuestment();

            // Resize
            $($window).resize(function () {
                $scope.fallbackAdjuestment();

            });
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
