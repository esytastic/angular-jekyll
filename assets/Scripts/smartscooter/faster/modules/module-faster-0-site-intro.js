/* global $:false */

gogoroApp.controller('moduleFaster0SiteIntroController', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", function ($scope, $element, FallbackManagerFactory, $rootScope) {
        angular.extend($scope, FallbackManagerFactory);

        $scope.playHeroVideo = function(){
            gogoro.AppIntro.ytplayer.playVideo();
            $('.nav-bar-stop').show();
            $('.navbar').hide();
            $('.video_hero .container').addClass('transparent');
        };

        $scope.goVideo = function(){
            if (!gogoro.AppIntro.enableMove) {
                return;
            }
            gogoro.AppIntro.LoadMovieClip();
        };

        $scope.skipVideo = function(){
            gogoro.AppIntro.removeTakeover();
        };
        
        $scope.standard = {
            init: function() {

                // Initial variables
                var $elm = $($element);
                var $introOpenWrap  = $('.intro-open-wrap');
                var $introArrow  = $('#intro-open');
                var $introArrowTxt  = $('.icon-arrow-txt');
                var $loadingCycle  = $('#loading-cycle');
                var $verticalCenterFlex = $('.vertical-center-flex');
                var vHeight = $elm.height();
                var $loadingNum = $elm.find('.sprite-loading-num');

                //gogoro.AppIntro.LoadTakeover();

                $('.navbar-header').removeClass('white');

                var video = $('#powertrainVideo').get(0);

                /**
                 * Disable mouse scrolling while loading powertrain video.
                 * gogoro.App.enableMove:
                 * - true  = don't use progress bar
                 * - false = use progress bar
                 */
                gogoro.AppIntro.enableMove = true;
                if (gogoro.AppIntro.enableMove) {
                    $loadingCycle.css('display', 'none').css('opacity', 0);
                    $loadingNum.css('display', 'none').css('opacity', 0);
                    $introArrow.css('opacity', 1);
                    $introArrowTxt.css('display', 'none').css('opacity', 0);
                }

                /**
                 *  Video loading progress
                 */
                function videoProgress() {
                    console.log('videoProgress');
                    if (video.buffered.length > 0) {
                        var percent = Math.ceil(100 * video.buffered.end(0) / video.duration);

                        $loadingNum.text(percent+'%');

                        if(parseInt(video.buffered.end(0) / video.duration * 100) == 100) {
                            // video has loaded....
                            video.pause();
                            video.currentTime = 0;
                            $(video).removeAttr('autoplay');
                            $(video).off('progress' , videoProgress);


                            // enable mouse scrolling
                            gogoro.AppIntro.enableMove = true;

                            // sequance animations.
                            var tl = new TimelineMax();
                            tl.to($loadingCycle, 0.2, {opacity:0})
                              .to($loadingNum, 0.2, {opacity:0})
                              .to($introArrow, 0.2, {opacity:1})
                              .to($introArrowTxt, 0.2, {opacity:1,onComplete:function(){
                                    $loadingCycle.hide();
                                    $loadingNum.hide();
                                }});

                            //Remove the listener for loadingCycleAnimate();
                            TweenMax.ticker.removeEventListener("tick", loadingCycleAnimate);

                            // show arrow
                            //$introArrow.show();
                        };
                    }
                }

                if (!gogoro.AppIntro.enableMove) {
                    $(video).on('progress', videoProgress);
                }

                // when user click on "down arrow" open the intro
                $introArrow.on('click', function(e) {
                    gogoro.AppIntro.removeTakeover();
                });

                $elm.on('click', function (e) {
                    gogoro.AppIntro.removeTakeover();
                });
                

                /**
                 * load cycle animation
                 */
                var fps             = 30,
                    currentFrame    = 0,
                    cycleWidth      = 30,
                    totalFrames     = 40,
                    elmLoadingCycle = document.getElementById("loading-cycle"),
                    bgPosition      = 0;

                //TweenMax.ticker.fps(fps);
                //TweenMax.ticker.addEventListener('tick', loadingCycleAnimate);
                function loadingCycleAnimate(){
                    // calculate css background-position
                    bgPosition = currentFrame * cycleWidth;
                    // change css background-position value.
                    elmLoadingCycle.style.backgroundPosition = "0 -" + bgPosition + "px";
                    // reset or increase currentFrame
                    if (currentFrame >= totalFrames) {
                        currentFrame = 0;
                    }else{
                        currentFrame++;
                    }
                }

                function adjustIntroOpenWrapPosition(){
                    vHeight = $elm.height();
                    if(vHeight > 800){
                       var reminder = (vHeight - 790) / 10;

                       $introOpenWrap.stop().velocity({bottom:-reminder+'px'},0);
                    }else{
                        if(vHeight > 670){
                            $introOpenWrap.stop().velocity({bottom:'20px'},500);
                        }else{
                            $introOpenWrap.stop().velocity({bottom:'40px'},500);
                        }

                    }
                }
                adjustIntroOpenWrapPosition();
                $( window ).resize(function() {
                    adjustIntroOpenWrapPosition();
                });

                
            },
            destroy: function() {
                $('.module-faster-0-site-intro').unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
                $('.module-faster-0-site-intro').css({
                    display: 'none'
                });
            }
        };

        $scope.fallback = {
            init: function() {

                var $elm = $($element);
                var $introOpenWrap  = $('.intro-open-wrap');
                var $introArrow  = $('#intro-open');
                var $introArrowTxt  = $('.icon-arrow-txt');
                var $loadingCycle  = $('#loading-cycle');
                var $loadingNum = $('.sprite-loading-num');

                if(!isMobile.any){
                    //gogoro.App.LoadTakeover();
                }

                
                /**
                 * Disable mouse scrolling
                 * gogoro.App.enableMove:
                 * - true  = allow user to remove LoadTakeover by mouse scrolling
                 * - false = disallow user to remove LoadTakeover by mouse scrolling
                 */
                gogoro.App.enableMove = true;

                $loadingCycle.hide();
                $loadingNum.hide();

                $introArrow.css('opacity', 1);
                $loadingNum.css('opacity', 1);

                // when user click on "down arrow" open the intro
                $introArrow.on('click', function(e) {
                    gogoro.App.removeTakeover();
                });


            },
            destroy: function() {
            }
        };

        // Initialize module
        $scope.init($scope, $element, true);
    }]);





