
gogoroApp.controller('OpenController', ["$scope", "$window", "$rootScope", "GATrackingService", function ($scope, $window, $rootScope, GATrackingService) {

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
}]);
