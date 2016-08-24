/* global $:false */


gogoroApp.controller('moduleEasier7ServiceHeroController', ["$scope", "$element", "$controller", "FallbackManagerFactory", function ($scope, $element, $controller, FallbackManagerFactory) {
	angular.extend($scope, FallbackManagerFactory);

	$scope.standard = {
      init: function() {
      	  var duration = 0.3;
          var tween = TweenMax.staggerFromTo($($element).find('h3'), duration,
              {
                  opacity: 0,
                  'margin-left': '-10%',
              },
              {
                  opacity: 1,
                  'margin-left': 0,
              
                  repeat: 0,          
                  immediateRender: true,
                  ease: Linear.easeNone
             }, duration
          );
       
          
          this.controller = new ScrollMagic();
          var scene = new ScrollScene({triggerElement: $element, duration:400})
                          .setTween(tween)
                          .addTo(this.controller);
      },
      destroy: function() {
        
      }
    };

    $scope.fallback = {
      init: function() {
        
      },
      destroy: function() {
        
      }
    };
    // Initialize module
    $scope.init($scope, $element);
}]);
