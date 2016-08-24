/* global $:false, TweenMax:false, Linear:false, ScrollMagic:false, ScrollScene:false */

angular.module('gogoro.partial.moduleSummaryInfo', [])
.controller('ModuleSummaryInfoController', ["$scope", "$element", function($scope, $element) {
    var duration = 0.3;
    
    var tween = TweenMax.staggerFromTo($($element).find('.title'), duration,
        {
            opacity: 0,
            'margin-left': '-10%'
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
    var scene = new ScrollScene({triggerElement: $element, duration: 0})
                    .setTween(tween)
                    .addTo(this.controller);
}]);