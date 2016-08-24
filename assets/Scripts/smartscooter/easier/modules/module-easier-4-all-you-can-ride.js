/* global $:false */


gogoroApp.controller('moduleEasier4AllYouCanRideController', ["$scope", "$element", "$window", "FallbackManagerFactory", "$interval", function ($scope, $element, $window, FallbackManagerFactory, $interval) {

    angular.extend($scope, FallbackManagerFactory);

    setDescriptionHeight();
    var delayTime = 5000;
    $(window).on('resize', function() {
      setDescriptionHeight()
    });

    var $el = $($element);

    var $toggleEl = $el.find('.battery-go-station-toggle');
    var $batteryToggleEl = $toggleEl.children('.battery');
    var $goStationToggleEl = $toggleEl.children('.go-station');

    var $batteryBgdEl = $el.find('.background-battery');
    var $goStationBgdEl = $el.find('.background-go-station');

    var $batteryDescriptionEl = $('.description.battery');
    var $goStationDescriptionEl = $('.description.go-station');

    var $partnershipEl = $('.partnership');


    $('.battery-go-station-toggle a', $element).on('click', function(e) {
      e.preventDefault();

      $interval.cancel($scope.intervalNum);
      setInfinityPlay();

      if (!$(this).hasClass('inactive')) {
        return false;
      }

      if (!$batteryBgdEl.hasClass('active')) {
        toggleBattery();
      } else {
        toggleStation();
      }

    });

    function toggleBattery() {
      $goStationBgdEl.removeClass('active');
      $goStationToggleEl.addClass('inactive');

      $batteryToggleEl.removeClass('inactive');
      $batteryBgdEl.addClass('active');

      $goStationDescriptionEl.velocity('stop').velocity('fadeOut', {
        duration: 150,
        complete: function() {
          $batteryDescriptionEl.velocity('stop').velocity('fadeIn', {
            duration: 250
          });
        }
      });

      $goStationBgdEl.velocity('stop').velocity('fadeOut', {
        duration: 50
      });

      $batteryBgdEl.velocity('stop').velocity('fadeIn', {
        duration: 450
      });

      $partnershipEl.css('opacity','1');
      $scope.num = 1;
    }

    function toggleStation() {
      $batteryBgdEl.removeClass('active');
      $batteryToggleEl.addClass('inactive');

      $goStationToggleEl.removeClass('inactive');
      $goStationBgdEl.addClass('active');

      $batteryDescriptionEl.velocity('stop').velocity('fadeOut', {
        duration: 150,
        complete: function() {
          $goStationDescriptionEl.velocity('stop').velocity('fadeIn', {
            duration: 250
          });
        }
      });

      $batteryBgdEl.velocity('stop').velocity('fadeOut', {
        duration: 50
      });

      $goStationBgdEl.velocity('stop').velocity('fadeIn', {
        duration: 450
      });

      $partnershipEl.css('opacity','0');
      $scope.num = 0;
    }

    function setDescriptionHeight() {
      $('.descriptions', $element).css({
        height: $('.descriptions .description', $element).outerHeight()
      });
    }

    $scope.num = 1;
    $scope.intervalNum = null;
    //toggleStation();
      function checkPosition(){
        var _bottom = $(window).scrollTop() + $(window).innerHeight();
        var _top = $(window).scrollTop();
        var sceneBottom = $($element).offset().top + $($element).height() ;
        if(sceneBottom > _top && sceneBottom < _bottom){
          //visible auto play
          autoPlay();
        }else{
          //drop it
          stopIt();

        }
      }
      function autoPlay(){
        if($scope.playNext){
          return;
        }
        
        setInfinityPlay();
        $scope.playNext = true;
        
      }
      function setInfinityPlay(){
        return;
        $scope.intervalNum = $interval(function(){
          if($scope.num === 0){
            toggleBattery()
          }else{
            toggleStation()
          }
        },delayTime);
      }
      function stopIt(){
        $scope.playNext = false;
        $interval.cancel($scope.intervalNum);
      }
      $scope.standard = {
        init: function() {
          //$($window).on('scroll', checkPosition);
         
        },
        destroy: function() {
          //$($window).off('scroll', checkPosition);
        }
      };
      $scope.fallback = {
        init: function() {
        },
        destroy: function() {
        }
      };

     // Initialize module
     $scope.init($scope, $element, true);
  }]);