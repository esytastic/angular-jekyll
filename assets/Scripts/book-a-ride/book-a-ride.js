
gogoroApp.controller('BookARideController', ["$scope", "$window", "$rootScope", "GATrackingService", function ($scope, $window, $rootScope, GATrackingService) {

    $(window).scrollTo(0, 0);

    //console.log('book a ride');

    // Chagne page title
    //$scope.htmlTitle = 'Faster';

    // Google Analytics Event Tracking
    //var gaConfig = { id: 'career' };
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
}]);

