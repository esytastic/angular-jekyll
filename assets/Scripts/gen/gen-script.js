
gogoroApp.controller('GenController', ["$scope", "$window", "$rootScope", "GATrackingService", function ($scope, $window, $rootScope, GATrackingService) {

    $(window).scrollTo(0,0);

    // If active, close side nav
    if ( $('body').hasClass('navigation-active') ) {
      $('.navbar-toggle').click();
    }

    // Setup responsive images
    var ResponsiveImages = new gogoro.common.ResponsiveImages();

    // Swap SVGs for PNGs for IE8
    if(!Modernizr.svg) {
      $('img[src*="svg"]').each(function() {
        var $this = $(this);
        $this.attr('src', function() {
          return $this.attr('src').replace('.svg', '.png');
        });
      });
    }

    videoSetting = [
     //remove  {sources : [{url:'//movies.gogoroapp.com/module-faster-2.mp4',type:'video/mp4'},{url:'//movies.gogoroapp.com/module-faster-2.webm',type:'video/webm'}]},//faster-2
      {sources : [{url:'//movies.gogoroapp.com/module-faster-5-powertrain.webm',type:'video/webm'},{url:'//movies.gogoroapp.com/module-faster-5-powertrain-20150117.mp4',type:'video/mp4'}]},//faster-5
      {sources : [{url:"//movies.gogoroapp.com/module-faster-9-chassis.webm",type:"video/webm"},{url:"//movies.gogoroapp.com/module-faster-9-chassis_2015-01-19.mp4",type:"video/mp4"}]},//faster-8
      {sources : [{url:'//movies.gogoroapp.com/faster-10-scooter-xray.webm',type:'video/webm'},{url:'//movies.gogoroapp.com/faster-10-scooter-xray.mp4',type:'video/mp4'}]},//faster-10
      { sources: [{ url: '//movies.gogoroapp.com/waterProof_revised.webm', type: 'video/webm' }, { url: '//movies.gogoroapp.com/waterProof_revised.mp4', type: 'video/mp4' }] }//faster-11
    ];
    var _loaded = false;
    function loadingVideo(){
      if(gogoro.App.getState() === 'standard' && !_loaded){
        $('video').each(function(i){
          $(this).append('<source src="'+videoSetting[i].sources[0].url+'" type="'+videoSetting[i].sources[0].type+'"></source>');
          $(this).append('<source src="'+videoSetting[i].sources[1].url+'" type="'+videoSetting[i].sources[1].type+'"></source>');
        });
        _loaded = true;
      }
    }
    loadingVideo();
    $(window).on('resize', function() {
      loadingVideo();
    });
}]);
