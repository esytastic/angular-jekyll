/* global $:false */

angular.module('gogoro.partial.moduleVideo', [])
.controller('ModuleVideoController', ["$scope", "$element", "$window", function($scope, $element, $window) {
    $scope.playVideo = function() {
        $videoEl[0].play();
    };

    var resizeToCover = function() {
        var containerW = $wrapperEl.width();
        var containerH = $wrapperEl.height();

        $viewportEl.width(containerW);
        $viewportEl.height(containerH);

        // use largest scale factor of horizontal/vertical
        var scaleH = containerW / vidWOrig;
        var scaleV = containerH / vidHOrig;
        var scale = scaleH > scaleV ? scaleH : scaleV;

        // now scale the video
        $videoEl.width(scale * vidWOrig);
        $videoEl.height(scale * vidHOrig);

        // center the video
        $videoEl.css({
          marginLeft: -(scale * vidWOrig)/2
        });
    };

    var $wrapperEl = $($element);
    var $viewportEl = $wrapperEl.children('.video-viewport');
    var $videoEl = $viewportEl.children('video');

    var vidWOrig = $videoEl.attr('width');
    var vidHOrig = $videoEl.attr('height');



    $($window).resize(resizeToCover);
    resizeToCover();
}]).controller('ModuleVideoFixedHeightController', ["$scope", "$element", "$window", function($scope, $element, $window) {
    $scope.playVideo = function() {
        $videoEl[0].play();
    };

    var resizeToCoverFixedHeight = function() {

        var containerW = vidWOrig;
        var containerH = $wrapperEl.height();

        $viewportEl.width(containerW);
        $viewportEl.height(containerH);

        var scale = containerH / vidHOrig;

        // now scale the video
        $videoEl.width(scale * vidWOrig);
        $videoEl.height(scale * vidHOrig);
    };

    var $wrapperEl = $($element);
    var $viewportEl = $wrapperEl.children('.video-viewport');
    var $videoEl = $viewportEl.children('video');

    var vidWOrig = $videoEl.attr('width');
    var vidHOrig = $videoEl.attr('height');

    $($window).resize(resizeToCoverFixedHeight);
    resizeToCoverFixedHeight();
}]);


