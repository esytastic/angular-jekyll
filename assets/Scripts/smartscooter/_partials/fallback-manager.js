/* global $:false, document:false, gogoro:false */
angular.module('gogoro.partial.fallbackManager', [])
.factory('FallbackManagerFactory', ["$window", function($window) {
    return {
        init: function ($scope, $element, useFallbackForIE10, useBreakPointMdForStardandMode) {
            var that = this;

            //
            if (angular.isUndefined(useBreakPointMdForStardandMode)) {
                that.useBreakPointMdForStardandMode = false;
            } else {
                that.useBreakPointMdForStardandMode = useBreakPointMdForStardandMode;
            }
                
            // Check if we are going to use fallback for IE10 on standard mode.
            if (useFallbackForIE10 === undefined) useFallbackForIE10 = false;

            // Set state
            that.setState($scope, $element, useFallbackForIE10);

            // Detect state change on window resize
            $($window).on('resize', function () {
                //console.log('------ FallbackManager:window->resize() ------');
                //console.log('gogoro.App.currentState', gogoro.App.currentState);
                //console.log('$scope.currentState', $scope.currentState);

                // Detect state change
                if (gogoro.App.currentState !== $scope.currentState) {
                    that.setState($scope, $element, useFallbackForIE10);

                } else if (that.useStandardOnFallbackForMd(useFallbackForIE10) === true)
                {
                    that.setState($scope, $element, useFallbackForIE10);
                }

            });

        },

        isIE10OrLess: function() {
            return (document.body.style.msTouchAction !== undefined) || ($('html.lt-ie10').length > 0);
        },

        isFF: function() {
            return (typeof InstallTrigger !== 'undefined');
        },
        useStandardOnFallbackForMd: function (useFallbackForIE10) {
            var that = this;

            if (useFallbackForIE10 === undefined) useFallbackForIE10 = false;

            if (gogoro.App.currentState === 'fallback' &&
                (gogoro.App.getBreakpoint() === 'md' || gogoro.App.getBreakpoint() === 'sm') &&
                that.useBreakPointMdForStardandMode === true &&
                !(useFallbackForIE10 && that.isIE10OrLess())) {
                return true;
            } else {
                return false;
            }
        },
        setState: function($scope, $element, useFallbackForIE10) {
            var that = this;
            if (useFallbackForIE10 === undefined) useFallbackForIE10 = false;


            //console.log("that.useBreakPointMdForStardandMode", that.useBreakPointMdForStardandMode);
            //console.log("useFallbackForIE10", useFallbackForIE10);
            //console.log("that.isIE10OrLess()", that.isIE10OrLess());

            //console.log('fallback-manager.js > setState > gogoro.App.currentState', gogoro.App.currentState);

            if (gogoro.App.currentState === 'standard' && !(useFallbackForIE10 && that.isIE10OrLess()) ) {

                $($element).removeClass('fallback').addClass('standard');

                that.fallback.destroy();
                //console.log('>> fallback destroy');

                that.standard.init();
                //console.log('>> standard init');
            }
            else if (that.useStandardOnFallbackForMd(useFallbackForIE10) === true)
            {
                $($element).removeClass('fallback').addClass('standard');

                that.fallback.destroy();
                //console.log('>> fallback destroy');

                that.standard.init();
                //console.log('>> standard init');
            }
            else
            {
                $($element).addClass('fallback').removeClass('standard');

                that.standard.destroy();
                //console.log('>> standard destroy');

                that.fallback.init();
                //console.log('>> fallback init');
            }

            $scope.currentState = gogoro.App.currentState;
        }
    };
}]);
