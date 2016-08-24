/* global $:false, imgix:false, TimelineMax:false */
gogoroApp.controller('moduleCustomizeIntroTakeoverController', ["$scope", "$element", "FallbackManagerFactory", "ModulePageIntroService", function ($scope, $element, FallbackManagerFactory, ModulePageIntroService) {
    angular.extend($scope, FallbackManagerFactory);

    var $el = $($element);
    
    //
    $scope.standard = {
        init: function () {
            //console.log('intro takeover controller ');

            // customize intro takeover
            var $moduleCustomizeIntroOne = $(".module-customize-intro1");
            var $moduleCustomizeIntroTwo = $(".module-customize-intro2");
            var $moduleCustomizeIntroThree = $(".module-faster-0-site-intro");

            $moduleCustomizeIntroOne.on('mousewheel', function (e) {
                if (e.originalEvent.wheelDelta / 120 < 0) {
                    $(".title-wrapper").hide();
                    $moduleCustomizeIntroOne.off('mousewheel').velocity({ 'top': '-100%' }, 1000, function () {
                        $moduleCustomizeIntroOne.remove();
                        $moduleCustomizeIntroTwo.on('mousewheel', function (e) {
                            if (e.originalEvent.wheelDelta / 120 < 0) {

                                $moduleCustomizeIntroTwo.off('mousewheel').velocity({ 'top': '-100%' }, 1000, function () {
                                    $(".title-wrapper").fadeIn();
                                    $moduleCustomizeIntroThree.trigger('click');
                                    $moduleCustomizeIntroTwo.remove();
                                    $("body").removeClass('intro-takeover');
                                    //$(".module-customize-intro1,.module-customize-intro2").remove();
                                });

                            }
                        });
                    });
                }
            });

            if (angular.isUndefined(getUrlParameter('n')) === true || getUrlParameter('n') == '') {
                //console.log("show takeover");
            } else {
                //console.log("hide takeover");
                $(document).ready(function () {
                    //console.log("html,body hide takeover");
                    $moduleCustomizeIntroOne.remove();
                    $moduleCustomizeIntroTwo.remove();
                    $("body").removeClass('intro-takeover');
                });
            }

            //console.log("getUrlParameter('n')", getUrlParameter('n'));
            function getUrlParameter(sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == sParam) {
                        return sParameterName[1];
                    }
                }
            }
        },
        destroy: function () {
            //$moduleCustomizeIntroOne.off('mousewheel');
            //$moduleCustomizeIntroTwo.off('mousewheel');
        }
    };

    $scope.fallback = {
        init: function () {

            $element.hide();
            $("body").removeClass('intro-takeover');

        },
        destroy: function () {
        }
    };

    // Initialize module
    $scope.init($scope, $element, true);
}]);
