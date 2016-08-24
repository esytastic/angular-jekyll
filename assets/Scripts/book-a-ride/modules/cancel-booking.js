gogoroApp.controller('CancelBookingController', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", "BookRideService", "$http", function ($scope, $element, FallbackManagerFactory, $rootScope, BookRideService, $http) {
    angular.extend($scope, FallbackManagerFactory);
    var self = this;
    var debug = true;


    // initial variables
    var viewPortHeight = viewportSize.getHeight();
    var $elm = $element;

    // dashboard 
    var $dashboardContainer = $elm.find('.dashboard');
    var $identifier = $elm.find('.identifier');
    var $dashboardWrap = $elm.find('.dashboard-wrap');
    var $titleContainer = $elm.find('.title-container');
    var $infoContainer = $elm.find('.info-container');
    var $stepsContainer = $elm.find('.steps-container');

    if (gogoro.Locale.lang === 'zh-tw') {
        $titleContainer.find('h2').text('取消你的預約');
    } else {
        $titleContainer.find('h2').text('Cancel your appointment');
    }

    var $ajaxErrorMessage = $elm.find('.ajax-error-message');
    var $cancelFormWrap = $elm.find('.cancel-form-wrap');
    var $cancelMessageWrap = $elm.find('.cancel-message-wrap');

    // service
    var Booking = BookRideService;

    $scope.submitted = false;// this value is used to show form errors with submit
    $scope.user = {};

    // function to submit the form after all validation has occurred  
    $scope.submitForm = function (isValid) {

        // a user press submit button
        $scope.submitted = true;

        // check to make sure the form is completely valid
        if (isValid) {
            //
            $scope.formData = {};

            // get data from service.
            var savedDate = Booking.getSavedDataFromService();

            // prepare data for ajax 
            $scope.formData.email = $scope.user.email;
            $scope.formData.id = $identifier.val();

            // save data
            Booking.cancel($scope.formData).then(function (result) {

                // reset form
                //console.log('$scope.frm 2', $scope.frm);
                $scope.user = {};
                $scope.submitted = false;
                $scope.frm.$setPristine();

                if (result.result) {
                    $cancelFormWrap.hide();
                    $cancelMessageWrap.show();
                } else {
                    //console.log('------ failed ------');
                    //console.log('result', result);
                    $ajaxErrorMessage.text(result.message);
                }

            });
        }
    }

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

            // initial variables
            var viewPortHeight = viewportSize.getHeight();
            var $elm = $($element);


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