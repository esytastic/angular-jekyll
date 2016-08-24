/* global $:false, TimelineMax:false, TweenMax:false, Linear:false, ScrollMagic:false, ScrollScene:false */


gogoroApp.controller('moduleFaster7ComparisonInfographicController', ["$scope", "$element", "FallbackManagerFactory", function ($scope, $element, FallbackManagerFactory) {
      angular.extend($scope, FallbackManagerFactory);

      $scope.standard = {
        init: function() {

          if(!Modernizr.svg) {
             console.log('svg not support');
          }

          var setTimeForBar = function(time, $el) {
            var secs = Math.floor(time);
            var millis = Math.floor((time * 1000 - (secs * 1000)) / 10);

            $el.find('.time .second').text(secs);
            $el.find('.time .millis').text('.' + (millis < 10 ? '0' + millis : millis));
          };

          var $el = $($element);
          var $barsEl = $el.find('.infographic .bars');
          var speedMultiplier = 2;

          // us bar
          var $usEl = $el.find('.us');
          var $usBarEl = $usEl.find('.bar');

          var endUsTime = 4.2;
          var usDuration = endUsTime / speedMultiplier;

          var usTween = TweenMax.fromTo($usBarEl, usDuration, {
            width: 0
          }, {
            width: $usBarEl.css('max-width'),

            roundProps: 'width',
            repeat: 0,
            immediateRender: true,
            ease: Linear.easeNone,
            onUpdateParams: ['{self}'],
            onUpdate: function(self) {
              var time = self._time * speedMultiplier;

              setTimeForBar(time, $usEl);
            }
          });

          // them bar
          var $themEl = $el.find('.them');
          var $themBarEl = $themEl.find('.bar');
          var $themBarRemainderEl = $barsEl.find('.them .bar-remainder');

          var endThemTime = 5.03;
          var themDuration = endThemTime / speedMultiplier;
          var themRemainderDuration = 0.5 * 1000;

          var themTween = TweenMax.fromTo($themBarEl, themDuration, {
            width: 0
          }, {
            width: $themBarEl.css('max-width'),

            roundProps: 'width',
            repeat: 0,
            immediateRender: true,
            ease: Linear.easeNone,
            onUpdateParams: ['{self}'],
            onUpdate: function(self) {
              var time = self._time * speedMultiplier;

              setTimeForBar(time, $themEl);

              // make sure we are hidden for when we go in reverse
              $themBarRemainderEl.hide();
            },
            onComplete: function() {
              $themBarRemainderEl.fadeIn(themRemainderDuration);
            }
          });

          // bar titles
          var $usBarTitleEl = $usBarEl.children('.title');
          var $themBarTitleEl = $themBarEl.children('.title');

          var barTitleDuration = 1;
          var usBarTitleDelay = 0.66;

          var usBarTitleTween = TweenMax.fromTo($usBarTitleEl, barTitleDuration, {
            opacity: 0
          }, {
            opacity: 1,

            delay: usBarTitleDelay,
            repeat: 0,
            immediateRender: true,
            ease: Linear.easeNone
          });

          var themBarTitleTween = TweenMax.fromTo($themBarTitleEl, barTitleDuration, {
            opacity: 0
          }, {
            opacity: 1,

            repeat: 0,
            immediateRender: true,
            ease: Linear.easeNone
          });

          // punch line
          var $punchLineEl = $el.find('.image .punch-line');

          var punchLineDuration = 0.5;
          var punchLineDelay = 0.33;
          var punchLineTween = TweenMax.fromTo($punchLineEl, punchLineDuration, {
            opacity: 0
          }, {
            opacity: 1,

            delay: punchLineDelay,
            repeat: 0,
            immediateRender: true,
            ease: Linear.easeNone
          });

          // controller
          var acceleration_tl = new TimelineMax();
            acceleration_tl.insert(usTween).insert(themTween).add(usBarTitleTween).add(themBarTitleTween).add(punchLineTween);

          this.controller = new ScrollMagic();
          var scene = new ScrollScene({
            triggerElement: $element,
            duration: 0
          })
              .setTween(acceleration_tl)
              .addTo(this.controller);

          /**
           *  SVG for Torque
           *  id="svg-gogoro-torque"
           *  id="svg-normal-red-torque"
           *  id="svg-normal-torque"
           *  id="svg-gogoro-text"
           *  id="svg-normal-text"
           */
          var $torque_gogoro     = $("#svg-gogoro-torque"),
              $torque_normal     = $("#svg-normal-torque"),
              $svgRedlines     = $("#svg-redlines"),
              $torque_gogoro_txt = $("#svg-gogoro-text"),
              $torque_normal_txt = $("#svg-normal-text"),
              $torque_stronger_centerbox = $(".svg-stronger-center-box"),
              torque_tl,
              play_once = false;

          var torque_tl = new TimelineMax();


          // toggle click switch themes
          var $acceleEl = $el.find('.charts.acceleration');
          var $torqueEl       = $el.find('.charts.torque');
          var $themesEl       = $el.find('.theme-toggle a');

          var $accelerationTxtWrap = $el.find('.acceleration-txt-wrap');
          var $torqueTxtWrap       = $el.find('.torque-txt-wrap');

          $themesEl.eq(0).css('opacity',1);
          $themesEl.eq(2).css('opacity',1);


          // set default
          $torqueTxtWrap.velocity('stop').velocity('fadeOut', {duration: 0});
          $accelerationTxtWrap.velocity('stop').velocity('fadeIn', {duration:0});

          $themesEl.on('click', function() {

            // reset all click link opacity to .3
            $themesEl.css('opacity',0.3);


            // acceleration or torque
            if( $(this).data('chart') == 'acceleration'){
                // display acceleration chart
                $torqueEl.velocity('stop').velocity('fadeOut', {duration: 0,complete:function(){
                  $acceleEl.velocity('stop').velocity('fadeIn', {
                    duration: 0
                  });
                }});

                // display acceleration text
                $torqueTxtWrap.velocity('stop').velocity('fadeOut', {duration: 0,complete:function(){
                  $accelerationTxtWrap.velocity('stop').velocity('fadeIn', {
                    duration: 0
                  });
                }});

                // Restart acceleration chart animation
                acceleration_tl.restart();

                // change click link opacity
               $themesEl.eq(0).css('opacity',1);
               $themesEl.eq(2).css('opacity',1);

               // Reset css for Torque chart and when user click Acceleration link
               // the animation will play again.
               $torque_gogoro.css('stroke-dasharray',600).css('stroke-dashoffset',600);
               $torque_normal.css('stroke-dasharray',600).css('stroke-dashoffset',600);
               TweenMax.to($svgRedlines, 0, {opacity:"0"});
               TweenMax.to($torque_gogoro_txt, 0, {opacity:0});
               TweenMax.to($torque_normal_txt, 0, {opacity:0});
               TweenMax.to($torque_stronger_centerbox, 0, {opacity:0});
               $torque_stronger_centerbox.css('opacity',0);

            }else{

                // display torque chart
                $acceleEl.velocity('stop').velocity('fadeOut', {duration: 50,complete:function(){
                  $torqueEl.velocity('stop').velocity('fadeIn', {
                    duration: 450,complete:function(){
                          if(play_once == false){
                              setTimeout(function(){
                                  buildTimeline();
                              },500);
                              play_once = true;
                          }else{

                              torque_tl.restart();

                          }
                      }
                  });
                }});



                // display torque text
                $accelerationTxtWrap.velocity('stop').velocity('fadeOut', {duration: 0,complete:function(){
                  $torqueTxtWrap.velocity('stop').velocity('fadeIn', {
                    duration: 0
                  });
                }});

                // change click link opacity
                $themesEl.eq(1).css('opacity',1);
                $themesEl.eq(3).css('opacity',1);

                // Reset css for Acceleration chart and when user click Torque link
                $punchLineEl.css('opacity',0);
            }
          });
          function buildTimeline() {
            var delayTime = '-=1.3';
            torque_tl
                .to($torque_gogoro, 3, {strokeDashoffset:0})
                .to($torque_normal, 3, {strokeDashoffset:0},"-=3")
                .to($svgRedlines, 1, {opacity:1},'-=1.3')
                .to($torque_gogoro_txt, 1, {opacity:1},'-=0.3')
                .to($torque_normal_txt, 1, {opacity:1},'-=0.3')
                .to($torque_stronger_centerbox, 0.5, {opacity:1,delay: punchLineDelay});
          }
        },
        destroy: function() {
          if (this.controller) {
            this.controller.destroy(true);
            this.contoller = null;
          }
        }
      };

      $scope.fallback = {
        init: function() {
            var $el = $($element);
            var $accelerationTxtWrap = $el.find('.acceleration-txt-wrap');
            var $torqueTxtWrap       = $el.find('.torque-txt-wrap');
            var $accelH2 = $accelerationTxtWrap.find('h2');
            var $accelp = $accelerationTxtWrap.find('p');
            var $themesEl = $el.find('.theme-toggle a');
            var $firstlineimage = $el.find('.firstlineimage');

            $torqueTxtWrap.css('opacity', 1);

            var url = '//images.gogoroapp.com/';
            if (gogoro.Locale.lang == 'zh-tw') {
                var charth2 = ['鋒芒畢露', '一路領先'];
                var charthp = ['性能模式下，0到50公里加速只要4.2秒，瞬間輸出100%的扭力。你總是保持領先，不被埋沒於車陣之中。',
                               '<span class="graphik-light">Gogoro®</span>獨家研發的<span class="graphik-light">G1</span>馬達，從靜止狀態就瞬間釋放全部馬力。一起步就將對手遠遠拋開。'];
                var images = ['faster-7-infographic.fallback_20150415_tw.png', 'faster-7-torque.fallback_20150415_tw.png'];
            } else {
                var charth2 = ['First off the line', 'Born to Lead'];
                var charthp = ['Instant access to 100% power torque on demand. Our digital throttle in sport mode takes riders from 0-50 km/h in 4.2 seconds. You’ll lead the pack, every time.',
                               'Gogoro’s G1 motor serves up full torque from 0 RPM. So while gas guzzling scooters are still busy revving up their engines, you’re probably already gone.'];
                var images = ['faster-7-infographic.fallback_20150415_en.png', 'faster-7-torque.fallback_20150415_en.png'];
            }

            
            

            


            // images.gogoroapp.com/faster-7-infographic.fallback-new.png
            // images.gogoroapp.com/faster-7-torque.fallback-new.png

            $('.background-image.fallback.firstlineimage').show();
            $('.charts.acceleration').hide();

            $themesEl.eq(0).css('opacity',1);
            $themesEl.on('click',function(e){
                e.preventDefault();

                // reset all click link opacity to .3
                $themesEl.css('opacity',0.3);

                // acceleration or torque
                if( $(this).data('chart') == 'acceleration'){

                    // change click link opacity
                    $themesEl.eq(0).css('opacity',1);
                    $themesEl.eq(2).css('opacity',1);
                    // change image
                    $firstlineimage.prop('src',url+images[0]);

                    // switch text
                    $accelH2.text(charth2[0]);
                    $accelp.text(charthp[0]);
                }else{

                    // change click link opacity
                    $themesEl.eq(1).css('opacity',1);
                    $themesEl.eq(3).css('opacity',1);
                    // change image
                    $firstlineimage.prop('src',url+images[1]);

                    // switch text
                    $accelH2.text(charth2[1]);
                    $accelp.html(charthp[1]);
                }
            });
            // reset
            resetChartText();
            $(window).resize(function(){
                resetChartText();
            });
            function resetChartText(){
              //md,sm
              if(gogoro.App.getBreakpoint() === 'sm'){
                  // change image
                  $firstlineimage.prop('src',url+images[0]);
                  // switch text
                  $accelH2.text(charth2[0]);
                  $accelp.text(charthp[0]);

                  //
                  $torqueTxtWrap.show();
              }
            }
        },
        destroy: function() {
            $('.background-image.fallback.firstlineimage').hide();
            $('.charts.acceleration').show();
        }
      };

      // Initialize module
      $scope.init($scope, $element, true);
    }]);