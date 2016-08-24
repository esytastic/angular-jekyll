/* global $:false, TweenMax:false, Linear:false, ScrollMagic:false, ScrollScene:false */


gogoroApp.controller('moduleSmarter5GogoroAppController', ["$scope", "$element", "$window", "$document", "$timeout", "FallbackManagerFactory", function ($scope, $element, $window, $document, $timeout, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
      init: function() {
        var $body = $('body');
        var $container = $('#gogoro-app', $element);

        // Detect the start and end of Gogoro app scrolling
        $(window).on('scroll', function(e) {
          var scrollPos = $(this).scrollTop();
          var $firstSection = $('#section-one', $element);
          var $lastSection = $('#section-seven', $element);

          if (scrollPos > $firstSection.offset().top && $container.hasClass('scroll-start')) {
            $container.removeClass('scroll-start');
            toggleSectionPagination();
          } else if (scrollPos < $firstSection.offset().top && !$container.hasClass('scroll-start')) {
            $container.addClass('scroll-start');
            toggleSectionPagination();
          }

          if (scrollPos > $lastSection.offset().top && !$container.hasClass('scroll-end')) {
            $container.addClass('scroll-end');
            toggleSectionPagination();
          } else if (scrollPos < $lastSection.offset().top && $container.hasClass('scroll-end')) {
            $container.removeClass('scroll-end');
            toggleSectionPagination();
          }
        });

        function toggleSectionPagination() {
          var $appPagination = $('#app-pagination', $element);

          if ($appPagination.hasClass('active')) {
            $appPagination.velocity('transition.slideRightBigOut', {
              duration: 200
            }).removeClass('active');
          } else {
            $appPagination.velocity('transition.slideRightBigIn', {
              duration: 200
            }).addClass('active');
          }
        }


        // Detect change of each seciton
        $('section', $element).on('inview', function(event, isInView, visiblePartX, visiblePartY) {
          if (isInView) {
            // element is now visible in the viewport

            var currentIndex = ($(this).attr('data-index') - 1);

            // console.log('inview: ', currentIndex);
            // console.log('isInView: ', isInView);

            // Set navigation
            $('#app-pagination li.active', $element).removeClass('active');

            $('#app-pagination li:eq(' + currentIndex + ')', $element).addClass('active');

            if (visiblePartY == 'top') {
              // top part of element is visible
            } else if (visiblePartY == 'bottom') {
              // bottom part of element is visible
            } else {
              // whole part of element is visible
            }
          } else {
            // element has gone out of viewport
          }
        });


        $('#app-pagination a', $element).on('click', function(e) {
          e.preventDefault();

          var target = $(this).attr('href');

          $body.scrollTo(target, 400, 'easeInOutQuad');
        });

        $(window).on('resize', function() {
          setSectionHeight();
        });

        setSectionHeight();

        function setSectionHeight() {
          var windowHeight = $(window).outerHeight();

          $('#gogoro-app section, #app-pagination', $element).css({
            height: windowHeight
          });
        }

      },

      destroy: function() {
        if (this.destroyApp) this.destroyApp();
      }
    };

    $scope.fallback = {
      init: function() {
        // slider for mobile, ie8/9

        // HTML clean up
        $('.module-smarter-5-content, .module-smarter-5-backgrounds', $element).css({
          display: 'none'
        });

        // Slideshow
        $('.module-smarter-5-fallback', $element).css({
            display: 'block'
        });

        $(window).load(function () {
            $('.module-smarter-5-fallback').slick({
                slide: '.slide',
                dots: true,
                arrows: false,
                accessibility: true,
                infinite: true,
                speed: 650,
                cssEase: 'ease',
                slidesToShow: 1,
                draggable: false,
                onInit: function () {
                    imgix.onready(function () {
                        imgix.fluid();
                    });
                }
            });
        });



        $('.module-smarter-5-fallback .slide', $element).on('click', function() {
          $('.module-smarter-5-fallback', $element).slickNext();
        });
      },
      destroy: function() {
        // Unbind slideshow
        $('.module-smarter-5-fallback', $element).unslick().css({
          display: 'none'
        });

        $('.module-smarter-5-content, .module-smarter-5-backgrounds', $element).css({
          display: 'block'
        });
      }
    };

    // Initialize module
    $scope.init($scope, $element);
  }]);
