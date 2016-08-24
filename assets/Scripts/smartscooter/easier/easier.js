gogoroApp.controller('EasierController', ["$scope", "$window", "GATrackingService", function ($scope, $window, GATrackingService) {
    // console.log('easier');
    $window.scrollTo(0,0);

    // Google Analytics Event Tracking
    var gaConfig = {id:'easier'};
    GATrackingService.init(gaConfig);

    //Google Analytics Event Tracking
    ga('send', 'pageview', '/#/easier');

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
      {sources : [{url:'//movies.gogoroapp.com/easier-2.webm',type:'video/webm'},{url:'//movies.gogoroapp.com/easier-2_2015-01-19.mp4',type:'video/mp4'}]},//easier-2
      {sources : [{url:'//movies.gogoroapp.com/easier-5.webm',type:'video/webm'},{url:'//movies.gogoroapp.com/easier-5_2015-01-19.mp4',type:'video/mp4'}]}//easier-5
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
