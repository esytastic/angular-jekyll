/*
|--------------------------------------------------------------------------
|
|--------------------------------------------------------------------------
*/
gogoroApp.directive('baseFooter', ['GogoroUrlService', '$location', '$window', function (GogoroUrlService, $location, $window) {
    var lang = gogoro.Locale.lang; // en(全球網站), en-tw(台灣英文), zh-tw(台灣中文)
    var urls = GogoroUrlService.gogoroUrlGenerate();

    //
    var directory_prefix = GogoroUrlService.getResourcesFolderName();
    //
    var templateUrl = directory_prefix + '/Scripts/global/_directive/template/base-footer.html';

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: templateUrl,
        link: function (scope, element, attrs) {
            scope.lang = lang;
            if (lang === "zh-tw") {
                setTimeout(function () {
                    _jf.flush(); //內容變動後，呼叫此函數刷新字型
                }, 1000);
            }


            /*
            |--------------------------------------------------------------------------
            | 只有在 www 的首頁執行以下程式
            |--------------------------------------------------------------------------
            */
            //var $forum = $('#home-footer a.forum');
            // hide footer for Home page for Standard, show it again for Fallback
            function showOrHideMainFooterForHomePage() {
                var application = GogoroUrlService.getCurrentPageName();
                //console.log('getCurrentPageName', application);
                var $mainFooter = $('#main-footer');

                var myInter;


                if (application.controller === '/' ||
                    application.action === 'v2' ||
                    application.action === 'jumbotron'
                ) {
                    if (gogoro.App.getBreakpoint() === 'xs') {
                        $mainFooter.show();
                        console.log('show #main-footer');
                    } else {
                        $mainFooter.hide();
                        console.log('hide #main-footer');
                    }

                } else {
                    //$forum.text('Forum ' + application.controller);
                }
            }

            showOrHideMainFooterForHomePage();
            $($window).resize(function () {
                showOrHideMainFooterForHomePage();
            });

        },
    };
}]);
