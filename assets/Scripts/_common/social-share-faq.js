(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.common = global.gogoro.common || {};
    global.gogoro.common.socialShare = SocialShare;

    function SocialShare() {
        var $socialShare = $('#social-share');
        //var shareUrl = encodeURI(global.location.href).replace(/%25/g, '%');
        var shareUrl = global.location.href;
        var shareTitle = $('.pg-faq .modalWindow h2:eq(0)').html();

        $('a', $socialShare).each(function () {
            var $this = $(this);
            var socialShareNetwork = $(this).attr('id').replace('social-share-', '');

            switch (socialShareNetwork) {
                case 'twitter':
                    $this.attr('href', 'http://twitter.com/share?text=' + shareTitle + '&url=' + shareUrl);
                    break;
                case 'facebook':
                    $this.attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl);
                    break;
                case 'google':
                    $this.attr('href', 'https://plus.google.com/share?url=' + shareUrl);
                    break;
                case 'linkedin':
                    $this.attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + shareUrl + '&title=' + shareTitle + '&summary=&source=');
                    break;
            }
        });
    }
}(window.jQuery, window));
