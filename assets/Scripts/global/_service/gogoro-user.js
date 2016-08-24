gogoroApp.factory('GogoroUserService', ['$http', '$rootScope', "localStorageService", 'ipCookie', '$timeout', '$location', 'ShoppingCartService', function ($http, $rootScope, localStorageService, ipCookie, $timeout, $location, ShoppingCartService) {

    // referrerUrl 

    // debug log
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
    global.login = 'Login';
    global.name = 'Name';
    global.picture = 'Picture';

    //
    init = function () {

        //
        getLoginUser();

        //
        getRetail();

        //
        if (isCookieSupported()) {

        } else {
            // Alert user that His browser's cookie is disabled. 
            alertCookieDisableMessage();
            // set isCookieEnabled to false
            $rootScope.loginUser.isCookieEnabled = false;
        }
    }

    //


    //
    getReferrerUrl = function () {

    }

    //
    setCurrentUrlAsReferrerUrl = function () {
        ipCookie('ReferrerUrl', $location.$$absUrl, { path: '/', domain: 'gogoro.com' });
        //log('');
        //log('------ setCurrentUrlAsReferrerUrl ------');
        //log("ipCookie('ReferrerUrl')", ipCookie('ReferrerUrl'));
    }

    //
    setReferrerUrl = function (url) {
        if (angular.isUndefined(url)){
            url = $rootScope.gogoro.storeGogoroUrl;
        }

        ipCookie('ReferrerUrl', url, { path: '/', domain: 'gogoro.com' });
    }

    // get login user info
    getLoginUser = function () {

        // default image for login image display at header
        var userDefaultAvatar = '//images.gogoroapp.com/my-gogoro/profile_pic_default.jpg';

        $rootScope.loginUser = {};
        $rootScope.loginUser.isCookieEnabled = true;
        $rootScope.loginUser.showShoppingCart = false;

        //
        switch($rootScope.gogoro.status) {
            case 'local':
                global.login = 'LocalLogin';
                global.name = 'LocalName';
                global.picture = 'LocalPicture';
                break;
            case 'dev':
                global.login = 'DevLogin';
                global.name = 'DevName';
                global.picture = 'DevPicture';
                break;            
        }

        //
       
        if (typeof ipCookie(global.name) === 'undefined' || $.isNumeric(ipCookie(global.name)) === true) {
            $rootScope.loginUser.name = '';
        } else {
            $rootScope.loginUser.name = ipCookie(global.name).replace(/\+/g, ' ');
        }
       
        //
        $rootScope.loginUser.picture = (typeof ipCookie(global.picture) === 'undefined' || ipCookie(global.picture) == '') ? userDefaultAvatar : ipCookie(global.picture);

        //
        if (angular.isUndefined(ipCookie(global.login))) {
            $rootScope.loginUser.isUserLogin = false;
        } else if (parseInt(ipCookie(global.login)) === 0) {
            $rootScope.loginUser.isUserLogin = false;
        } else {
            $rootScope.loginUser.isUserLogin = true;
        }

        //
        if ($rootScope.loginUser.isUserLogin) {

           
            if ($rootScope.gogoro.subdomain === 'store') {

                // 取得目前購物車的數量
                ShoppingCartService.getShoppingCartAmount().then(function (data) {
                    if (data.Result === 1) {
                        $rootScope.loginUser.cartAmount = data.Data
                        //log("$rootScope.loginUser.cartAmount", $rootScope.loginUser.cartAmount);
                    } else {

                    }
                });

                // 取得購物車所有資料
                ShoppingCartService.getShoppingCartProducts().then(function (data) {
                    if (data.Result === 1) {
                        //
                        updateProductAndScooterAmount(data);
                        //
                        handleHeaderShoppingCartText();
                    } else {

                    }
                });
            }
        }
        
        log('');
        log('login user information', $rootScope.loginUser);
    }

    /**
     * @description update product and scooter amount. 
     * @param data (from getShoppingCartProducts())
     */
    updateProductAndScooterAmount = function (data) {
        //$rootScope.loginUser.cartAmount = data.Data
        $rootScope.loginUser.shoppingCartProductAmount = data.Data.Product.length;
        $rootScope.loginUser.shoppingCartScooterAmount = data.Data.Scooter.length;
        if (data.Data.Product.length > 0 || data.Data.Scooter.length > 0) {
            $rootScope.loginUser.showShoppingCart = true;
        } else {
            $rootScope.loginUser.showShoppingCart = false;
        }
    }


    /*
    |--------------------------------------------------------------------------
    | 處理 header 購物車數量如何顯示
    |--------------------------------------------------------------------------
    | 當産品數量和Scooter數量都是0時 -> 顯示 0
    | 當産品數量 >１－＞　顯示産品數量
    | 當産品數量＝０而Scooter數量>0時　－＞　顯示GO
    */
    handleHeaderShoppingCartText = function () {

        //console.log('$rootScope.loginUser.shoppingCartProductAmount', $rootScope.loginUser.shoppingCartProductAmount);
        //console.log('$rootScope.loginUser.shoppingCartScooterAmount', $rootScope.loginUser.shoppingCartScooterAmount);
        if ($rootScope.loginUser.shoppingCartProductAmount == 0 && $rootScope.loginUser.shoppingCartScooterAmount == 0) {
            // 顯示 0
            //console.log('1 display product number');
            $rootScope.shoppingCartDisplayProductNumber = true;
        } else if ($rootScope.loginUser.shoppingCartProductAmount > 0) {
            // 顯示産品數量
            $rootScope.shoppingCartDisplayProductNumber = true;
            //console.log('2 display product number');
        } else if ($rootScope.loginUser.shoppingCartProductAmount == 0 && $rootScope.loginUser.shoppingCartScooterAmount > 0) {
            //顯示GO
            $rootScope.shoppingCartDisplayProductNumber = false;
            //console.log('display GO');
        }
        //console.log('');
    }

    getRetail = function () {

        $rootScope.retail = {};

        if ($rootScope.gogoro.subdomain === 'retail') {

            // 取得目前購物車的數量
            ShoppingCartService.getShoppingCartAmount().then(function (data) {
                if (data.Result === 1) {
                    $rootScope.retail.cartAmount = data.Data
                    //log("$rootScope.retail.cartAmount", $rootScope.retail.cartAmount);
                } else {

                }
            });
        }

    }

    // watch shopping cart 數量的變化
    $rootScope.$watch(
        function () { return $rootScope.loginUser.cartAmount },
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                //log('cartAmount newValue', newValue);
                //log('cartAmount oldValue', oldValue);
            }
        }
    );

    // Check if browser's cookie is disabled. 
    isCookieSupported = function () {
        //if (localStorageService.cookie.isSupported) {
        //    return true;
        //} else {
        //    return false;
        //}

        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    }

    // Alert user that His browser's cookie is disabled. 
    alertCookieDisableMessage = function (delay) {
        delay = typeof delay !== 'undefined' ? delay : 1000;
        $timeout(function () {
            swal({
                title: "提醒",
                text: '你的瀏覽器已停用 <span class="graphik-light" >Cookie</span> ，為了獲得更完整資訊及完成購買，請啟用 Cookie功能。'
            });
        }, delay);
    }
    
    /*
     *  When user click on Scooter's checkout(結帳)
     *  and if user is not login, saved the scooter data to cookie
     *  so when user login back, can see the same selections.  
     */
    setCookieScooter = function (data) {
        ipCookie('scooter', data, { path: '/', domain: 'gogoro.com' });
    }

    getCookieScooter = function () {
        return ipCookie('scooter');
    }

    return {
        init: function () {
            init();
        },
        alertCookieDisableMessage: alertCookieDisableMessage,
        setCurrentUrlAsReferrerUrl: setCurrentUrlAsReferrerUrl,
        setReferrerUrl: setReferrerUrl,
        setCookieScooter: setCookieScooter,
        getCookieScooter: getCookieScooter,
        updateProductAndScooterAmount: updateProductAndScooterAmount
    };

}])
.directive('referrerUrl', ["$location", "ipCookie", function ($location, ipCookie) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope,element,attributs) {
            element.on('click', function (e) {
                //e.preventDefault();
                //console.log('$location.absUrl()', $location.absUrl());
                ipCookie('ReferrerUrl', $location.absUrl(), { path: '/', domain: 'gogoro.com' });
            });
        }
    }
}]);