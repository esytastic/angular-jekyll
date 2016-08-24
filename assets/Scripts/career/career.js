
gogoroApp.controller('CareerController', ["$scope", "$window", "$rootScope", "GATrackingService", function ($scope, $window, $rootScope, GATrackingService) {

    $(window).scrollTo(0, 0);

    //console.log('career.js');

    // Chagne page title
    //$scope.htmlTitle = 'Faster';

    // Google Analytics Event Tracking
    var gaConfig = { id: 'career' };
    //GATrackingService.init(gaConfig);

    //Google Analytics pageview
    //ga('send', 'pageview', '/#/faster');

    // If active, close side nav
    if ($('body').hasClass('navigation-active')) {
        $('.navbar-toggle').click();
    }

    // Setup responsive images
    var ResponsiveImages = new gogoro.common.ResponsiveImages();

    // Swap SVGs for PNGs for IE8
    if (!Modernizr.svg) {
        $('img[src*="svg"]').each(function () {
            var $this = $(this);
            $this.attr('src', function () {
                return $this.attr('src').replace('.svg', '.png');
            });
        });
    }

    //
    //videoSetting = [
    //  { sources: [{ url: 'http://movies.gogoroapp.com/career/intro-sequence.webm', type: 'video/webm' }, { url: 'http://movies.gogoroapp.com/career/intro-sequence.mp4', type: 'video/mp4' }] },//faster-5
    //    ];
    //    var _loaded = false;
    //    function loadingVideo() {
    //        if (gogoro.App.getState() === 'standard' && !_loaded) {
    //            $('video').each(function (i) {
    //                $(this).append('<source src="' + videoSetting[i].sources[0].url + '" type="' + videoSetting[i].sources[0].type + '"></source>');
    //                $(this).append('<source src="' + videoSetting[i].sources[1].url + '" type="' + videoSetting[i].sources[1].type + '"></source>');
    //            });
    //            _loaded = true;
    //        }
    //    }
    //    loadingVideo();
    //    $(window).on('resize', function () {
    //        loadingVideo();
    //    });
}]);

