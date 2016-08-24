/*

*/
gogoroApp.controller('CareerLighterAndBrightController', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", function ($scope, $element, FallbackManagerFactory, $rootScope) {
    angular.extend($scope, FallbackManagerFactory);

    // initial variables
    var viewPortWidth = 0;
    var $elm = $($element);
    var $dots = $elm.find('ul.slick-dots > li');
    var $sliderContainer = $elm.find('div.slider-container');
    var $sliders = $sliderContainer.find('li');
    var sliderNum = $sliders.length;

    function sliderInit() {

        viewPortWidth = viewportSize.getWidth();
        $sliderContainer.css('width', viewPortWidth * sliderNum + 'px');
        $sliders.css('width', viewPortWidth + 'px');

        $sliders.each(function () {
            $(this).on('click', function () {
                //
                var index = $sliders.index($(this)) + 1;

                index = (index > 4) ? 0 : index;

                //
                $dots.removeClass('slick-active');
                $dots.eq(index).addClass('slick-active');

                var position = index * viewPortWidth;

                $sliderContainer.stop().velocity({ marginLeft: -position + 'px' });

            });
        });

        // click dot event
        $dots.each(function () {
            $(this).on('click', function () {
                //
                var index = $dots.index($(this));
                //
                $dots.removeClass('slick-active');
                $(this).addClass('slick-active');

                var position = index * viewPortWidth;

                $sliderContainer.stop().velocity({ marginLeft: -position + 'px' });

            });
        });

    }

    sliderInit();

    $(window).resize(function () {
        $sliderContainer.stop().velocity({ marginLeft: '0px' });
        $dots.removeClass('slick-active');
        $dots.eq(0).addClass('slick-active');

        sliderInit();
    });

    $scope.standard = {
        init: function () {



            //console.log('--- standard ---');
            //console.log('gogoro.App.currentState', gogoro.App.currentState);
            //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };

    $scope.fallback = {
        init: function () {





            //$sliders.swipe({
            //    swipe: function (event, direction, distance, duration, fingerCount) {
            //        console.log("You swiped " + direction);
            //    }
            //});
        },
        destroy: function () { }
    };

    /*
    |--------------------------------------------------------------------------
    | Initialize module
    |--------------------------------------------------------------------------
    |  parame $scope
    |  parame $scope
    |  parame true or false (useFallbackForIE10)
    |  parame true (user breakPoint md as Standard Mode)
    */
    $scope.init($scope, $element, false, true);
}]);
