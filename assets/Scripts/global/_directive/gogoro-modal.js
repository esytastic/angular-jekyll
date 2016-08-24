/*
|--------------------------------------------------------------------------
| Gogoro Modal
|--------------------------------------------------------------------------
  Usage: 
  Html
    <gogoro-modal show='modalshownFeature' width='100%' height='100%'>
        any html here
    </gogoro-modal>
  Javascript:
    // set true or false to open or close gogoro modal 
    $scope.modalshownFeature = false;

    // the function to open the gogoro modal
    // you can name this function any name you like 
    // And attach this function to the DOM with click event 
    $scope.toggleModalFeature = function () {
        $scope.modalshownFeature = !$scope.modalshownFeature;
    };
*/
gogoroApp.directive('gogoroModal', ["$timeout", function ($timeout) {

    var _scrollPosition = 0;

    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        //template: "<div class='gogoro-modal' ng-show='show'><div class='gogoro-modal-overlay' ng-click='hideModal()'></div><div class='gogoro-modal-dialog' ng-style='dialogStyle'><div class='gogoro-modal-close' ng-click='hideModal()'><span class='icon-close'></span></div><div class='gogoro-dialog-content' ng-transclude></div></div></div>", 
        templateUrl:'/Resources/Scripts/global/_directive/template/gogoro-modal.html',
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};

            //
            if (attrs.width) {
                scope.dialogStyle.width = attrs.width;
            }
                
            if (attrs.height) {
                scope.dialogStyle.height = attrs.height;
            }
            
            //
            scope.$watch(
                function () { return scope.show },
                function (newValue, oldValue) {

                    if (newValue !== oldValue) {


                            if (newValue) {
                                element.velocity({ opacity: 1 }, 500);
                                
                                //
                                if (isMobile.phone || isMobile.tablet) {
                                    _scrollPosition = $('body').scrollTop();

                                    $('#site-container').addClass('overflow');

                                    //console.log('_scrollPosition', _scrollPosition);
                                    //scope.$emit('getScrollPosition', { scrollPosition: _scrollPosition });

                                } else {
                                    _scrollPosition = $('body').scrollTop();
                                    $('body').width($('body').width());
                                    $('body').addClass('overflow');
                                }

                                // main-header
                                $('#main-header').css('visibility', 'hidden');
                            }

                            if (!newValue) {

                                if (isMobile.phone || isMobile.tablet) {
                                    $('#site-container').removeClass('overflow');
                                    $('#site-container').removeAttr('style');

                                    //console.log('!newValue _scrollPosition', _scrollPosition);

                                    $('body').scrollTop(_scrollPosition);
                                } else {
                                    $('body').removeClass('overflow');
                                    $('body').removeAttr('style');
                                    $('body').scrollTop(_scrollPosition);
                                }
                            }




                    } else {
                        // gogoro-dialog-content
                        var viewPortWidth = viewportSize.getWidth();
                        var $dialogContent = element.find('.gogoro-dialog-content');
                        var dialogContentWidth = parseInt($dialogContent.width());
                        var remainding = viewPortWidth - dialogContentWidth;

                        //element.find('.gogoro-modal-close');
                        //console.log('viewPortWidth', viewPortWidth);
                        //console.log('dialogContentWidth', dialogContentWidth);
                        //console.log('remainding', remainding);

                        if (remainding < 100) {
                            //console.log('class inside added');
                            element.find('.gogoro-modal-close').addClass('inside');
                        }
                        //console.log('');

                    }

                }
            );

            //
            scope.hideModal = function () {
               
                element.velocity({ opacity: 0 }, {
                    duration: 300, complete: function () {

                        $timeout(function () {

                            if (isMobile.phone || isMobile.tablet) {
                                $('#site-container').removeClass('overflow');
                                $('#site-container').removeAttr('style');
                                $('#site-container').scrollTop(_scrollPosition);
                            } else {
                                $('body').removeClass('overflow');
                                $('body').removeAttr('style');
                                $('body').scrollTop(_scrollPosition);
                            }

                            // main-header
                            $('#main-header').css('visibility', 'visible');

                        }, 50);

                        //
                        scope.show = false;
                    }
                });
            };
        },
    };
}]);