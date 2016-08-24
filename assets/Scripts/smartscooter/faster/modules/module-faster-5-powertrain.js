/* global $:false */


gogoroApp.controller('moduleFaster5PowertrainController', ["$rootScope", "$scope", "$element", "$window", "$document", "$timeout", "FallbackManagerFactory", "$state", function ($rootScope, $scope, $element, $window, $document, $timeout, FallbackManagerFactory, $state) {
        angular.extend( $scope, FallbackManagerFactory);
        var show_info = false;
        var info = function(msg, value){
            if(show_info){
                console.log(msg, value);
            }
        };

        $scope.standard = {
            init: function() {
                $('.powertrain-blocker').css({
                    display: 'block'
                });

                var that = this;
                var didDestroy = false;

                // background multipliers

                var backgroundMultipliers = [
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2 // padding
                ];

                // frame times in seconds
                var videoFrameTimes = [
                    0,
                    2,
                    5,
                    12,
                    16,
                    24
                ];

                // last minute patch to control when text comes in for longer animations
                // numbers are relative to END of frame. 0 = bring in at end

                var videoFrameTextTimes = [
                    0,
                    -0.5,
                    -0.5,
                    -2.33,
                    -1.5,
                    -5.5
                ];
                $scope.playing = false;
                $scope.currentPlayFrame = 0;

                // elements

                var $el = $($element);
                var nativeModuleHeight = $el.height();

                var $firstModuleEl = $($element).siblings().eq(3); // actually grab our 3rd element, under our tabbar, to avoid flicker

                var $prevModuleEl = $($element).prev();

                var $contentEl = $el.find('.module-video-scroller-content');
                var $backgroundsEl = $el.find('.module-video-scroller-backgrounds');

                // set by moduleHeightDidChange

                var moduleHeight;
                var posterInitLoading = true;
                var posterCounter = 0;
                var moduleHeightDidChange = function() {
                    if (!didDestroy) {
                        moduleHeight = $contentEl.height();
                        //info('$contentEl',moduleHeight);

                        //$paginationEl.height(moduleHeight);

                        var w = $el.innerWidth();

                        if(posterCounter < 2){
                            w = w - 17;//scrollbar width is 17
                            posterCounter++;
                        }

                        $contentEl.width(w); // adjust our pinned width

                        // adjust our video and click cover vertical position

                        $videoViewportWrapperEl.width(w);

                        var mt = (moduleHeight - $videoViewportEl.height()) / 2 + 100;
                        info('moduleHeight',moduleHeight);
                        info('$videoViewportEl.height()', $videoViewportEl.height());
//                        $videoViewportWrapperEl.css({ 'margin-top': mt + 'px' });
                        $videoViewportWrapperEl.css({ 'margin-top': '-330px' });

                        // update our video
                        updateVideo();
                    }
                };


                // scroll handler

                var setCurrentContentFrame = function(targetContentFrame) {
                    if($scope.playing){
                        return;
                    }

                    // bail if we are the same or if our video hasn't loaded
                    if(targetContentFrame < 0){
                        targetContentFrame = 0;
                    }
                    if(targetContentFrame > 8){
                        targetContentFrame = 7;
                    }
                    if($scope.playing){

                        return;
                    }


                    if (currentContentFrame === targetContentFrame || !videoLoaded || $videoEl[0].readyState < 4) return;

                    var lastContentFrame = currentContentFrame;
                    currentContentFrame = targetContentFrame;

                    // we may be scrolling up into a pin from below, so our content frame may be == totalContentFrames
                    // in this case we need to target totalContentFrames - 1

                    var frame = Math.min(currentContentFrame, totalContentFrames - 1);

                    // set active pagination dot
                    $paginationEl.children('.page-wrapper').removeClass('active').eq(frame).addClass('active');
                    $contentEl.focus(); // needed as IE may be holding focus on an old pagination element if we scrolled to navigate

                    // prepare to bring in our text
                    var $textEl = $contentFramesEl.eq(frame);

                    // our old text
                    $contentFramesEl.each(function(index, element) {
                        if (index !== frame) $(element).stop().fadeTo(0, 0).data('fading', false);
                    });

                    // remove our old events (sanity check)

                    $videoEl.off('timeupdate', checkFrameTime);
                    $videoEl.off('ended', checkFrameTime);
                    $scope.playing = true;
                    if ((lastContentFrame >= frame) || (frame - lastContentFrame > 1)) {
                        // going backwards or our frame difference > 1: jump to the frame

                        var time = videoFrameTimes[frame];

                        $videoEl[0].pause();
                        $videoEl[0].currentTime = time;

                        $timeout(function() {
                            // delay before bringing in the text
                            // give our video time to hit the right frame

                            if (frame === Math.min(currentContentFrame, totalContentFrames - 1)) {
                                // make sure we are still relevant

                                $videoEl[0].currentTime = time;
                                if (!$textEl.data('fading')) {
                                    $textEl.data('fading', true).stop().fadeTo('fast', 1);
                                }
                            }
                            setTimeout(function(){
                                $scope.playing = false;
                                $scope.currentPlayFrame = targetContentFrame;
                            } , 500);
                        }, 500);
                    } else {
                        // going forwards: play through to the frame
                        // first jump to our previous end frame (assume we will never be frame 0)

                        $videoEl[0].currentTime = videoFrameTimes[frame - 1];
                        $videoEl[0].play();

                        $videoEl.on('timeupdate', checkFrameTime);
                        if (frame === totalContentFrames - 1) $videoEl.on('ended', checkFrameTime); // we may end before timeupdate is triggered
                    }
                };

                var checkFrameTime = function(e) {
                    if ($videoEl[0].currentTime >= videoFrameTimes[currentContentFrame] || e.type === 'ended') {
                        $videoEl[0].pause();
                        $videoEl[0].currentTime = videoFrameTimes[currentContentFrame];

                        var $textEl = $contentFramesEl.eq(currentContentFrame);

                        if (!$textEl.data('fading')) {
                            $textEl.data('fading', true).stop().fadeTo('fast', 1);
                        }

                        $videoEl.off('timeupdate', checkFrameTime);
                        $videoEl.off('ended', checkFrameTime);

                        $scope.currentPlayFrame +=1;

                        setTimeout( function(){
                            $scope.playing = false;
                        } , 200);

                    } else if ($videoEl[0].currentTime >= videoFrameTimes[currentContentFrame] + videoFrameTextTimes[currentContentFrame]) {
                        // bring text in early

                        var $textEl = $contentFramesEl.eq(currentContentFrame);

                        if (!$textEl.data('fading')) {
                            $textEl.data('fading', true).stop().fadeTo('fast', 1);
                        }
                    }
                };

                var updateVideo = function() {
                    // iterate through our backgrounds to find our current frame

                    // ignore frame-pin, do NOT ignore frame-padding:
                    // we need to acknowledge frame-padding for when we scroll up into a pin
                    if(!$('#faster').is(':visible')){
                        return;
                    }

                    if(!$rootScope.finishPlay || undefined == $rootScope.finishPlay){
                        return;
                    }
                    if( !$contentEl.hasClass('pinned')){
                        return;
                    }

                    var targetContentFrame = totalContentFrames;
                    $backgroundsEl.children('.frame').each(function(index, element) {
                        var $el = $(element);

                        if (index > 0 && index <= totalContentFrames) {
                            // ignore frame-pin, not frame-padding

                            //var backgroundTop = $el.offset().top - $($window).scrollTop();

                            if (backgroundTop >= 0) {
                                targetContentFrame = Math.min(index - 1, targetContentFrame);
                            }
                        }
                    });

                    // update our current frame
                    setCurrentContentFrame(targetContentFrame);

                };

                // content frames

                var $contentFramesEl = $contentEl.children('.frame');

                var currentContentFrame = 0;
                var totalContentFrames = videoFrameTimes.length;

                // video
                var $videoViewportWrapperEl = $contentEl.find('.video-viewport-wrapper');
                var $videoViewportEl = $videoViewportWrapperEl.children('.video-viewport');
                var $videoEl = $videoViewportEl.children('video');

                var w = $videoEl.attr('width');
                var h = $videoEl.attr('height');

                $videoViewportEl.width(w).height(h);

                //
                this.controller = new ScrollMagic();

                // add our pagination
                var $paginationEl = $contentEl.find('.frame-pagination');
                $paginationEl.css('opacity',1);

                for (var i=0; i<totalContentFrames; i++) {
                    // add our pagination

                    var title = $contentFramesEl.eq(i).find('.title').html();
//                    $paginationEl.append('<div class="page-wrapper"><div class="page"></div><div class="title">' + title + '</div></div>');
                    $paginationEl.append('<div class="page-wrapper"><div class="page"></div></div>');
                }

                $paginationEl.children('.page-wrapper').on('click', function() {
                    // jump to the selected frame

                    var targetContentFrame = $paginationEl.children('.page-wrapper').index(this);

                    if($scope.playing){
                        $videoEl.off('timeupdate', checkFrameTime);
                        $videoEl.off('ended', checkFrameTime);
                    }
                    $scope.playing = false;
                    setCurrentContentFrame(targetContentFrame);

                    return false;
                }).eq(currentContentFrame).addClass('active');

                $videoEl.on('playing',function(){
                    $contentEl.off('click');
                    $paginationEl.velocity({display:'none', opacity: 0 }, { duration: 200 });
                    $('.module-video-scroller-content').css('cursor','default');
                });
                $videoEl.on('pause',function(){
                    $contentEl.on('click', clickContentAndPlayVideo);
                    $paginationEl.velocity({display:'block', opacity: 1 }, { duration: 500 });
                    $('.module-video-scroller-content').css('cursor','pointer');
                });

                $contentEl.on('click', clickContentAndPlayVideo);

                function  clickContentAndPlayVideo() {

                    // advance our slide if we are pinned
                    var targetContentFrame = Math.min(totalContentFrames, currentContentFrame + 1); // click to skip through

                    if(targetContentFrame === 6){
                        targetContentFrame = 0;
                    }

                    if($scope.playing){
                        $videoEl.off('timeupdate', checkFrameTime);
                        //$videoEl.off('ended', checkFrameTime);
                    }
                    $scope.playing = false;
                    setCurrentContentFrame(targetContentFrame);

                    $paginationEl.eq(currentContentFrame).addClass('active');
                };

                var updatePaginationPosition = function(){
                    var winHeight = $(window).height();
                    var reminding  = winHeight - 720 - 50;
                    reminding = (reminding > 300)?300:reminding;
                    $('.frame-pagination-wrapper').css('bottom','-'+reminding+'px');
                };

                /*---------------------------------------------*/

                // off we go

                var videoLoaded = ($videoEl[0].readyState === 4);

                if (!videoLoaded) {
                    $videoEl[0].load();

                    $videoEl.on('canplaythrough', function() {
                        videoLoaded = true;
                        moduleHeightDidChange();
                    });
                }

                // debounce our resize
                var resizeTimeoutPromise;

                var resize = function() {
                    $timeout.cancel(resizeTimeoutPromise);
                    resizeTimeoutPromise = $timeout(moduleHeightDidChange, 100);
                    //updatePaginationPosition();
                };

                $($window).on('resize', resize);

                moduleHeightDidChange();

                var mt = (moduleHeight - $videoViewportEl.height()) / 2 + 100;
//                var viewAreaHeight = $videoViewportEl.height();
//                var viewAreaHeight = 1080;
                var viewAreaHeight = 1120;
                var viewAreaHeight = 1160;
                $videoViewportWrapperEl.css({
                    // don't clip the bottom
//                    clip: 'rect(' + (-mt) + 'px, ' + $videoViewportEl.width() + 'px, ' + viewAreaHeight + 'px, 0)'
                    clip: 'rect(330px, ' + $videoViewportEl.width() + 'px, ' + viewAreaHeight + 'px, 0)'
                });


                //updatePaginationPosition();


                // destroy

                this.destroyVideoScroller = function() {
                    // we sometimes get delayed moduleHeightDidChange events we need to ignore
                    didDestroy = true;

                    // sanity check
                    $timeout.cancel(resizeTimeoutPromise);

                    if (that.controller) {
                        that.controller.destroy(true);
                        that.controller = null;
                    }
                    $($window).off('resize', resize);
                    $($window).off('scroll', updateVideo);

                    $paginationEl.children().remove();
                    $contentEl.off('click');

                    $videoEl.off('canplaythrough');
                    $videoEl.off('timeupdate');
                    $videoEl.off('ended');

                    // try and undo as much as possible

                    setCurrentContentFrame(0);

                    $firstModuleEl.velocity('stop').css({
                        'margin-top': 0
                    });

                    $prevModuleEl.velocity('stop').css({
                        'margin-bottom': 0
                    });

                    $el.velocity('stop').css({
                        height: 'auto',
                        'margin-bottom': 0
                    });

                    $paginationEl.height({
                        height: 'auto'
                    });

                    $contentEl.css({
                        width: 'auto'
                    });

                    $videoViewportWrapperEl.velocity('stop').css({
                        clip: 'auto',
                        'margin-top': '0',
                        width: 'auto',
                        height: 'auto'
                    });

                    $videoViewportEl.css({
                        width: 'auto',
                        height: 'auto'
                    });

                    $backgroundsEl.find('.frame-pin .trigger').css({
                        'margin-top': '0'
                    });

                    $backgroundsEl.children('.frame').each(function(index, element) {
                        $(element).css({
                            height: 'auto'
                        });
                    });

                    $('.powertrain-blocker').css({
                        display: 'none'
                    });
                };

                /*---------------------------------------------*/
            },
            destroy: function() {
                if (this.destroyVideoScroller) this.destroyVideoScroller();
            }
        };

        $scope.fallback = {
            init: function() {
                // slider for mobile, ie8/9

                // HTML clean up
                $('.module-faster-5-content', $element).css({
                    display: 'none'
                });

                $('.powertrain-blocker').css({
                    display: 'none'
                });


                // Slideshow
                $('.module-faster-5-fallback', $element).css({
                    display: 'block'
                }).slick({
                    slide: '.slide',
                    dots: true,
                    arrows: false,
                    infinite: true,
                    speed: 650,
                    cssEase: 'ease',
                    slidesToShow: 1,
                    draggable: false,
                    onInit: function() {
                        imgix.onready(function() {
                            imgix.fluid();
                        });
                    }
                });

                $('.module-faster-5-fallback .slide', $element).on('click', function() {
                    $('.module-faster-5-fallback', $element).slickNext();
                });
            },
            destroy: function() {
                // Unbind slideshow
                $('.module-faster-5-fallback', $element).unslick().css({
                    display: 'none'
                });

                $('.module-faster-5-content', $element).css({
                    display: 'block'
                });
            }
        };

        // Initialize module
        $scope.init($scope, $element, true);
    }]);