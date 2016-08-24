/*

*/
gogoroApp.controller('4cyclesController', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", function ($scope, $element, FallbackManagerFactory, $rootScope) {
    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
        init: function () {

            // initial variables
            var viewPortWidth = viewportSize.getWidth();
            var $elm = $($element);
            var $cycle = $elm.find('.cycle');
            var $boxCycleWrap = $elm.find('.box--cycle-wrap');
            var $boxTextWrap = $elm.find('.box--text-wrap');
            var $boxTextContainer = $elm.find('.box--text-container');
            var cyclePosition = viewPortWidth / 2 - 40;

            // initial settings
            //$cycle.css('right', cyclePosition + 'px');

            // mouseenter and mouseout
            $boxTextContainer.each(function () {
                $(this).on('mouseenter', function () {
                    $(this).stop().velocity({ opacity: 1 }, {duration:500});
                });
                $(this).on('mouseleave', function () {
                    $(this).stop().velocity({ opacity: 0 }, { duration: 500 });
                });
            });

            // cycle click event
            $cycle.on('click', function () {

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

            // window resize
            $(window).resize(function () {
                //cyclePosition = viewportSize.getWidth() / 2 - 40;
                //$cycle.css('right', cyclePosition + 'px');
            });


            //console.log('--- standard ---');
            //console.log('gogoro.App.currentState', gogoro.App.currentState);
            //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };

    $scope.fallback = {
        init: function () {
            var viewPortWidth = viewportSize.getWidth();
            var $elm = $($element);
            var $cycle = $elm.find('.cycle');
            var $boxCycleWrap = $elm.find('.box--cycle-wrap');
            var $boxTextWrap = $elm.find('.box--text-wrap');
            var $boxTextContainer = $elm.find('.box--text-container');

            // mouseenter and mouseout
            $boxTextContainer.each(function () {

                $(this).on('click', function () {
                    //$boxTextContainer.stop().velocity({ opacity: 1 });
                    $(this).stop().velocity({ opacity: 0.9 }, { duration: 500 });

                    if ($(this).css('opacity') != 0) {
                        $(this).stop().velocity({ opacity: 0 }, { duration: 500 });
                    }

                });
            });

            //console.log('--- fallback ---');
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
