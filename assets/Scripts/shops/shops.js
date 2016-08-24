(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.FindUs = FindUs;

    var gmap;
    var geocoder;
    var marker = null;
    var icon_url = '//images.gogoroapp.com/book-a-ride/';
    var iconStoreOn = icon_url + "test-ride-store_on.png";
    var iconStoreOff = icon_url + "test-ride-store_off.png";
    var iconEventOn = icon_url + "test-ride-store_on.png";
    var iconEventOff = icon_url + "test-ride-store_off.png";

    function FindUs() {
        global.gogoro.common.gradientHeader();
        global.gogoro.common.socialShare();
        mapInitialize();

        $('.stoer-link a').click(function () {
            $('.stoer-link a').parent().removeClass("active");
            $(this).parent().addClass("active");
            setStoreInfo($(this).attr('data-id'));
        });
    }

    function mapInitialize() {

        var styles = [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#00d7ff" }, { "visibility": "off" }] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "saturation": "-100" }, { "visibility": "on" }, { "lightness": "0" }, { "gamma": "5" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f1f3f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "on" }, { "gamma": "3" }, { "saturation": "-100" }] }, { "featureType": "poi.business", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": "-100" }, { "hue": "#ff0000" }] }, { "featureType": "poi.business", "elementType": "labels.text.fill", "stylers": [{ "gamma": "2.11" }, { "saturation": "-100" }, { "weight": "0.01" }, { "visibility": "on" }] }, { "featureType": "poi.business", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#eaeaea" }] }, { "featureType": "poi.park", "elementType": "labels.text", "stylers": [{ "saturation": "-100" }] }, { "featureType": "poi.park", "elementType": "labels.icon", "stylers": [{ "saturation": "-100" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }, { "lightness": "50" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": "-100" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }, { "saturation": "-100" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "on" }, { "weight": "0.01" }, { "hue": "#00f1ff" }, { "saturation": "0" }, { "gamma": "1" }, { "lightness": "0" }] }, { "featureType": "transit", "elementType": "labels.text", "stylers": [{ "gamma": "1" }, { "saturation": "0" }] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "saturation": "0" }, { "visibility": "on" }, { "color": "#9b9b9b" }] }, { "featureType": "transit.line", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": "-100" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#85ecff" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "gamma": "1" }, { "saturation": "0" }] }];
        var styledMap = new google.maps.StyledMapType(styles, { name: "Gogoro Map" });
        geocoder = new google.maps.Geocoder();
        var mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng(25.032482147216797, 121.559104919433590),
            styles: styles
        };

        gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        setStoreInfo(0);
    }

    function setStoreInfo(sKey) {
        $('#stoer-name').html(store_data[sKey].name);
        $('#stoer-description').html(store_data[sKey].description);
        $('#stoer-open-time').html(store_data[sKey].open_time);
        $('#stoer-phone').html(store_data[sKey].phone);
        $('#stoer-address').html(store_data[sKey].address);
        $('#store-image').attr("src", store_data[sKey].image);
        $('#store-icon').html(store_data[sKey].icon);

        var longitude = store_data[sKey].longitude;
        var latitude = store_data[sKey].latitude;
        var myLatlng = new google.maps.LatLng(longitude,latitude );

        console.log(longitude + '-' + latitude);

        if (marker == null) {
            marker = new google.maps.Marker({
                icon: iconStoreOff,
                name: store_data[sKey].name,
                map: gmap,
                position: myLatlng
            });
        } else {
            marker.setPosition(myLatlng);
            //marker.position = results[0].geometry.location;
        }
        gmap.setCenter(myLatlng);

        //var address = store_data[sKey].address;
        //geocoder.geocode({ 'address': address }, function (results, status) {

        //    if (status == google.maps.GeocoderStatus.OK) {
        //        if (marker == null) {
        //            marker = new google.maps.Marker({
        //                icon: iconStoreOff,
        //                name: store_data[sKey].name,
        //                map: gmap,
        //                position: results[0].geometry.location
        //            });
        //        } else {
        //            marker.setPosition(results[0].geometry.location);
        //            //marker.position = results[0].geometry.location;
        //        }
        //        gmap.setCenter(results[0].geometry.location);

        //    } else {
        //        console.log('Geocode was not successful for the following reason: ' + status);
        //    }
        //});
    }
}(window.jQuery, window));