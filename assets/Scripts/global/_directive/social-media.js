/*
|--------------------------------------------------------------------------
| 
|--------------------------------------------------------------------------
*/
gogoroApp.directive('socialMedia', function () {
    return {
        restrict: 'A',
        scope: {productId:'@'},
        replace: false, // Replace with the template below
        controller: ["$scope", "$rootScope", "$location", function ($scope, $rootScope, location) {
            $scope.gogoro = $rootScope.gogoro;
        }],
        link: function (scope, element, attrs) {
            var mediaType = attrs['socialMedia'];
            //console.log('socialMedia product id: ', scope.productId);
            //console.log('scope', scope);
            //console.log('mediaType', mediaType);
            //console.log('$location', location);

            switch(mediaType) {
                case 'facebook':
                    var url = "https://www.facebook.com/sharer/sharer.php?u=";
                    break;
                case 'google':
                    var url = "https://plus.google.com/share?url=";
                    break;
                case 'twitter':
                    var url = "https://twitter.com/home?status=";
                    break;
            }

            
            scope.$watch(
                function () { return scope.productId },
                function (newValue, oldValue) {

                    if (newValue !== oldValue) {
                        //console.log('shareUrl updated');
                        updateShareUrl(newValue);
                    }

                }
            );

            updateShareUrl(scope.productId);
            function updateShareUrl(productId) {
                var shareUrl = '';
                shareUrl = url + scope.gogoro.storeGogoroUrl + 'store/product/' + productId;
                // update link's href
                element.prop('href', shareUrl);
            }

        },
    };
});