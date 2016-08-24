/* global $:false, gogoro:false */

gogoroApp.controller('moduleCharger4AnywhereController', ["$scope", "$element", "$interval", "FallbackManagerFactory", "$rootScope", function ($scope, $element, $interval, FallbackManagerFactory, $rootScope) {
	angular.extend($scope, FallbackManagerFactory);
	var $el = $($element);

	$scope.standard = {
	    init: function() {
	    	var duration = 0.3;
	    	var playVideo = function() {};
	    	var tween = TweenMax.staggerFromTo($($element).find('#charger-icon'), duration, {
	    		'margin-top': '0',
	    	}, {
	    		'margin-top': '-97px',

	    		repeat: 0,
	    		immediateRender: true,
	    		ease: Linear.easeNone
	    	}, duration);


	    	this.controller = new ScrollMagic();
	    	var scene = new ScrollScene({
	    			triggerElement: $element,
	    			duration: 100
	    		})
	    		.setTween(tween)
	    		.addTo(this.controller);

	    },
	    destroy: function() {
	      
	    }
	  };

	  $scope.fallback = {
	    init: function() {
	    	$($element).find('#charger-icon').css('margin-top', '-97px');
	    },
	    destroy: function() {
	    }
	  };

	 // Initialize module
	 $scope.init($scope, $element, true);
}]);
