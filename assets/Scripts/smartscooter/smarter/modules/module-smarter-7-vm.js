/* global $:false */


gogoroApp.controller('moduleSmarter7VMController', ["$scope", "$element", "$window", "$controller", function ($scope, $element, $window, $controller) {
    var $wrapperElement = $($element).find('.video-wrapper')[0];

    $.extend(this, $controller('ModuleVideoController', {
      $scope: $scope,
      $element: $wrapperElement,
      $window: $window
    }));


    if ( $('body').hasClass('state-standard') ) {
      imgix.fluid({
        fluidClass: 'smarter-7-standard'
      });
    }
  }]);
