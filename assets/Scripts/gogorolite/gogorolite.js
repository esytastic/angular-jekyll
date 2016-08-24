gogoroApp.controller('moduleCustomize9DesignEthosController', ["$scope", "$element", "$window", "$controller", "FallbackManagerFactory", function ($scope, $element, $window, $controller, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);


    var $el = $($element);

    $scope.standard = {
        init: function () {
            setTimeout(function () {
                $(".video-design-ethos").append(
                    '<video id="design-ethos-video" class="video-delay" width="2560" height="600" muted preload="auto" autoplay loop  poster="//gogoro.imgix.net/bdg-module-customize-9.jpg">' +
                    '<source src="//movies.gogoroapp.com/module-customize-9-design-ethos.webm" type="video/webm">' +
                    '<source src="//movies.gogoroapp.com/module-customize-9-design-ethos_2015-01-19.mp4" type="video/mp4">' +
                    '</video>');

                var $video = $el.find('#design-ethos-video');

                $video.get(0).play();
                $video.bind('ended', function () {
                    setTimeout(function () {
                        $video.get(0).play();
                    }, 2000);
                });

            }, 1000);


        },
        destroy: function () {

        }
    };

    $scope.fallback = {
        init: function () {
            //console.log('module-customize-9-design-ethos fallback');
            var img_url = 'http://images.gogoroapp.com/faceplate/600/';

            var images = [
                img_url + 'module-customize-9-design-ethos_.jpg',
                img_url + 'module-customize-9-design-ethos_00.jpg',
                img_url + 'module-customize-9-design-ethos_01.jpg',
                img_url + 'module-customize-9-design-ethos_02.jpg',
                img_url + 'module-customize-9-design-ethos_03.jpg',
                img_url + 'module-customize-9-design-ethos_04.jpg',
                img_url + 'module-customize-9-design-ethos_05.jpg',
                img_url + 'module-customize-9-design-ethos_06.jpg',
                img_url + 'module-customize-9-design-ethos_07.jpg',
                img_url + 'module-customize-9-design-ethos_08.jpg',
                img_url + 'module-customize-9-design-ethos_09.jpg',
                img_url + 'module-customize-9-design-ethos_10.jpg',
                img_url + 'module-customize-9-design-ethos_11.jpg',
                img_url + 'module-customize-9-design-ethos_12.jpg'
            ];

            // Preload images
            $.preloadimages(images);

            //
            var $images_elm = $el.find('.design-ethos-images');
            var counter = 0;
            animate_imgs();
            function animate_imgs() {
                setTimeout(function () {
                    $images_elm.prop('src', images[counter]);
                    counter++;
                    if (counter == 12) {
                        counter = 0;
                    }

                    animate_imgs();
                }, 1000);
            }
        },
        destroy: function () {

        }
    };

    // Initialize module
    $scope.init($scope, $element);

}]);


//if ($(window).scrollTop() > 800) {
//    $('.GoStaion_AllYou2').hide();
//    $('.test').show();
//} else {
//    $('.GoStaion_AllYou2').show();
//    $('.test').hide();
//}