/*
Product 加入購物車
http://local-store.gogoro.com/tw/api/shopping-cart/add

購物車列表
http://local-store.gogoro.com/tw/api/shopping-cart/list

修改數量
http://local-store.gogoro.com/tw/api/shopping-cart/modify/{7202D57E-409A-47C6-986E-30E57F30414F}/{3}

刪除
http://local-store.gogoro.com/tw/api/shopping-cart/remove/{E16D0185-4F1B-45C3-A1AA-2A42C5B5C43F}

retail 購物車結帳
http://local-retail.gogoro.com/tw/api/order/create-quotation


###

Scooter 加入購物車
http://local-store.gogoro.com/tw/api/shopping-cart/add-scooter

 */
gogoroApp.factory('ShoppingCartService', ['$http', '$rootScope', 'GogoroUrlService', function ($http, $rootScope, GogoroUrlService) {

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

    //log('x---- Welcome to Gogoro Shopping Cart ----x');


    var global = {};

    var gogoroUrl = GogoroUrlService.gogoroUrlGenerate();
    //console.log('gogoroUrl', gogoroUrl);

    global.apiUrl = {};

    // store url
    global.apiUrl.add = gogoroUrl.storeGogoroUrl + "api/shopping-cart/add";
    global.apiUrl.list = gogoroUrl.storeGogoroUrl + "api/shopping-cart/list";
    global.apiUrl.modify = gogoroUrl.storeGogoroUrl + "api/shopping-cart/modify";
    global.apiUrl.remove = gogoroUrl.storeGogoroUrl + "api/shopping-cart/remove";
    global.apiUrl.removeScooter = gogoroUrl.storeGogoroUrl + "api/shopping-cart/remove-scooter";
    global.apiUrl.amount = gogoroUrl.storeGogoroUrl + "api/shopping-cart/amount";
    global.apiUrl.addScooter = gogoroUrl.storeGogoroUrl + "api/shopping-cart/add-scooter";

    // retail url
    global.apiUrl.retailAdd  = gogoroUrl.retailGogoroUrl + "api/shopping-cart/add";
    global.apiUrl.retailList = gogoroUrl.retailGogoroUrl + "api/shopping-cart/list";
    global.apiUrl.retailModify = gogoroUrl.retailGogoroUrl + "api/shopping-cart/modify";
    global.apiUrl.retailRemove = gogoroUrl.retailGogoroUrl + "api/shopping-cart/remove";
    global.apiUrl.retailAmount = gogoroUrl.retailGogoroUrl + "api/shopping-cart/amount";
    global.apiUrl.retailQuotation = gogoroUrl.retailGogoroUrl + "api/order/create-quotation";
    global.apiUrl.retailAddScooter = gogoroUrl.retailGogoroUrl + "api/shopping-cart/add-scooter";

    // 將使用者所選的産品加入購物車
    addProduct = function (data) {

        var url = global.apiUrl.add;
        var method = 'POST';

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            data: JSON.stringify(data),
            dataType: "json",
            url: url
        }).then(function (result) {
            return result.data;
        });
    }

    // 將使用者所選的産品加入購物車
    retialAddProduct = function (data) {

        var url = global.apiUrl.retailAdd;
        var method = 'POST';

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            data: JSON.stringify(data),
            dataType: "json",
            url: url
        }).then(function (result) {
            return result.data;
        });

    }

    // 將使用者所選的Scooter加入購物車
    addScooter = function (data) {

        if (gogoroUrl.subdomain === 'store') {
            var url = global.apiUrl.addScooter;
        } else {
            var url = global.apiUrl.retailAddScooter;
        }

        var method = 'POST';


        var postData = angular.toJson(data);

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            data: { JsonData: postData },
            url: url,
            dataType: "json",
        }).then(function (result) {
            return result.data;
        });
    }

    // retail create quotation
    getRetailQuotation = function () {

        var url = global.apiUrl.retailQuotation;
        var method = 'POST';

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            dataType: "json",
            url: url
        }).then(function (result) {
            return result.data;
        });

    }

    // 取得購物車所有資料
    getShoppingCartProducts = function () {

        if (gogoroUrl.subdomain === 'store') {
            var url = global.apiUrl.list;
        } else {
            var url = global.apiUrl.retailList;
        }
        
        var method = 'POST';

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            dataType: "json",
            url: url
        }).then(function (result) {
            return result.data;
        });
    }

    // 修改數量
    modifyShoppingCartProductAmount = function (data) {

        if (gogoroUrl.subdomain === 'store') {
            var url = global.apiUrl.modify + "/" + data.id + "/" + data.quantity;
        } else {
            var url = global.apiUrl.retailModify + "/" + data.id + "/" + data.quantity;
        }

        //log("modifyShoppingCartProductAmount", url);
        var method = 'get';

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            dataType: "json",
            url: url
        }).then(function (result) {
            return result.data;
        });
    }

    // 刪除
    removeProduct = function (data) {

        if (gogoroUrl.subdomain === 'store') {
            var url = global.apiUrl.remove + "/" + data.id;
        } else {
            var url = global.apiUrl.retailRemove + "/" + data.id;
        }

        //log("removeProduct", url);
        var method = 'get';

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            dataType: "json",
            url: url
        }).then(function (result) {
            return result.data;
        });
    }

    // 取得目前購物車的數量
    getShoppingCartAmount = function () {

        if (gogoroUrl.subdomain === 'store') {
            var url = global.apiUrl.amount;
        } else {
            var url = global.apiUrl.retailAmount;
        }

        var method = 'POST';

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            dataType: "json",
            url: url
        }).then(function (result) {
            return result.data;
        });

    }

    // Remove scooter
    removeScooter = function () {

        var url = global.apiUrl.removeScooter;

        //log("removeProduct", url);
        var method = 'get';

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's 
        //callback argument, we can return that.
        return $http({
            method: method,
            dataType: "json",
            url: url
        }).then(function (result) {
            return result.data;
        });
    }

    return {
        init: function () {

        },
        addProduct: addProduct,
        getShoppingCartAmount: getShoppingCartAmount,
        getShoppingCartProducts: getShoppingCartProducts,
        modifyShoppingCartProductAmount: modifyShoppingCartProductAmount,
        removeProduct: removeProduct,
        removeScooter:removeScooter,
        retialAddProduct: retialAddProduct,
        getRetailQuotation: getRetailQuotation,
        addScooter: addScooter
    };
}]);