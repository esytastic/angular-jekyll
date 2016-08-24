/* global $:false */

angular.module('gogoro.partial.mainHeader', [])
.controller('MainHeaderController', ["$scope", "$element", "FallbackManagerFactory", "$window", "$rootScope",
    function ($scope, $element, FallbackManagerFactory, $window, $rootScope) {
        angular.extend($scope, FallbackManagerFactory);

        $scope.standard = {
            init: function () {
                var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
                //Function to convert hex format to a rgb color
                var rgb2hex = function (rgb) {
                    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    if (rgb != null) {
                        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                    } else {
                        return 'NULL';
                    }

                }
                var hex = function (x) {
                    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
                }

                // Initial variables
                var $SiteContainer = $('#site-container');
                var $elm = $($element);
                var $tabberContainer = $('.tabbar-container');
                var $tabbarWrapper = $tabberContainer.find('.tabbar-wrapper');
                var $tabber = $tabberContainer.find('.tabbar');

                /**
                   to have a collision element place .collision class
                   to the element which you want have collision affect. 
                ***/
                var hasCollisionElement = false;
                var $collisionElement = $SiteContainer.find('.collision');
                var collisionElementLength = $collisionElement.length;
                if ($collisionElement.length > 0) {
                    hasCollisionElement = true;
                }

                // Mouse scrolling event
                var lastScrollTop = 0;
                var continueScrollDown = false;
                var continueScrollUp   = false;

                var continueScrollDownTabbar = false;
                var continueScrollUpTabbar   = false;

                
                $($window).scroll(function (event) {
                    var st = $(this).scrollTop();
                    var hasFixed = $tabbarWrapper.hasClass('fixed');

                    if (st > lastScrollTop) { // Scroll DOWN
                        
                        continueScrollUp = false;

                        if( rgb2hex($elm.css('backgroundColor')) == 'NULL'){
                            $elm.stop().velocity({ backgroundColor: '#FFFFFF' }, { duration: 1000 });
                        }

                        if (hasCollisionElement) {
                            var hit = $elm.collision($collisionElement);
                            // when $elm hit the collision element, the hit.length = 1
                            //if (hit.length > 0) {
                            //    $elm.stop().velocity({ top: '-80px' }, { duration: 400 });
                            //}
                        }

                        // Change header background to #ffffff, if .tabbar-wrapp has .fix class

                        //if (hasFixed) {
                        //    if (continueScrollDown == false) {
                           
                        //        $tabber.stop().velocity({ top: '0px' }, { duration: 400 });
                        //        continueScrollDown = true;
                        //    }
                        //}

                    } else { // Scroll UP 
                        
                        //console.log('--- upscroll code ---');
                        // Hide header
                        continueScrollDown = false;
                        continueScrollDownTabbar = false;

                        //if (continueScrollUp == false) {
                        //    $elm.stop().velocity({ top: '0px' }, { duration: 400 });
                        //    continueScrollUp = true;
                        //}

                        // Change header background to transparent
                        //if (hasFixed == false) {
                        //    $elm.css('backgroundColor', 'transparent');
                        //}

                        // if .tabbar-wrapper has .fix class and the scrolling is up
                        // reposition tabbar down by 80px
                        //if (hasFixed) {
                        //    if (continueScrollUpTabbar == false) {
                        //        $tabber.stop().velocity({ top: '80px' }, { duration: 400 });
                        //        continueScrollUpTabbar = true;
                        //    }
                        //}

                    }
                    lastScrollTop = st;

                });

                // Resize window event
                $($window).on('resize', function () {

                });


                //console.log('--- standard ---');
                //console.log('gogoro.App.currentState:', gogoro.App.currentState);
                //console.log('gogoro.App.getBreakpoint():', gogoro.App.getBreakpoint());
            },
            destroy: function () { }
        };

        $scope.fallback = {
            init: function () {
                //console.log('--- fallback ---');
                //console.log('gogoro.App.currentState', gogoro.App.currentState);
                //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
            },
            destroy: function () { }
        };

        // Initialize module
        $scope.init($scope, $element, true);
    }]);
