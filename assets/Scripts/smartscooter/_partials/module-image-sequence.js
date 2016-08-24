/* global $:false, ScrollMagic:false, ScrollScene:false, TweenMax:false, Linear:false */

/* sample html

<div class="module-faster-5-powertrain" ng-controller="moduleFaster5PowertrainController">
    <div class="image">
        <img class="frame" src="/video/powertrain/pt_motor_rd02-540p001.jpg">
        <div class="trigger-wrapper"><div class="trigger"></div></div>
    </div>
</div>

*/

angular.module('gogoro.partial.moduleImageSequence', [])
.controller('moduleImageSequenceController', ["$scope", "$element", "frameCount", "framePrefix", function($scope, $element, frameCount, framePrefix) {
    var $el = $($element);
    var $imageEl = $el.find('img.frame');
    
    var images = [];
    var frameCountStringLength = String(frameCount).length;
    
    for (var i=2; i<=frameCount; i++) {
        var s = '00' + String(i);
        s = s.substr(s.length - frameCountStringLength, frameCountStringLength);
        
        images.push(framePrefix + s + '.jpg');
    }
    
    $.preloadimages(images);

    var obj = {currImg: 0};
    var tween = TweenMax.to(obj, images.length / 15,
        {
            currImg: images.length - 1,
            
            roundProps: 'currImg',
            repeat: 0,					
            immediateRender: true,
            ease: Linear.easeNone,
            onUpdate: function() {
                $imageEl.attr('src', images[obj.currImg]);
            },
            onComplete: function() {
                controller.removeScene(scene);  
            }
        }
    );
    
    var controller = new ScrollMagic();
    var scene = new ScrollScene({triggerElement: $el.find('.trigger'), duration: 0})
                    .setTween(tween)
                    .addTo(controller);
}]);
