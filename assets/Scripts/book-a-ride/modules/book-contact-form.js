gogoroApp.controller('BookContractFormController', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", "BookRideService", "$http", function ($scope, $element, FallbackManagerFactory, $rootScope, BookRideService, $http) {
    angular.extend($scope, FallbackManagerFactory);
    var self = this;
    var debug = true;

    // initial variables
    var viewPortHeight = viewportSize.getHeight();
    var $elm = $element;
    var $contactWrapper = $elm;
    var $btnContactBack = $elm.find('.btn-contact-back');
    var $mapWapper = $('#map');
    var $calendarWrapper = $('#calendar');

    //
    var $gogoroMsgbox = $('.gogoro-msgbox');
    var $btnMsgboxClose = $('#btn-msgbox-close');
    var $ajaxErrorMessage = $('.ajax-error-message');
    var savedDate = [];

    //
    var Booking = BookRideService;

    $scope.submitted = false;// this value is used to show form errors with submit

    $scope.user = {};
    $scope.ajaxErrorMessage = false;

    $scope.privacy = {"checked":false};

    // fake data for testing
    //$scope.user.firstname = faker.name.findName();
    //$scope.user.lastname = faker.name.lastName();
    //$scope.user.firstname = 'mark'
    //$scope.user.lastname = 'lee'
    //$scope.user.mobile = '0912123123';
    //$scope.user.email = 'open0102@gmail.com';
    //$elm.find('#privacy').prop('checked',true);
    //console.log("$scope.formData start");
    // function to submit the form after all validation has occurred  
    $scope.submitForm = function (isValid) {

        // a user press submit button
        $scope.submitted = true;

        // check to make sure the form is completely valid
        if (isValid) {
            //
            $scope.formData = {};

            // get data from service.
            savedDate = Booking.getSavedDataFromService();

            // prepare data for ajax 
            $scope.formData.names = $scope.user.name;
            $scope.formData.email = $scope.user.email;
            $scope.formData.phone = $scope.user.mobile;
            $scope.formData.id = savedDate.source_id;
            $scope.formData.date = savedDate.date;
            $scope.formData.type = savedDate.type;
            $scope.formData.time = savedDate.time;

            //console.log("$scope.formData", $scope.formData);
            // save data
            gogoro.Loader.fullscreenStart();
            Booking.save($scope.formData).then(function (result) {

                if (result.result) {
                    // reset form
                    $scope.user = {};
                    $scope.submitted = false;
                    $scope.frm.$setPristine();
                    //
                    $gogoroMsgbox.find('.dataSaved-date').text(savedDate.date);
                    $gogoroMsgbox.find('.dataSaved-time').text(savedDate.time);
                    $gogoroMsgbox.find('.dataSaved-name').text(savedDate.name);
                    //
                    $gogoroMsgbox.addClass('active');
                } else {
                    //console.log('------ failed ------');
                    //console.log('result', result);
                    $scope.ajaxErrorMessage = true;
                    $ajaxErrorMessage.text(result.message);
                }

                gogoro.Loader.fullscreenStop();
            });
        }
    }


    $scope.contactBack = function () {

        //e.preventDefault();
        $mapWapper.show();
        $calendarWrapper.show();
        $contactWrapper.hide();

        //
        $scope.user = {};
        $scope.submitted = false;
        $scope.frm.$setPristine();
        $scope.ajaxErrorMessage = false;
    }

}]);