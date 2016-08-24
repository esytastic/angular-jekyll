/* global $:false, ScrollMagic:false, ScrollScene:false, TweenMax:false, Linear:false */

angular.module('gogoro.partial.moduleVideoSlider', [])
.controller('ModuleVideoSliderController', ["$scope", "$element", "$window", "$timeout", "videoFrameTimes", "shouldCrossFade", "$timeout", function($scope, $element, $window, $timeout, videoFrameTimes, shouldCrossFade, $timeout) {
    /*---------------------------------------------*/    

    // elements

    var $el = $($element);
    var $contentEl = $el.children('.module-video-slider-content');

    var moduleHeightDidChange = function() {
        $contentEl.find('.video-viewport-wrapper').width($el.width());
    };

    

    function checkPosition(){
      
      var _bottom = $(window).scrollTop() + $(window).innerHeight();
      var _top = $(window).scrollTop();
      var sceneBottom = $($element).offset().top + $($element).height();
      if(sceneBottom > _top && sceneBottom < _bottom){
        //visible auto play
        autoPlay();
      }else{
        //drop it
        stopIt();

      }
    }

    function autoPlay(){
      return;
      if($scope.playNext){
        return;
      }

      $scope.playNext = true;
      $timeout( function(){ $contentEl.click() } , 2000);
    }
    function stopIt(){
        $scope.playNext = false;
    }
    //$($window).on('scroll', checkPosition);

    $scope.playFrame = 0;
    $scope.playNext = false;
      

    // scroll handler
    var setCurrentContentFrame = function(targetContentFrame) {
        // bail if we are the same
        if (currentContentFrame === targetContentFrame) return;

        var lastContentFrame = currentContentFrame;
        currentContentFrame = targetContentFrame;
    
        // set active pagination dot
        $paginationEl.children('.page').removeClass('active').eq(currentContentFrame).addClass('active');
                
        // prepare to bring in our text                
        var $textEl = $contentFramesEl.eq(currentContentFrame);
    
        // our old text 
        $contentFramesEl.not(':eq(' + currentContentFrame + ')').stop().fadeTo(shouldCrossFade ? 'fast' : 0, 0).data('fading', false);
        
        // remove our old events (sanity check)
        
        $videoEl.off('timeupdate', checkFrameTime);
        $videoEl.off('ended', checkFrameTime);
        
        if ((lastContentFrame >= currentContentFrame) || (currentContentFrame - lastContentFrame > 1)) {
            // going backwards or our frame difference > 1: jump to the frame

            var time = videoFrameTimes[currentContentFrame];

            $videoEl[0].pause();
            if ($videoEl[0].readyState > 0) $videoEl[0].currentTime = time;

            // delay before bringing in the text
            // give our video time to hit the right frame
            
            if (!$textEl.data('fading')) {
                $textEl.data('fading', true).stop().delay(200).fadeTo('fast', 1);
            }
            
            var frame = currentContentFrame;
            
            $timeout(function() {
                // browsers (ie10) do not always update the frame when we pause and set the time
                // explicitly set the time after a short delay
            
                if (frame === currentContentFrame) {
                    // make sure we are still relevant
                    
                    if ($videoEl[0].readyState > 0) {
                        $videoEl[0].currentTime = time;
                    }
                }
                
            }, 250);
        } else {
            // going forwards: play through to the frame
            // first jump to our previous end frame (assume we will never be frame 0)

            if (shouldCrossFade) {
                if (!$textEl.data('fading')) {
                    $textEl.data('fading', true).stop().fadeTo('fast', 1);                        
                }
            }

            if ($videoEl[0].readyState > 0) $videoEl[0].currentTime = videoFrameTimes[currentContentFrame - 1];

            $videoEl.on('timeupdate', checkFrameTime);
            if (currentContentFrame === totalContentFrames - 1) $videoEl.on('ended', checkFrameTime); // we may end before timeupdate is triggered
            $videoEl[0].play();

        }
    };

    var checkFrameTime = function(e) {
        if ($videoEl[0].currentTime >= videoFrameTimes[currentContentFrame] || e.type === 'ended') {
/*            if($scope.playNext && e.type !== 'ended'){
                setTimeout ( function(){
                    $contentEl.click();
                } , 2000);
                
            }*/
            $videoEl[0].pause();
            if ($videoEl[0].readyState > 0) $videoEl[0].currentTime = videoFrameTimes[currentContentFrame];
            
            var $textEl = $contentFramesEl.eq(currentContentFrame);
            
            if (!shouldCrossFade) {
                if (!$textEl.data('fading')) {
                    $textEl.data('fading', true).stop().fadeTo('fast', 1);                            
                }
            }
            
            $videoEl.off('timeupdate', checkFrameTime);
            $videoEl.off('ended', checkFrameTime);
        }
    };

    // content frames

    var $contentFramesEl = $contentEl.children('.frame');

    var currentContentFrame = 0;
    var totalContentFrames = videoFrameTimes.length;
    
    // video
    
    var $videoViewportEl = $contentEl.find('.video-viewport');
    var $videoEl = $videoViewportEl.children('video');

    $videoViewportEl.width($videoEl.attr('width'));
    
    //

    var $paginationEl = $contentEl.find('.frame-pagination');

    for (var i=0; i<totalContentFrames; i++) {
        // add our pagination
        
        $paginationEl.append('<div class="page">');
    }
    
    $paginationEl.children('.page').on('click', function(e) {
        // jump to the selected frame
    
        var targetContentFrame = $paginationEl.children('.page').index(this);
        setCurrentContentFrame(targetContentFrame);
        
        e.stopPropagation(); 
    }).eq(currentContentFrame).addClass('active');
    
    $contentEl.on('click', function() {
        // advance our slide
        
        setCurrentContentFrame((currentContentFrame === totalContentFrames - 1) ? 0 : currentContentFrame + 1);

    });

    /*---------------------------------------------*/

    // off we go

    // debounce our resize
    var resizeTimeout;
    $($window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(moduleHeightDidChange, 100);
    });
    
    moduleHeightDidChange();

    /*---------------------------------------------*/
}]);
