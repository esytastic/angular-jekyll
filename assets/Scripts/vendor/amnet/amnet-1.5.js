/*
    AMNET Tracking JavaScript V1.4

    <script src="js/amnet.js" type="text/javascript"></script>
    PS: 請放在</body>之前

    Page Tracking:
        amnet('提供商名稱', 'page', 參數, ...);

        各提供商參數順序:
            amnet('turn'        , 'page', b2);
            amnet('doubleclick' , 'page', src, cat, type);
            amnet('clickforce'  , 'page', r);
            amnet('fb'          , 'page', addPixelId);
            amnet('scupio'      , 'page', mid, pid, _bwp, _bwpid);
            amnet('adwords'     , 'page', google_conversion_id[int], google_remarketing_only[bool]);
            amnet('appier'      , 'page', id, site);
            amnet('yahoo'       , 'page', projectId, coloId, pixelId);

    Event Tracking:
        amnet('提供商名稱', 'event', 參數, ...);

        各提供商參數順序:
            amnet('turn'        , 'event', b2);
            amnet('doubleclick' , 'event', src, cat, type);
            amnet('clickforce'  , 'event', cr_id);
            amnet('fb'          , 'event', eventName);
            amnet('scupio'      , 'event', _bwp, _bwpid2);
            amnet('adwords'     , 'event', google_conversion_id[int], google_conversion_language, google_conversion_format, google_conversion_color, google_conversion_label, google_remarketing_only[bool]);
            amnet('appier'      , 'event', action_id, unique_key(string), track_id);
            amnet('yahoo'       , 'event', projectId, coloId, pixelId);
*/

(function (window) {
    var pixels = {}, amnet = window.amnet = window.amnet || function (s, c) {
        pixels[s] && pixels[s][c] && pixels[s][c].apply(pixels[s], Array.prototype.slice.call(arguments, 2));
    };

    function createImage(url) {
        var img = document.createElement('img');
        img.src = url;
        img.setAttribute('style', 'display:none; width:0px; height:0px;');
        img.setAttribute('border', '0');
        document.getElementsByTagName('body')[0].appendChild(img);
    }

    function createScript(url, async, text) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        if (async) script.async = true;
        if (url) script.src = url;
        if (text) script.text = text;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
    }

    function appendScriptToBody(url, async, text) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        if (async) script.async = true;
        if (url) script.src = url;
        if (text) script.text = text;
        document.getElementsByTagName('body')[0].appendChild(script);
    }

    //#region pixel-TURN
    pixels['turn'] = new (function () {
        function _send(b2) {
            createImage('//r.turn.com/r/beacon?b2=' + b2 + '&cid=');
        }

        this.event = this.page = _send;
    })();
    //#endregion

    //#region pixel-doubleclick
    pixels['doubleclick'] = new (function () {
        function _send(src, cat, type) {
            if (!!!type) type = 'invmedia';
            createImage('//ad.doubleclick.net/activity;src=' + src + ';type=' + type + ';cat=' + cat + ';ord=' + ((Math.random() + "") * 10000000000000) + '?');
        }

        this.event = this.page = _send;
    })();
    //#endregion

    //#region pixel-clickforce
    pixels['clickforce'] = new (function () {
        this.page = function (r) {
            createScript('//ads.doublemax.net/delivery/?event&r=' + r);
            createScript('//eland.doublemax.net/cfdmp/reviewreceiver?r=' + r);
        }

        this.event = function (cr_id) {
            createScript('//dsp-admin.doublemax.net/adx/crTrans.js?cr_id=' + cr_id);
        }
    })();
    //#endregion

    //#region FB
    pixels['fb'] = new (function () {
        var _loaded = false;
        function _init() {
            if (!_loaded) {
                var fbq = window.fbq = function () {
                    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
                };
                window._fbq = fbq;
                fbq.push = fbq;
                fbq.loaded = !0;
                fbq.version = '2.0';
                fbq.queue = [];
                createScript('//connect.facebook.net/en_US/fbevents.js', true);
                _loaded = true;
            }
        }

        this.page = function (addPixelId) {
            _init();

            var fbq = window.fbq = window.fbq || [];
            fbq('init', addPixelId);
            fbq('track', 'PageView');
        }

        this.event = function (eventName) {
            _init();

            var fbq = window.fbq = window.fbq || [];
            if (eventName)
                fbq('track', eventName);
        }
    })();
    //#endregion

    //#region Scupio
    pixels['scupio'] = new (function () {
        this.page = function (mid, pid, _bwp, _bwpid) {
            window.$ = window.$ || {}; window.$.blockUI = true;
            createScript('//rec.scupio.com/recweb/js/rec.js', false, '{"mid":' + mid + ',"pid":"' + pid + '"}');
            window._bwp = _bwp;
            window._bwpid = _bwpid;
            createScript('//adsense.scupio.com/conv/js/conv.js');
            createScript('//adsense.scupio.com/conv/js/convbtn.js');
        }

        this.event = function (_bwp, _bwpid2, callback) {
            window._bwp = _bwp;
            window._bwpid2 = _bwpid2;
            bw_conv(callback);
        }
    })();
    //#endregion

    //#region Adwords
    pixels['adwords'] = new (function () {
        var key = 'adwords' + (~ ~(Math.random() * 1000));

        this.page = function (google_conversion_id, google_remarketing_only, google_custom_params) {
            window['google_conversion_id'] = google_conversion_id;
            window['google_remarketing_only'] = google_remarketing_only;
            window['google_custom_params'] = google_custom_params || window.google_tag_params;
            var path = location.href.substr(0, location.href.lastIndexOf('/') + 1) + key + '_' + location.href.substr(location.href.lastIndexOf('/') + 1);
            document.write(
                '<div style="display:none;">' +
                '<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>' +
                '<iframe id="' + key + '" src="' + path + '"></iframe>' +
                '</div>'
            );
        }

        this.event = function (google_conversion_id, google_conversion_language, google_conversion_format, google_conversion_color, google_conversion_label, google_remarketing_only) {
            var html =
                '<html><body>' +
                '<script type="text/javascript">' +
                '/* <![CDATA[ */' +
                'var google_conversion_id = ' + google_conversion_id + ';' +
                'var google_conversion_language = "' + google_conversion_language + '";' +
                'var google_conversion_format = "' + google_conversion_format + '";' +
                'var google_conversion_color = "' + google_conversion_color + '";' +
                'var google_conversion_label = "' + google_conversion_label + '";' +
                'var google_remarketing_only = ' + google_remarketing_only + ';' +
                '/* ]]> */' +
                '</script>' +
                '<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>' +
                '</body></html>'
                ;

            document.getElementById(key) && (function () {
                document.getElementById(key).contentDocument.write(html);
            })();
        }
    })();
    //#endregion

    //#region Appier
    pixels['appier'] = new (function () {
        var loaded = false;
        function _init() {
            if (!loaded) {
                createScript('//d17m68fovwmgxj.cloudfront.net/js/appier-track-v1.7.js');
                loaded = true;
            }
        }

        this.page = function (id, site) {
            (function (w, d, s, m) {
                var f = d.getElementsByTagName('script')[0],
                     j = d.createElement('script'),
                     ns = 'APPIER_RETARGET';
                w._appierSendQueue = [];
                w['appierRetargetJson'] = { id: s, site: m };
                j.async = true;
                j.src = '//d17m68fovwmgxj.cloudfront.net/js/rt/track.js';
                f.parentNode.insertBefore(j, f);
                !w[ns] && (w[ns] = {});
                (!w[ns].send) && (w[ns].send = function (j) {
                    w._appierSendQueue.push(j);
                });
            })(window, document, id, site);

            _init();
        }

        this.event = function (action_id, unique_key, track_id) {
            _init();
            setTimeout(function () {
                window['Appier'] && window['Appier'].appierTrack(action_id, { unique_key: unique_key }, track_id);
            }, window['Appier'] ? 0 : 350);
        }
    })();
    //#endregion

    //#region Yahoo
    pixels['yahoo'] = new (function () {
        var loaded = false;
        function _init() {
            if (!loaded) {
                createScript('https://s.yimg.com/wi/ytc.js');
                loaded = true;
            }
        }

        function _send(projectId, coloId, pixelId) {
            _init();
            setTimeout(function () {
                window['YAHOO'] && window['YAHOO'].ywa.I13N.fireBeacon([{
                    "projectId": projectId,
                    "coloId": coloId,
                    "properties": {
                        //"documentName" : "",
                        "pixelId": pixelId,
                        "qstrings": {}
                    }
                }]);
            }, window['YAHOO'] ? 0 : 350);
        }

        this.event = this.page = _send;
    })();
    //#endregion

})(window);


