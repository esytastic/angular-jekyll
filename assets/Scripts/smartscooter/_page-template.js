gogoroApp.controller('{name}Controller', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", function ($scope, $element, FallbackManagerFactory, $rootScope) {
    angular.extend($scope, FallbackManagerFactory);
    // function for lg, md, sm, xs

    // functions for md, lg
    $scope.standard = {
        init: function () {

            // Initial variables
            var $elm = $element;
            console.log('--- standard ---');
            console.log('$element', $element);
            console.log('gogoro.App.currentState', gogoro.App.currentState);
            console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };

    // functions for sm, xs  
    $scope.fallback = {
        init: function () {
            console.log('--- fallback ---');
            console.log('$element', $element);
            console.log('gogoro.App.currentState', gogoro.App.currentState);
            console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };

    /*
    |--------------------------------------------------------------------------
    | Initialize module
    |--------------------------------------------------------------------------
    |  parame $scope
    |  parame $element
    |  parame true or false
    */
    $scope.init($scope, $element, true);
}]);
