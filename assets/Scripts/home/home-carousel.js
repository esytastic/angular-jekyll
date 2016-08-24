///*
//|--------------------------------------------------------------------------
//| 
//|--------------------------------------------------------------------------
//*/
//gogoroApp.directive('homeCarousel', ['$window', 'GogoroUrlService', 'FallbackManagerFactory', '$location', function ($window, GogoroUrlService, FallbackManagerFactory, $location) {

//    var urls = GogoroUrlService.gogoroUrlGenerate();

//    //console.log('urls', urls);
//    //console.log('gogoro.Locale.lang', gogoro.Locale.lang);

//    //
//    var directory_prefix = '';
//    if (urls.subdomain === 'www') {
//    } else {
//        directory_prefix = '/Resources';
//    }

//    var templateFilename = '';
//    switch (gogoro.Locale.lang) {
//        case 'en-tw':
//            templateFilename = 'index-en.html';
//            break;
//        case 'zh-tw':
//            templateFilename = 'index-tw.html';
//            break;
//        default:
//            templateFilename = 'index-en.html';
//    }

//    // full template path 
//    var templateUrl = directory_prefix + '/Scripts/home/template/' + templateFilename;
//    //console.log('templateUrl', templateUrl);

//    $(document).ready(function () {
//        $('body').css('visibility', 'hidden');
//    });
//    //
//    $(window).load(function () {

//        // initial slick 
//        $('.carousel-container').slick({
//            infinite: true,
//            dots: true,
//            fade: true,
//            arrows: false,
//            autoplay: true,
//            autoplaySpeed: 5000,
//            pauseOnHover: false,
//            onInit: function () {
                
//                console.log();
//                console.log('Fires after first initialization.');
//                $('body').css('visibility', 'visible');
//            },
//            responsive: [
//                {
//                    breakpoint: 767,
//                    settings: {
//                        dots: true
//                    }
//                }
//                // You can unslick at a given breakpoint now by adding:
//                // settings: "unslick"
//                // instead of a settings object
//            ]
//        });


//    });

//    return {
//        restrict: 'E',
//        scope: {},
//        replace: true, // Replace with the template below
//        templateUrl: templateUrl,
//        controller: function ($scope) {

//        },
//        link: function (scope, element, attrs) {
//            angular.extend(scope, FallbackManagerFactory);

//            // initial variables
//            scope.urls = GogoroUrlService.gogoroUrlGenerate();
//            scope.viewPortHeight = viewportSize.getHeight();
//            scope.selectedlanguage = {};

//            //console.log('scope.viewPortHeight', scope.viewPortHeight);

//            //
//            scope.languages = [
//                { name: '台灣 (繁中)', href: 'http://' + $location.host() + '/tw' },
//                { name: 'Global', href: 'http://' + $location.host() + '/' },
//                { name: 'Taiwan (EN)', href: 'http://' + $location.host() + '/tw/en' }
//            ];



//            // on select option change and redirect
//            scope.languageRedirect = function () {
//                //console.log('scope.selectedlanguage.href', scope.selectedlanguage.href);
//                location.href = scope.selectedlanguage.href;
//            }

//            scope.bannerRedirect = function (name) {

//                switch (name) {
//                    case 'faster':
//                        location.href = scope.urls.wwwGogoroUrl + 'smartscooter/faster';
//                        break;
//                    case 'store':
//                        location.href = '//store.gogoro.com/tw/';
//                        break;
//                    case 'book':
//                        location.href = '//events.gogoro.com/book-a-ride';
//                        break;
//                }
//            }


//            scope.carouselResize = function () {
//                scope.viewPortHeight = viewportSize.getHeight();
//                $('#smartscooter-home').css('height', scope.viewPortHeight);
//                $('.carousel').css('height', scope.viewPortHeight);
//            }

//            scope.standard = {
//                init: function () {

//                    scope.standardAdjuestment = function () {
//                        $('#footer-sitemap').hide();

//                        setTimeout(function () {
//                            $('#main-footer').hide();
//                        }, 100);

//                        $('#home-footer').show();
//                    }

//                    // show or hide 
//                    scope.standardAdjuestment();

//                    // resize carousel
//                    scope.carouselResize();

//                    // window resize process
//                    $($window).resize(function () {
//                        scope.standardAdjuestment();
//                        scope.carouselResize();
//                    });

//                    //console.log('--- standard ---');
//                    //console.log('$element', element);
//                    //console.log('gogoro.App.currentState', gogoro.App.currentState);
//                    //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
//                },
//                destroy: function () { }
//            };

//            scope.fallback = {
//                init: function () {

//                    scope.fallbackAdjuestment = function () {

//                        scope.viewPortHeight = viewportSize.getHeight();

//                        $('#footer-sitemap').hide();

//                        setTimeout(function () {
//                            $('#main-footer').hide();
//                        }, 100);

//                        if (gogoro.App.getBreakpoint() !== 'xs') {
//                            //
//                            $('#smartscooter-home').css('height', scope.viewPortHeight - 90);
//                        }

//                        if (gogoro.App.getBreakpoint() === 'xs') {

//                            $('#footer-sitemap').show();

//                            setTimeout(function () {
//                                $('#main-footer').show();
//                            }, 200);

//                            $('#home-footer').hide();

//                            //
//                            $('#smartscooter-home').css('height', '100%');
//                            //$('#smartscooter-home').css('height', scope.viewPortHeight - 90);
//                        }
//                    }


//                    // Show differenct footer for desktop and mobile 
//                    scope.fallbackAdjuestment();

//                    // Resize 
//                    $($window).resize(function () {
//                        scope.fallbackAdjuestment();
//                    });

//                    //console.log('--- fallback ---');
//                    //console.log('$element', element);
//                    //console.log('gogoro.App.currentState', gogoro.App.currentState);
//                    //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
//                },
//                destroy: function () { }
//            };

//            /*
//            |--------------------------------------------------------------------------
//            | Initialize module
//            |--------------------------------------------------------------------------
//            |  parame scope
//            |  parame $element
//            |  parame true or false
//            */
//            scope.init(scope, element, false);


//            setTimeout(function () {
//                _jf.flush(); //內容變動後，呼叫此函數刷新字型
//            }, 500)
//        },
//    };
//}]);