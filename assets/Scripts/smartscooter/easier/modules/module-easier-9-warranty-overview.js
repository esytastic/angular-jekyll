/* global $:false, TweenMax:false, Linear:false, ScrollMagic:false, ScrollScene:false */


gogoroApp.controller('moduleEasier9WarrantyController', ["$scope", "$element", function ($scope, $element) {
    var duration = 0.3;
    
    var tween = TweenMax.staggerFromTo($($element).find('.years-number .year'), duration,
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
    
    var controller = new ScrollMagic();
    var scene = new ScrollScene({triggerElement: $element, duration: 0})
                    .setTween(tween)
                    .addTo(controller);
}]);