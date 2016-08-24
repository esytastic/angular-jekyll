/* global $:false, gogoro:false */

gogoroApp.controller('moduleCharger5SmartController', ["$scope", "$element", "$interval", "FallbackManagerFactory", "$rootScope", function ($scope, $element, $interval, FallbackManagerFactory, $rootScope) {
	angular.extend($scope, FallbackManagerFactory);
	var $el = $($element);
	var videoPlayed = false;
	$scope.standard = {
	    init: function() {
	    	var duration = 0.3;
	    	var playVideo = function() {
	    		if (!videoPlayed) {
					$('#module-charger-5-smart-video').get(0).play();
				}
				videoPlayed = true;
	    	};
	    	this.controller = new ScrollMagic();
	    	var scene = new ScrollScene({
	    			triggerElement: $element,
	    			offset: 100,
	    		})
		    	.on("enter leave", function(e) {
		    		playVideo();
		    	})
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
	 $scope.init($scope, $element, true);
}]);
