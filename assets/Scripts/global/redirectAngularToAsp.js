
/*
|--------------------------------------------------------------------------
| Redirect angular's url, example (http://www.example.com/#/faster) to http://www.example.com/smartscooter 
|--------------------------------------------------------------------------  
| Reference
| http://www.rapidtables.com/web/dev/url-redirect.htm#javascript-redirect
www.gogoro.com/#/faster
*/
var RedirectAngularUrl = (function ($) {
    'use strict';

    function Redirect() {
        var self = this;
    }

    Redirect.controller_name = {
        0: "smartscooter"
    };

    Redirect.getWindowLocationHash = function () {

        if (window.location.hash) {
            // location.hash exists
            return window.location.hash;
        } else {
            // location.hash doesn't exist
            return false;
        }

    };

    Redirect.UrlRedirect = function () {
        var self = this;
        
        // check host name
        //if (window.location.host === "www.gogoro.com") {
        //    var domain_name = '//www.gogoro.com';
        //} else {
        //    var domain_name = '//localhost.gogoro.com';
        //}

        var domain_name = '//' + window.location.host;

        // chech if url has hash in it
        if (self.getWindowLocationHash() !== false) {
            var hash = Redirect.getWindowLocationHash();
            hash = hash.toLowerCase();

            switch (hash) {
                case '#/faster':
                    window.location.replace(domain_name + "/" + self.controller_name[0]);
                    break;
                case '#/smarter':
                    window.location.replace(domain_name + "/" + self.controller_name[0] + "/smarter");
                    break;
                case '#/easier':
                    window.location.replace(domain_name + "/" + self.controller_name[0] + "/easier");
                    break;
                case '#/customize':
                    window.location.replace(domain_name + "/" + self.controller_name[0] + "/customize");
                    break;
                default:
                    window.location.replace(domain_name + "/");
            }
        }

    };

    return {
        init: function () {
            Redirect.UrlRedirect();
        }
    };

}(window.jQuery, window));

RedirectAngularUrl.init();