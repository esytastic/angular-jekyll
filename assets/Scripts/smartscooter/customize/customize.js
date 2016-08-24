gogoroApp.controller('CustomizeController', ["$scope", "$window", "GATrackingService", "$location", function ($scope, $window, GATrackingService, $location) {
    // console.log('customize');
    $window.scrollTo(0,0);

    // Google Analytics Event Tracking
    var gaConfig = {id:'customize'};
    GATrackingService.init(gaConfig);

    //Google Analytics Event Tracking
    ga('send', 'pageview', '/#/customize');

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


    // to prevent mobile site loading video
    videoSetting = [
        {
            sources: [
              { url: '//movies.gogoroapp.com/CustomizeColor3MatchWhite_2015-06-23.webm', type: 'video/webm' },
              { url: '//movies.gogoroapp.com/CustomizeColor3MatchWhite_2015-06-23.mp4', type: 'video/mp4' }
            ]
        }
    ];

    var _loaded = false;
    function loadingVideo() {
        if (gogoro.App.getState() === 'standard' && !_loaded) {
            $('video').each(function (i) {
                $(this).append('<source src="' + videoSetting[i].sources[0].url + '" type="' + videoSetting[i].sources[0].type + '"></source>');
                $(this).append('<source src="' + videoSetting[i].sources[1].url + '" type="' + videoSetting[i].sources[1].type + '"></source>');
            });
            _loaded = true;
        }
    }
    loadingVideo();
    $(window).on('resize', function () {
        loadingVideo();
    });

}]);
