/* global $:false */


gogoroApp.controller('moduleSmarterRideSmartController', ["$scope", "$element", "$controller", "FallbackManagerFactory", function ($scope, $element, $controller, FallbackManagerFactory) {
	angular.extend($scope, FallbackManagerFactory);

	$scope.standard = {
      init: function() {
          var isVideoPlay = false;
          var duration = 0.3;
          var playVideo = function(){
          	/*
            if(!isVideoPlay){
              $('#module-faster-4-video').get(0).play();
            }
            isVideoPlay = true;
            */
          }
          var tween = TweenMax.staggerFromTo($($element).find('h3'), duration,
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
          var scene = new ScrollScene({triggerElement: $element, duration:400})
                          .setTween(tween)
                          .on("enter leave", function (e) {playVideo();})
                          .addTo(this.controller);


          /**
           * .module-smarter-4b-smart-mode-chart
           */
          // Inital variables
          var $module         = $('.module-smarter-4b-smart-mode-chart');
          var $normalMode     = $module.find('.svg-normal-mode');
          var $smartMode      = $module.find('.svg-smart-mode');
          var $squareBg       = $module.find('.svg-square-box-bg');
          var $squareFuther   = $module.find('.svg-square-box-futher');
          var $normalModeLine = $module.find('.module-smarter-4b-normal-mode-line');
          var smartController = new ScrollMagic();;

          // Initial CSS settings
          /// smart mode linear gradient
          var $smartModelinearGradientStop = $smartMode.find('.smart-mode-lg-stop');
          $smartModelinearGradientStop.eq(0).attr('stop-opacity',0.1);
          $smartModelinearGradientStop.eq(1).attr('stop-opacity',0.1);
          /// normal mode linear gradient
          var $normalModeLinearGradientStop = $normalMode.find('.normal-mode-lg-step');


          // clone
          /// clone normal mode and change its attributes
          var $normalModeLighter = $normalMode.clone();
          $normalModeLighter.attr('class', 'svg-normal-mode-lighter');
          $normalModeLighter.find('linearGradient').attr('id','normal-mode-lg-lighter');
          $normalModeLighter.find('linearGradient').find('stop').attr('class','normal-mode-lg-step-lighter');
          $normalModeLighter.find('path').attr('id','normal-mode-path-lighter');
          $normalModeLighter.find('path').attr('stroke','url(#normal-mode-lg-lighter)');

          //$normalModeLighter.insertAfter($normalMode);

          // Set attributes for original DOM
          $normalModeLinearGradientStop.eq(0).attr('stop-opacity',0.1);
          $normalModeLinearGradientStop.eq(1).attr('stop-opacity',0.1);


          // debugger

          $normalModeLinearGradientStop.each(function(){
              //console.log(this);
          });
          $smartModelinearGradientStop.each(function(){
              //console.log(this);
          });

          $squareBg.css('opacity',0);
          $squareFuther.css('opacity',0);

          // Create tweens

          var tweenNormalModeLine = TweenMax.to($normalModeLine,1, {opacity:0,height:0,top:'225px','background-size':'636px 0px'},'+=0.75');
          var tweeSmartModelinearGradientStop = TweenMax.to($smartModelinearGradientStop,.2, {'stop-opacity':1});
          var tweeSquareBg = TweenMax.to($squareBg,.4, {opacity:1,delay:.5});
          var tweeSquareFuther = TweenMax.to($squareFuther,2, {opacity:1, delay:.5});

          // Group tweens
          var smartTimeLines = new TimelineMax();
          smartTimeLines
              .add(tweenNormalModeLine)
              .add(tweeSmartModelinearGradientStop)
              .add(tweeSquareBg)
              .add(tweeSquareFuther);

          // Start Animations with ScrollScene
          new ScrollScene({triggerElement: $module, duration: 0})
              .setTween(smartTimeLines)
              .addTo(smartController)
              .offset(200);


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
    $scope.init($scope, $element);
}]);
