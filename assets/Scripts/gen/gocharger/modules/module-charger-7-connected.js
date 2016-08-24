/* global $:false, gogoro:false */

gogoroApp.controller('moduleCharger7ConnectedController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {
	angular.extend($scope, FallbackManagerFactory);

	$scope.standard = {
		init: function() {
			var duration = 3;
			var tween = TweenMax.staggerFromTo($($element).find('.base-full'), duration, {
				'opacity': '0',
			}, {
				'opacity': '1',
				repeat: 0,
				immediateRender: true,
				ease: Linear.easeNone
			}, duration);
			this.controller = new ScrollMagic();
			var scene = new ScrollScene({
					triggerElement: $element,
					offset: 200,
					duration: 500
				})
				.setTween(tween)
				.addTo(this.controller);

		},
		destroy: function() {

		}
	};

	$scope.fallback = {
		init: function() {},
		destroy: function() {}
	};

	$scope.init($scope, $element);
}]);
