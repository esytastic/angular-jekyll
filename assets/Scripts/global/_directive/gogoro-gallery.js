gogoroApp.directive('gogoroGallery', function () {
    return {
        restrict: 'E',
        scope: {
            pictures: '=',
            picturesName: '@',
            pictureIndex:'=',
            pictureMode:'@'
        },
        templateUrl: '/Resources/Scripts/global/_directive/template/gogoro-gallery.html',
        replace: true, // Replace with the template below
        controller: ["$scope", "$element", "$window", function ($scope, $element, $window) {
            
            //console.log('$scope.pictureMode', $scope.pictureMode);
            //console.log('$element.data', $element.data(''));

            // init variable 
            var $pictureTop = $element.find('.picture.picture--top');
            
            // get a picture by id 
            $scope.getPictureByIndex = function (index) {
                return $scope.pictures[index][$scope.picturesName];
            }

            $scope.$watch(
                function () { return $scope.pictureIndex },
                function (newValue, oldValue) {
                    if (angular.isDefined(newValue)) {

                        if (angular.isUndefined($scope.pictureMode)) {
                            switch ($scope.pictureIndex) {
                                case 0:
                                    $scope.selectedIndex = 0;
                                    break;
                                case 1:
                                    $scope.selectedIndex = 1;
                                    break;
                                case 2:
                                    $scope.selectedIndex = 1;
                                    break;
                                case 3:
                                    $scope.selectedIndex = 2;
                                    break;
                                case 4:
                                    $scope.selectedIndex = 3;
                                    break;
                                case 5:
                                    $scope.selectedIndex = 3;
                                    break;
                            }
                        } else {
                            switch ($scope.pictureIndex) {
                                case 0:
                                    $scope.selectedIndex = 0;
                                    break;
                                case 1:
                                    $scope.selectedIndex = 1;
                                    break;
                                case 2:
                                    $scope.selectedIndex = 2;
                                    break;
                                case 3:
                                    $scope.selectedIndex = 3;
                                    break;
                                case 4:
                                    $scope.selectedIndex = 4;
                                    break;
                                case 5:
                                    $scope.selectedIndex = 5;
                                    break;
                            }
                        }



                        $scope.currentDisplayImage = $scope.getPictureByIndex($scope.selectedIndex);
                        $scope.nexDisplayImage = $scope.getPictureByIndex($scope.selectedIndex);
                    }
                }
            );

            // update big image
            $scope.updatePicture = function (newImage) {
                $scope.$apply(function () {

                    // assign new image to current
                    $scope.currentDisplayImage = newImage;

                    //
                    $pictureTop.stop().velocity({ opacity: 1 }, 400, function () {
                        $scope.nexDisplayImage = newImage;
                    });
                });
            }

            // remove pictures which has not value
            function removeEmptyPictures() {

                angular.forEach($scope.pictures, function (picture) {
                    console.log(picture[$scope.picturesName]);
                    if (picture[$scope.picturesName] != '') {

                        
                    }
                });
            }
            

            // detect window resize
            $($window).resize(function () {
                //console.log('gogoroGallery window resized');
            });
        }],
        link: function (scope, element, attrs) {
            var $pictureTop = element.find('.picture.picture--top');

            // on thumbnail click event 
            scope.showPicture = function (selectedIndex) {

                //
                scope.selectedIndex = selectedIndex;// update current index value

                // get selected image
                var newImage = scope.getPictureByIndex(selectedIndex);
                //console.log('showPicture > newImage', newImage);

                // fade out current display big image
                // and show next big image
                $pictureTop.stop().velocity({ opacity: 0 }, 300, function () {
                    scope.updatePicture(newImage);
                });
     
            }
        },
    };
});