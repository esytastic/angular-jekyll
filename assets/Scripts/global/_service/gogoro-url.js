gogoroApp.factory('GogoroUrlService', ['$http', '$rootScope', '$location', function ($http, $rootScope, $location) {
    // debug logo
    var debug = true;
    log = function (subject, val) {
        if (debug) {
            if (angular.isDefined(val)) {
                console.log(subject, val);
            } else {
                console.log(subject);
            }
        }
    }

    var global = {};
    global.hostnameSplited = window.location.hostname.split('-');

    global.gogoro = {};

    gogoroUrlGenerate = function () {

        var langPrefix = '';
        switch (gogoro.Locale.lang) {
            case 'en-tw':
                langPrefix = '/tw/en/';
                break;
            case 'zh-tw':
                langPrefix = '/tw/';
                break;
            default:
                langPrefix = '/';
        }

        switch (global.hostnameSplited[0]) {
            case 'gogoro':
                global.gogoro.status = 'production';
                global.gogoro.myGogoroUrl = '//gogoro-website.s3-website-ap-northeast-1.amazonaws.com' + langPrefix;
                global.gogoro.storeGogoroUrl = '//store.gogoro.com' + langPrefix;
                global.gogoro.wwwGogoroUrl = '//gogoro-website.s3-website-ap-northeast-1.amazonaws.com' + langPrefix;
            break;
            case 'website.gogoroapp.com':
                global.gogoro.status = 'production';
                global.gogoro.myGogoroUrl = '//website.gogoroapp.com' + langPrefix;
                global.gogoro.storeGogoroUrl = '//store.gogoro.com' + langPrefix;
                global.gogoro.wwwGogoroUrl = '//website.gogoroapp.com' + langPrefix;
            break;
            case 'localhost':
            case 'www.localhost':
                global.gogoro.status = 'production';
                global.gogoro.myGogoroUrl = '//localhost:4000' + langPrefix;
                global.gogoro.storeGogoroUrl = '//store.gogoro.com' + langPrefix;
                global.gogoro.wwwGogoroUrl = '//localhost:4000' + langPrefix;
            break;
            case 'ggrweb':
                global.gogoro.status = 'production';
                global.gogoro.myGogoroUrl = '//ggrweb-dev.roamandwander.com' + langPrefix;
                global.gogoro.storeGogoroUrl = '//store.gogoro.com' + langPrefix;
                global.gogoro.wwwGogoroUrl = '//ggrweb-dev.roamandwander.com' + langPrefix;
            break;
            case 'ggrweb.s3':
                global.gogoro.status = 'production';
                global.gogoro.myGogoroUrl = '//ggrweb.s3-website-ap-northeast-1.amazonaws.com' + langPrefix;
                global.gogoro.storeGogoroUrl = '//store.gogoro.com' + langPrefix;
                global.gogoro.wwwGogoroUrl = '//ggrweb.s3-website-ap-northeast-1.amazonaws.com' + langPrefix;
            break;
            case 'd2xbu33gz3yff1.cloudfront.net':
                global.gogoro.status = 'production';
                global.gogoro.myGogoroUrl = '//d2xbu33gz3yff1.cloudfront.net' + langPrefix;
                global.gogoro.storeGogoroUrl = '//store.gogoro.com' + langPrefix;
                global.gogoro.wwwGogoroUrl = '//d2xbu33gz3yff1.cloudfront.net' + langPrefix;
            break;
            case 'local':
                global.gogoro.status = 'local';
                global.gogoro.myGogoroUrl = '//local-my.gogoro.com' + langPrefix;
                global.gogoro.storeGogoroUrl = '//local-store.gogoro.com' + langPrefix;

                if (global.hostnameSplited[1] === 'www') {
                    global.gogoro.wwwGogoroUrl = '//local-www.gogoro.com' + langPrefix;
                } else {
                    global.gogoro.wwwGogoroUrl = '//local-vendor-www.gogoro.com' + langPrefix;
                }

                break;
            case 'dev':
                global.gogoro.status = 'dev';
                global.gogoro.myGogoroUrl = '//dev-my.gogoro.com' + langPrefix;
                global.gogoro.storeGogoroUrl = '//dev-store.gogoro.com' + langPrefix;
                global.gogoro.wwwGogoroUrl = '//dev-www.gogoro.com' + langPrefix;
                break;
            default:
                global.gogoro.status = 'production';
                global.gogoro.myGogoroUrl = '//my.gogoro.com' + langPrefix;
                global.gogoro.storeGogoroUrl = '//store.gogoro.com' + langPrefix;
                global.gogoro.wwwGogoroUrl = '//www.gogoro.com' + langPrefix;
                break;
        }

        //
        global.gogoro.subdomain = getSubdomain();
        //console.log('global.gogoro.subdomain', global.gogoro.subdomain);

        return global.gogoro;
    }

    // get current submain . e.g. www or my or store or retail
    getSubdomain = function () {
        var hostname = window.location.hostname;
        var hostnameSplite = hostname.split('.')[0];
        var subdomain = '';

        //
        if (global.gogoro.status == 'local' || global.gogoro.status == 'dev') {
            subdomain = hostnameSplite.split('-')[1];
        } else {
            subdomain = hostnameSplite;
        }

        return subdomain;
    }


    // get current submain . e.g. www or my or store or retail
    getResourcesFolderName = function () {
        var urls = gogoroUrlGenerate();
        // 不一樣的subdoamin的讀取路徑會有所不同
        var directory_prefix = '';

        return directory_prefix;
    }

    /**
       get current controller and action name from url
       example:
             {controller: "/", action: ""} // home page
             {controller: "smartscooter", action: "faster"}
    **/
    getCurrentPageName = function ()
    {
        var lang = gogoro.Locale.lang; // en(全球網站), en-tw(台灣英文), zh-tw(台灣中文)
        var index = 0;
        var result = {};
        var controller, action;

        var urlString = $location.absUrl();

        //var urlString = "http://local-www.gogoro.com/tw/en/"
        //var urlString = "http://local-www.gogoro.com/tw"
        //var urlString = "http://local-www.gogoro.com/"

        var urlSplit = urlString.split("/");

        switch (lang) {
            case 'en':
                index = 3;
                break;
            case 'en-tw':
                index = 5;
                break;
            case 'zh-tw':
                index = 4;
                break;
        }

        if (urlSplit[index] !== '' && angular.isDefined(urlSplit[index]) === true) {
            controller = urlSplit[index];
        } else {
            controller = '/';
        }

        action = (controller === '/') ? '' : urlSplit[index+1];

        //console.log('');
        //console.log(urlSplit);
        //console.log(controller);
        //console.log(action);
        //console.log(index);
        //console.log('');

        //
        result.controller = controller;
        result.action = action;

        return result;
    }

    return {
        init: function () {
            getSubdomain();
        },
        gogoroUrlGenerate: gogoroUrlGenerate,
        getResourcesFolderName: getResourcesFolderName,
        getCurrentPageName: getCurrentPageName,
        getSubdomain: getSubdomain
    };
}]);
