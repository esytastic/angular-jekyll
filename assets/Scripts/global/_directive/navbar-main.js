/*
|--------------------------------------------------------------------------
| 
|--------------------------------------------------------------------------
*/
gogoroApp.directive('navbarMain', ['GogoroUrlService', function (GogoroUrlService) {

    var lang = gogoro.Locale.lang; // en(全球網站), en-tw(台灣英文), zh-tw(台灣中文)
    var urls = GogoroUrlService.gogoroUrlGenerate();

    // 不一樣的subdoamin的讀取路徑會有所不同
    var templateUrl = GogoroUrlService.getResourcesFolderName() + '/Scripts/global/_directive/template/navbar-main.html';

    // navbar-primary 連結內容
    var primary = {
        'en': [
            {
            'name': 'Smartscooter™',
            'url': '#',
            'sublinks': [
                    { 'name': 'Gogoro Plus / Gogoro', 'url': urls.wwwGogoroUrl + 'smartscooter/faster' },
                    { 'name': 'Gogoro Lite', 'url': urls.wwwGogoroUrl + 'gogorolite' },
                    { 'name': 'Comparison', 'url': urls.wwwGogoroUrl + 'smartscooter/specs' }
                ],
            },
            {
            'name': 'Gogoro® Energy Network',
            'url': '#',
            'sublinks': [
                    { 'name': 'Energy Network', 'url': urls.wwwGogoroUrl + 'gen' },
                    { 'name': 'GoStation®', 'url': urls.wwwGogoroUrl + 'gostation' },
                    { 'name': 'GoCharger™', 'url': urls.wwwGogoroUrl + 'gocharger' },
                    { 'name': 'OPEN Initiative', 'url': urls.wwwGogoroUrl + 'open' },
                ],
            },
            {
                'name': 'FAQ',
                'url': urls.wwwGogoroUrl + 'faq',
                'sublinks': [],
            }
        ],
        'en-tw': [
            {
            'name': 'Smartscooter™',
            'url': '#',
            'sublinks': [
                    { 'name': 'Gogoro Plus / Gogoro', 'url': urls.wwwGogoroUrl + 'smartscooter/faster' },
                    { 'name': 'Gogoro Lite', 'url': urls.wwwGogoroUrl + 'gogorolite' },
                    { 'name': 'Comparison', 'url': urls.wwwGogoroUrl + 'smartscooter/specs' }
                ],
            },
            {
            'name': 'Gogoro® Energy Network',
            'url': '#',
            'sublinks': [
                    { 'name': 'Energy Network', 'url': urls.wwwGogoroUrl + 'gen' },
                    { 'name': 'GoStation®', 'url': urls.wwwGogoroUrl + 'gostation' },
                    { 'name': 'GoCharger™', 'url': urls.wwwGogoroUrl + 'gocharger' },
                    { 'name': 'OPEN Initiative', 'url': urls.wwwGogoroUrl + 'open' },
                ],
            },
            {
                'name': 'Story',
                'url': 'http://story.gogoro.com',
                'sublinks': [],
            },
            {
                'name': 'Buy',
                'url': 'http://store.gogoro.com/tw/store',
                'sublinks': [],
            }
        ],
        'zh-tw': [
        	{
        	'name': 'Smartscooter™',
        	'url': '#',
        	'sublinks': [
        	        { 'name': 'Gogoro Plus / Gogoro', 'url': urls.wwwGogoroUrl + 'smartscooter/faster' },
        	        { 'name': 'Gogoro Lite', 'url': urls.wwwGogoroUrl + 'gogorolite' },
        	        { 'name': '規格比較表', 'url': urls.wwwGogoroUrl + 'smartscooter/specs' }
        	    ],
        	},
        	{
        	'name': 'Gogoro® Energy Network',
        	'url': '#',
        	'sublinks': [
        	        { 'name': 'Energy Network', 'url': urls.wwwGogoroUrl + 'gen' },
        	        { 'name': 'GoStation®', 'url': urls.wwwGogoroUrl + 'gostation' },
        	        { 'name': 'GoCharger™', 'url': urls.wwwGogoroUrl + 'gocharger' },
        	        { 'name': 'OPEN Initiative', 'url': urls.wwwGogoroUrl + 'open' },
        	    ],
        	},
            {
                'name': 'Story',
                'url': 'http://story.gogoro.com',
                'sublinks': [],
            },
            {
                'name': '網路商店',
                'url': 'http://store.gogoro.com/tw/store',
                'sublinks': [],
            }
        ]
    };



    return {
        restrict: 'E',
        replace: true,
        templateUrl: templateUrl,
        link: function (scope, element, attrs) {

            scope.showSublinks = function (index, url) {
                if (url == '#' || url == '') {
                    scope.activeIndex = index;
                } else {
                    location.href = url;
                }
            }

            scope.currentNavbarName = currentNavbarName;
            scope.lang = lang;

            //根據不一樣的語系來顯示主連結內容
            scope.primaryLinks = primary[lang];
        },
    };
}]);


gogoroApp.directive('navbarLinkTarget', function () {
    function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 &&
            typeof match[2] === 'string' && match[2].length > 0) {
            return match[2].toLowerCase();
        }
        else {
            return null;
        }
    }
    function getDomain(url) {
        var hostName = getHostName(url);
        var domain = hostName;

        if (hostName != null) {
            var parts = hostName.split('.').reverse();

            if (parts != null && parts.length > 1) {
                domain = parts[1] + '.' + parts[0];

                if (hostName.toLowerCase().indexOf('.co.uk') != -1
                        && parts.length > 2) {
                    domain = parts[2] + '.' + domain;
                }
            }
        }

        return domain;
    }

    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            var hostname = getHostName(attrs.href);
            if (hostname === 'story.gogoro.com') {
                angular.element(element).prop('target','_blank');
            }
        },
    };
});