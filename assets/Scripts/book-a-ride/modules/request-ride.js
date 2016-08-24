gogoroApp.controller('RequestRideController', ["$scope", "$element", "FallbackManagerFactory", "$rootScope", "BookRideService", function ($scope, $element, FallbackManagerFactory, $rootScope, BookRideService) {
    angular.extend($scope, FallbackManagerFactory);
    var self = this;
    $scope.dataSaved = [];// store user selected information
    var debug = true;
    /**
      開始日期?今天開始加30天
      時間形態?30分鐘一場或早上下午  
    - 11點至下午5點30? 是否全部場地都一樣?

     "types": 1 // 1:store 2:event
     "can_sign_up": 12 // 可以報名的人數

     submit: id, date, types, time
    **/




    //
    if (Modernizr.localstorage) {
        // window.localStorage is available!
    } else {
        // no native support for local storage :( try a fallback or another third-party solution
        console.info('no native support for local storage :( try a fallback or another third-party solution');
    }

    self.calendarTimes = [];

    $scope.standard = {
        init: function () {

            // initial variables
            var viewPortHeight = viewportSize.getHeight();
            var $elm = $($element);

            var $mapWapper = $elm.find('#map');
            var $calendarWrapper = $elm.find('#calendar');

            var Booking = BookRideService;
            var numOfListItems = 0;
            var itemHeight = 80;
            var $listWrap = $elm.find('.list-wrap');
            var listWrapHeight = $listWrap.height();
            var $list = $listWrap.find('.list');
            var $listBtns = $elm.find('.list-btns');
            var $elmCalendar = $elm.find('.calendar');
            var $elmCalendarContainer = $elmCalendar.find('.container');

            var listBtnsHeight = $listBtns.height();
            var listViewArea = listWrapHeight - listBtnsHeight;
            var listMovementSpeed = 80;
            var listMovementDuration = 200;
            var negativeMaxUpMargins = 0;
            var language = gogoro.Locale.lang;
            var $linkShowMore = $elm.find('.show-more');
            var $btnNextStep = $elm.find('.next-step');
            var numOfDays = 14;
            self.limit = numOfDays;

            // dashboard 
            var $dashboardContainer = $elm.find('.dashboard');
            var $dashboardWrap = $elm.find('.dashboard-wrap');
            var $titleContainer = $elm.find('.title-container');
            var $infoContainer = $elm.find('.info-container');
            var $stepsContainer = $elm.find('.steps-container');

            // contact form wrap
            var $contactWrapper = $elm.find('.contact-wrap');

            // gogoro message box wrap
            var $gogoroMsgbox = $('.gogoro-msgbox');

            //Booking();//tw or en
            Booking.init(language);


            //// add dom listener to google map and load book ride schedules by ajax 
            //google.maps.event.addDomListener(window, 'load', function () {

            //    //make the ajax call to getAllFromAjax() and handle the promise returned;
            //    Booking.getAllFromAjax().then(function (data) {

            //        //this will execute when the AJAX call completes.
            //        self.remoteSchedules = data['data'];

            //        //
            //        if (self.remoteSchedules === null) {
            //            console.log('self.remoteSchedules', self.remoteSchedules);
            //            console.log('no data');
            //        } else {

            //            // assign data to LoadBookingSchedules service
            //            Booking.setRawData(self.remoteSchedules);

            //            // get avaiable schedules from service.
            //            $scope.lists = Booking.getAll();
            //            if (debug) {
            //                console.log('$scope.lists', $scope.lists);
            //            }

            //            //
            //            initEvents();
            //        }
            //    });
            //});

            // add dom listener to google map and load book ride schedules by ajax
            //gogoro.Loader.fullscreenStart();
            google.maps.event.addDomListener(window, 'load', function () {

                //make the ajax call to getScheduleFromAjax() and handle the promise returned;
                Booking.getStoreListFromAjax().then(function (data) {

                    //this will execute when the AJAX call completes.
                    if (data.result === 1) {

                        // rmove store
                        var filteredStore = [];
                        angular.forEach(data['data'], function (store) {
                            if (store['source_id'] !== 'ES313001') {
                                filteredStore.push(store);
                            }
                        });

                        // assign ajax data to local variable
                        self.remoteSchedules = filteredStore;

                        // assign data to BookRideService service
                        Booking.setRawData(self.remoteSchedules);

                        // get avaiable schedules from service.
                        $scope.lists = Booking.getAll();
                        if (debug) {
                            console.log("------ Total number of schedules ------");
                            console.log('$scope.lists', $scope.lists);
                            console.log("");
                        }

                        //
                        initEvents();

                    } else {
                        console.log('data.message', data.message);
                    }

                    setTimeout(function () {
                        // just font refresh
                        _jf.flush(); //內容變動後，呼叫此函數刷新字型
                        //setTimeout(function () {
                        //    gogoro.Loader.fullscreenStop();
                        //}, 250);
                    }, 250);

                });
            });

            function initEvents() {
                //
                numOfListItems = $scope.lists.length;
                if (numOfListItems < 5) {
                    $listBtns.hide();
                } else {
                    $listBtns.show();
                }

                // 
                setupListItemsForMovement();

                // Google map initialize and assign data (adddress,name) to it;
                mapInitialize($scope.lists);
            }


            /*
            |--------------------------------------------------------------------------
            | Google map
            |--------------------------------------------------------------------------
            
            https://maps.googleapis.com/maps/api/geocode/json?address=No. 20, Songshou Road, Xinyi District Taipei City, Taiwan 110

            */
            var gmap;
            var geocoder;
            var gmarkers = [];
            var icon_url = '//images.gogoroapp.com/icons/map/';
            var iconStoreOn = icon_url + "map_pin_on_big.png";
            var iconStoreOff = icon_url + "map_pin_off.png";
            var iconEventOn = icon_url + "map_event_pin_on_big.png";
            var iconEventOff = icon_url + "map_event_pin_off.png";
            //var chooseIcon = mapPaddleIconBase + "vm_icon_02.png";
            //var targetIcon = mapPaddleIconBase + "vm_icon_04.png";

            function mapInitialize(lists) {

                var styles = [{ "featureType": "all", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "lightness": "1" }] }, { "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "lightness": "100" }, { "saturation": "-100" }, { "gamma": "0.00" }, { "color": "#ffffff" }] }, { "featureType": "all", "elementType": "geometry.stroke", "stylers": [{ "lightness": "74" }, { "saturation": "-100" }, { "visibility": "simplified" }, { "hue": "#ff0000" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }, { "visibility": "off" }] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "saturation": "-100" }, { "visibility": "on" }, { "lightness": "0" }, { "gamma": "5" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#d5d5d5" }, { "saturation": "1" }, { "lightness": "80" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "saturation": "-100" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "gamma": "3" }, { "saturation": "-100" }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry.stroke", "stylers": [{ "lightness": "0" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "simplified" }, { "lightness": "0" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "hue": "#ff0000" }] }, { "featureType": "poi.business", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": "-100" }, { "hue": "#ff0000" }] }, { "featureType": "poi.business", "elementType": "geometry.fill", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "poi.business", "elementType": "geometry.stroke", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "poi.business", "elementType": "labels.text.fill", "stylers": [{ "gamma": "2.11" }, { "saturation": "-100" }, { "weight": "0.01" }, { "visibility": "off" }, { "lightness": "0" }] }, { "featureType": "poi.business", "elementType": "labels.icon", "stylers": [{ "lightness": "0" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#eaeaea" }] }, { "featureType": "poi.park", "elementType": "labels.text", "stylers": [{ "saturation": "-100" }] }, { "featureType": "poi.park", "elementType": "labels.icon", "stylers": [{ "saturation": "-100" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }, { "lightness": "55" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": "-100" }, { "lightness": "38" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }, { "saturation": "-100" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "visibility": "simplified" }, { "lightness": "0" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }, { "weight": "0.01" }, { "hue": "#00f1ff" }, { "saturation": "0" }, { "gamma": "1" }, { "lightness": "0" }] }, { "featureType": "transit", "elementType": "labels.text", "stylers": [{ "gamma": "1" }, { "saturation": "0" }] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "saturation": "0" }, { "color": "#9b9b9b" }] }, { "featureType": "transit.line", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#00d7ff" }, { "visibility": "on" }, { "lightness": "70" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "gamma": "1" }, { "saturation": "0" }] }];
                var styledMap = new google.maps.StyledMapType(styles, { name: "Gogoro Map" });

                geocoder = new google.maps.Geocoder();

                var mapOptions = {
                    zoom: 16,
                    center: new google.maps.LatLng(25.032482147216797, 121.559104919433590),
                    styles: styles
                };

                gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                $.each(lists, function (index, item) {
                    //console.log('item.id', item['id']);
                    //console.log('item.types', item['types']);
                    //console.log('item.english_name', item['english_name']);
                    //console.log('item.english_address', item['english_address']);

                    var address = item['chinese_address'];
                    var latitude = item['latitude'].split(',');
                    //console.log('latitude', latitude);

                    if (gogoro.Locale.lang === 'zh-tw') {
                        var name = item['chinese_name'];
                    } else {
                        var name = item['english_name'];
                    }

                    //  Creates a LatLng object representing a geographic point
                    var myLatlng = new google.maps.LatLng(latitude[0], latitude[1]);

                    //
                    var icon = itemTypeWithIcon(item['types'], "off");

                    //map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        icon: icon,
                        id: item['id'],
                        item_type: item['types'],
                        index: index,
                        name: name,
                        map: gmap,
                        position: myLatlng
                    });

                    gmarkers[index] = marker;

                    // add click event listener to each marker 
                    google.maps.event.addListener(marker, 'click', function () {
                        //console.log('marker', marker);
                        manageListClickActions(marker.index, marker.id, marker.type);
                    });

                }); // each

            }

            // remove selected icon form google map
            function mapRemoveSelectedIcon() {
                var icon;
                $.each(gmarkers, function (index, gmarker) {
                    icon = itemTypeWithIcon(gmarker.item_type, "off");
                    gmarker.setIcon(icon);
                });
            }

            // icon_mode = on or off
            function itemTypeWithIcon(item_type, icon_mode) {

                if (icon_mode == 'on') {
                    if (item_type == 1) {
                        var icon = iconStoreOn;
                    } else {
                        var icon = iconEventOn;
                    }
                } else {
                    if (item_type == 1) {
                        var icon = iconStoreOff;
                    } else {
                        var icon = iconEventOff;
                    }
                }

                return icon;
            }


            /*
            |--------------------------------------------------------------------------
            | set up for up and down arrows movement 
            |--------------------------------------------------------------------------
            */

            var setupListItemsForMovement = function () {

                //console.log("numOfListItems", numOfListItems);
                //console.log("itemHeight", itemHeight); // item box height: 80
                //console.log("listWrapHeight", listWrapHeight);//max height 420
                //console.log("listBtnsHeight", listBtnsHeight);//max height 70
                //console.log("listViewArea", listViewArea);//max viewable height 350

                var totalListDataHeight = numOfListItems * itemHeight;
                var maxUpMargins = totalListDataHeight - listViewArea;
                negativeMaxUpMargins = parseInt('-' + maxUpMargins);
            }

            // when user click on a list up or down arrow
            $scope.btnMoveList = function (mode) {
                if (mode === 'up') {
                    var prefix = "-=";
                } else {
                    var prefix = "+=";
                }

                var currentMarginTop = parseInt($list.css('marginTop'));

                // list down 
                if (mode === 'down' && currentMarginTop !== 0) {
                    $list.stop().velocity({ marginTop: prefix + listMovementSpeed + 'px' }, listMovementDuration, function () {
                        if (currentMarginTop > 0) {
                            $list.stop().velocity({ marginTop: '0px' }, listMovementDuration);
                        }
                    });
                }

                // list up
                if (mode === 'up' && currentMarginTop > negativeMaxUpMargins) {
                    $list.stop().velocity({ marginTop: prefix + listMovementSpeed + 'px' }, listMovementDuration, function () {
                        currentMarginTop = parseInt($list.css('marginTop'));
                        if (currentMarginTop < negativeMaxUpMargins) {
                            $list.stop().velocity({ marginTop: negativeMaxUpMargins + 'px' }, listMovementDuration);
                        }

                    });
                }
            }


            /*
            |--------------------------------------------------------------------------
            | click a list link 
            |--------------------------------------------------------------------------
            */

            $scope.counter = 0;

            // when user click on a item on the list. 
            $scope.displayScheduleList = function (index, id, type) {
                //console.log('index', index);
                //console.log('id', id);
                //console.log('type', type);
                $btnNextStep.hide();
                manageListClickActions(index, id, type);
            }

            function manageListClickActions(index, id, type) {
                var position = gmarkers[index].position;//latLng:LatLng|LatLngLiteral

                // google map : Changes the center of the map to the given LatLng.
                gmap.panTo(position);

                // set gmap zoom 
                gmap.setZoom(16);

                // google map : remove other selected icon
                mapRemoveSelectedIcon();

                // google map : set selected icon for this maker
                var icon = itemTypeWithIcon(gmarkers[index].item_type, "on");
                gmarkers[index].setIcon(icon);

                // HTML : set selected icon  
                var $link = $('.list_link');
                var $gicon = $('.mapicon');

                //
                resetListActiveStatus();

                //
                $gicon.eq(index).addClass('active');
                $link.eq(index).addClass('active');

                // display schedule list
                generateScheduleList(id, type);

                //
                var tempData = [];
                tempData.id = id;
                tempData.type = type;
                // assign value
                $scope.dashboardUpdate(1, tempData);

                // if a user click a list of item, then display show more link
                //$linkShowMore.show();
            }

            function resetListActiveStatus() {
                // HTML : set selected icon  
                var $link = $('.list_link');
                var $gicon = $('.mapicon');

                $gicon.removeClass('active');
                $link.removeClass('active');
            }

            function generateScheduleList(id, type) {

                // get location data by id
                self.location = Booking.getOne(id);
                if (debug) {
                    console.log("");
                    console.log("------ Current Selected Schedule (widthout time lines) ------");
                    console.log('self.location', self.location);
                }

                // Generate number of days to show
                //self.gDays = Booking.generateDays(numOfDays);
                //console.log('self.gDays', self.gDays);

                // Generate list of time in a day
                //self.gTimes = Booking.generateTimes();
                //console.log('self.gTimes', self.gTimes);

                // ajax request to service
                //gogoro.Loader.fullscreenStart();
                Booking.getScheduleByIdFromAjax(id).then(function (data) {
                    
                    if (debug) {
                        console.log('');
                        console.log("------ Get Current Schedule's time line By Id From Ajax ------");
                        console.log('getScheduleByIdFromAjax', data);
                    }
                    //this will execute when the AJAX call completes.
                    if (data.result === 1) {
                        // check type > 1:store 2:event
                        switch (self.location.types) {
                            case 1:
                                // store
                                self.schedules = Booking.generateSchedule(numOfDays, self.location, data.data);
                                break;
                            case 2:
                                // event
                                self.schedules = Booking.generateEventsSchedule(self.location, data.data);
                                break;
                        }

                        if (debug) {
                            console.log('');
                            console.log('------ Schedules for View ------');
                            console.log("self.schedules", self.schedules);
                        }

                        //  show calendar list             
                        $elmCalendarContainer.show();

                    } else {
                        console.log('data.message', data.message);
                    }

                    //
                    //gogoro.Loader.fullscreenStop();

                    // auto scrolling to timeline
                    $('html, body').animate({
                        scrollTop: $('#calendar').offset().top - 150
                    }, 1000);


                });

            }

            /*
            |--------------------------------------------------------------------------
            | show more 
            |--------------------------------------------------------------------------
            */


            $linkShowMore.on('click', function () {

                var remending = numOfDays - 5;

                switch ($scope.dataSaved.type) {
                    case 1:
                        self.limit = self.limit + remending;
                        break;
                    case 2:
                        // event
                        self.limit = self.limit + remending;
                        break;
                }

                $linkShowMore.hide();
            });

            /*
            |--------------------------------------------------------------------------
            | dropdown width types
            |--------------------------------------------------------------------------
            */

            // dropdown
            new DropDown($('#dropdown--location'));

            var $dropdownLocation = $('#dropdown--location');
            var $dropdownChoice = $dropdownLocation.find('span.choice');
            $dropdownLocation.find('a').on('click', function (e) {
                e.preventDefault();
                var name = $(this).data('name');
                var type = $(this).data('type');
                var text = $(this).text();

                // change display text 
                $dropdownChoice.text(text);

                //
                resetListActiveStatus();

                // change display data
                dropdownLocationInit(type);

                //              
                $elmCalendarContainer.hide();

            });

            // dropdown location 
            function dropdownLocationInit(type) {

                type = typeof type !== 'undefined' ? type : 0;

                // change display data
                switch (type) {
                    case 0:
                        $scope.$apply(function () {
                            $scope.lists = Booking.getAll();
                        });
                        break;
                    case 1:
                        $scope.$apply(function () {
                            $scope.lists = Booking.getAllByType(1);
                        });
                        break;
                    case 2:
                        $scope.$apply(function () {
                            $scope.lists = Booking.getAllByType(2);
                        });
                        break;
                }

                //
                initEvents();

                //
                $scope.reset();
            }

            /*
            |--------------------------------------------------------------------------
            | dropdown width month
            |--------------------------------------------------------------------------
            */

            // dropdown month
            new DropDown($('#dropdown--month'));


            /*
            |--------------------------------------------------------------------------
            | dashboard
            |--------------------------------------------------------------------------
            */
            $scope.dashboardUpdate = function (step, data) {

                switch (step) {
                    case 1:
                        $scope.dataSaved = [];
                        $scope.dataSaved.source_id = self.location.source_id;
                        $scope.dataSaved.type = data.type;

                        if (language === 'zh-tw') {
                            $scope.dataSaved.name = self.location.chinese_name;
                        } else {
                            $scope.dataSaved.name = self.location.english_name;
                        }

                        break;
                    case 2:
                        $scope.dataSaved.date = data.date;
                        $scope.dataSaved.time = data.time;

                        

                        if ($scope.dataSaved.type == 1) {
                            $scope.dataSaved.subject = Booking.getStoreTimeSubject(data.time);
                        }

                        if ($scope.dataSaved.type == 2) {
                            $scope.dataSaved.subject = Booking.getEventTimeSubject(data.time);
                        }
                        
                        //
                        var fulldate = new Date($scope.dataSaved.date);
                        var days = Booking.getArrayDays();

                        if (language === 'zh-tw') {
                            $scope.dataSaved.weekday = days.tw[fulldate.getDay()]; // Sunday...
                        } else {
                            $scope.dataSaved.weekday = days.en[fulldate.getDay()]; // Sunday...
                        }

                        // Show next button
                        $btnNextStep.show();

                        break;
                }

                // step update
                $scope.dashboardHtmlUpdate();

                //
                if (debug) {
                    console.log('');
                    console.log('------ Saved Data ------');
                    console.log('$scope.dataSaved', $scope.dataSaved);
                }

                //save data to service
                Booking.setSavedDataToService($scope.dataSaved);

                //
                setTimeout(function () {
                    _jf.flush(); //內容變動後，呼叫此函數刷新字型
                },50);
            }

            $scope.dashboardHtmlUpdate = function () {
                //var $titleContainer = $elm.find('.title-container');
                //var $infoContainer = $elm.find('.info-container');
                //var $stepsContainer = $elm.find('.steps-container');


                // $scope.dashboardShowInfo();
                $scope.dashboardShowStep();

            }


            $scope.dashboardShowInfo = function () {
                // hide title container
                $titleContainer.velocity({ opacity: 0 }, 0);
                $stepsContainer.velocity({ opacity: 0 }, 0);

                // change bg color to green
                $dashboardWrap.velocity({ backgroundColor: '#c0df16' }, 0);

                setTimeout(function () {

                    // show info container
                    $infoContainer.velocity({ opacity: 1 }, 500, function () {

                    });

                }, 500);
            }

            $scope.dashboardShowStep = function () {
                // hide title container
                $titleContainer.velocity({ opacity: 0 }, 0);
                $infoContainer.velocity({ opacity: 0 }, 0);

                // change bg color to green
                $dashboardWrap.velocity({ backgroundColor: '#323237' }, 0);

                setTimeout(function () {

                    // show info container
                    $stepsContainer.velocity({ opacity: 1 }, 500, function () {
                        
                    });

                }, 500);
            }



            $scope.dashboardResset = function () {
                $titleContainer.velocity({ opacity: 1 }, 0);
                $dashboardWrap.velocity({ backgroundColor: '#323237' }, 0);
                $infoContainer.velocity({ opacity: 0 }, 0);
                $stepsContainer.velocity({ opacity: 0 }, 0);
            }

            $('.dashboard-reset').on('click', function () {
                $scope.dashboardResset();
            });

            //  next to the contact form
            $btnNextStep.on('click', function (e) {
                e.preventDefault();

                //
                $mapWapper.hide();
                $calendarWrapper.hide();
                $contactWrapper.show();

                // scroll back to top of the window
                window.scrollTo(0, 0);

            });


            var $btnMsgboxClose = $('#btn-msgbox-close');
            // click to close gogoro message box             
            $btnMsgboxClose.on('click', function (e) {
                e.preventDefault();
                $mapWapper.show();
                $calendarWrapper.show();
                $contactWrapper.hide();
                $gogoroMsgbox.removeClass('active');

                // scroll back to top of the window
                window.scrollTo(0, 0);

                //
                $scope.reset();

            });


            $(window).resize(function () {

                $scope.reset();
            });


            // reset $scope.dataSaved
            $scope.reset = function () {
                //
                self.limit = 5;

                // 
                $scope.dataSaved = [];

                //
                $scope.dashboardResset();

                //
                resetListActiveStatus();

                //
                $elmCalendarContainer.hide();

                //
                initEvents();

            }



            // get clicked/selected location
            $scope.getSelectLocation = function () {
                return self.location;
            }


            //console.log("isArray( $scope.schoolList )", angular.isArray($scope.schoolList));

            //console.log('--- standard ---');
            //console.log('gogoro.App.currentState', gogoro.App.currentState);
            //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };


    /**************************************************************************
    |--------------------------------------------------------------------------
    | $scope.fallback
    |--------------------------------------------------------------------------
    */
    $scope.fallback = {
        init: function () {

            // initial variables
            var viewPortHeight = viewportSize.getHeight();
            var $elm = $element;
            var $mapWapper = $elm.find('#map');
            var $calendarWrapper = $elm.find('#calendar');

            var Booking = BookRideService;
            var numOfListItems = 0;
            var itemHeight = 80;
            var $listWrap = $elm.find('.list-wrap');
            var listWrapHeight = $listWrap.height();
            var $list = $listWrap.find('.list');
            var $listBtns = $elm.find('.list-btns');
            var $elmCalendar = $elm.find('.calendar');
            var $elmCalendarContainer = $elmCalendar.find('.container');

            var listBtnsHeight = $listBtns.height();
            var listViewArea = listWrapHeight - listBtnsHeight;
            var listMovementSpeed = 80;
            var listMovementDuration = 200;
            var negativeMaxUpMargins = 0;
            var language = gogoro.Locale.lang;
            var $linkShowMore = $elm.find('.show-more');
            var $btnNextStep = $elm.find('.next-step');
            var numOfDays = 14;
            self.limit = numOfDays;

            // dashboard 
            var $dashboardContainer = $elm.find('.dashboard');
            var $dashboardWrap = $elm.find('.dashboard-wrap');
            var $titleContainer = $elm.find('.title-container');
            var $infoContainer = $elm.find('.info-container');
            var $stepsContainer = $elm.find('.steps-container');

            // contact form wrap
            var $contactWrapper = $elm.find('.contact-wrap');

            // gogoro message box wrap
            var $gogoroMsgbox = $('.gogoro-msgbox');

            // timeline wrap 
            var $fallbackTimeWrap = $elm.find('.fallback-time-wrap');

            // set service language
            Booking.init(language);

            //gogoro.Loader.fullscreenStart();
            Booking.getStoreListFromAjax().then(function (data) {

                //this will execute when the AJAX call completes.
                if (data.result === 1) {

                    // rmove store
                    var filteredStore = [];
                    angular.forEach(data['data'], function (store) {
                        if (store['source_id'] !== 'ES313001') {
                            filteredStore.push(store);
                        }
                    });

                    // assign ajax data to local variable
                    self.remoteSchedules = filteredStore;

                    // assign data to BookRideService service
                    Booking.setRawData(self.remoteSchedules);

                    // get avaiable schedules from service.
                    $scope.lists = Booking.getAll();
                    if (debug) {
                        console.log('$scope.lists', $scope.lists);
                    }

                    //
                    initEvents();

                } else {
                    console.log('data.message', data.message);
                }

                setTimeout(function () {
                    // just font refresh
                    _jf.flush(); //內容變動後，呼叫此函數刷新字型
                    //setTimeout(function () {
                    //    gogoro.Loader.fullscreenStop();
                    //}, 250);
                }, 250);

            });

            function initEvents() {
                //
                numOfListItems = $scope.lists.length;
                if (numOfListItems < 5) {
                    $listBtns.hide();
                } else {
                    $listBtns.show();
                }

                // 
                setupListItemsForMovement();

            }

            var setupListItemsForMovement = function () {

                //console.log("numOfListItems", numOfListItems);
                //console.log("itemHeight", itemHeight); // item box height: 80
                //console.log("listWrapHeight", listWrapHeight);//max height 420
                //console.log("listBtnsHeight", listBtnsHeight);//max height 70
                //console.log("listViewArea", listViewArea);//max viewable height 350

                var totalListDataHeight = numOfListItems * itemHeight;
                var maxUpMargins = totalListDataHeight - listViewArea;
                negativeMaxUpMargins = parseInt('-' + maxUpMargins);
            }

            /*
            |--------------------------------------------------------------------------
            | click a list link 
            |--------------------------------------------------------------------------
            */
            $scope.counter = 0;

            // when user click on a item of the list. 
            $scope.displayScheduleList = function (index, id, type) {

                // HTML : set selected icon  
                var $link = $('.list_link');
                var $gicon = $('.mapicon');

                //
                resetListActiveStatus();

                //
                $gicon.eq(index).addClass('active');
                $link.eq(index).addClass('active');

                // display schedule list
                generateScheduleList(id, type);

                //
                var tempData = [];
                tempData.id = id;
                tempData.type = type;
                // assign value
                $scope.dashboardUpdate(1, tempData);

                // hide timeline 
                $fallbackTimeWrap.hide();

                // hide contact form
                $contactWrapper.hide();

                // if a user click a list of item, then display show more link
                //$linkShowMore.show();




            }

            function resetListActiveStatus() {
                // HTML : set selected icon  
                var $link = $('.list_link');
                var $gicon = $('.mapicon');

                $gicon.removeClass('active');
                $link.removeClass('active');
            }

            function generateScheduleList(id, type) {

                // get location data by id
                self.location = Booking.getOne(id);
                if (debug) {
                    console.log('self.location', self.location);
                }

                // ajax request to service
                //gogoro.Loader.fullscreenStart();
                Booking.getScheduleByIdFromAjax(id).then(function (data) {
                    //
                    if (debug) {
                        console.log('getScheduleByIdFromAjax', data);
                    }
                    //this will execute when the AJAX call completes.
                    if (data.result === 1) {
                        // check type > 1:store 2:event
                        switch (self.location.types) {
                            case 1:
                                // store
                                self.schedules = Booking.generateSchedule(numOfDays, self.location, data.data);
                                break;
                            case 2:
                                // event
                                self.schedules = Booking.generateEventsSchedule(self.location, data.data);
                                break;
                        }

                        if (debug) {
                            console.log("self.schedules", self.schedules);
                        }

                        //  show calendar list             
                        $elmCalendarContainer.show();

                    } else {
                        console.log('data.message', data.message);
                    }
                    //
                    //gogoro.Loader.fullscreenStop();

                    //
                    $('html, body').animate({
                        scrollTop: $("#calendar").offset().top
                    }, 500);
                });

            }

            // select 
            $('#dropdown--date').on('change', function (event) {
                //console.log('touchend');
                //console.log('$(this).val()', $(this).val() );

                if ($(this).val() !== 'none') {
                    var schedule = self.schedules[$(this).val()];

                    // update gTimes value to view
                    $scope.$apply(function () {
                        $scope.gTimes = schedule.gTimes;
                    });

                    // show timeline 
                    $fallbackTimeWrap.show();

                    // save temp variable
                    var tempData = [];
                    tempData.date = schedule.date;
                    $scope.dashboardUpdate(2, tempData);

                } else {
                    // hide timeline 
                    $fallbackTimeWrap.hide();
                    // hide contact form
                    $contactWrapper.hide();
                }

            });

            // when user click time
            $scope.timelineUpdate = function (index, time, status) {

                if (status) {
                    // css set selected link
                    $('.fallback-timeline').removeClass('selected');
                    $('.fallback-timeline').eq(index).addClass('selected');

                    // save
                    var tempData = [];
                    tempData.time = time;
                    $scope.dashboardUpdate(3, tempData);

                    // show contact form
                    $contactWrapper.show();

                    // scrollto contact form
                    setTimeout(function () {
                        $('html, body').animate({
                            scrollTop: $("#contact-wrap").offset().top - 10
                        }, 500);
                    }, 300);


                } else {
                    // this chosen time is no avaiable
                    // hide contact form
                    $contactWrapper.hide();
                }
            }


            /*
            |--------------------------------------------------------------------------
            | dashboard
            |--------------------------------------------------------------------------
            */
            $scope.dashboardUpdate = function (step, data) {

                switch (step) {
                    case 1:
                        $scope.dataSaved = [];
                        $scope.dataSaved.source_id = self.location.source_id;
                        $scope.dataSaved.type = data.type;

                        if (language.toLowerCase === 'zh-tw') {
                            $scope.dataSaved.name = self.location.chinese_name;
                        } else {
                            $scope.dataSaved.name = self.location.english_name;
                        }

                        break;
                    case 2:
                        $scope.dataSaved.date = data.date;
                        //$scope.dataSaved.time = data.time;

                        //
                        var fulldate = new Date($scope.dataSaved.date);
                        var days = Booking.getArrayDays();

                        if (language.toLowerCase === 'zh-tw') {
                            $scope.dataSaved.weekday = days.tw[fulldate.getDay()]; // Sunday...
                        } else {
                            $scope.dataSaved.weekday = days.en[fulldate.getDay()]; // Sunday...
                        }

                        break;
                    case 3:
                        $scope.dataSaved.time = data.time;
                        break;
                }

                // step update
                //$scope.dashboardHtmlUpdate();

                //
                if (debug) {
                    console.log('------ dashboardUpdate ------');
                    console.log('$scope.dataSaved', $scope.dataSaved);
                }

                //save data to service
                Booking.setSavedDataToService($scope.dataSaved);
            }


            var $btnMsgboxClose = $('#btn-msgbox-close');
            // click to close gogoro message box             
            $btnMsgboxClose.on('click', function (e) {
                e.preventDefault();

                // hide contact form
                $contactWrapper.hide();

                // hide gogoro message box  
                $gogoroMsgbox.removeClass('active');

                // scroll back to top of the window
                window.scrollTo(0, 0);

                //
                $scope.reset();

            });

            $scope.reset = function () {

                // 
                $scope.dataSaved = [];

                //
                //$scope.dashboardResset();

                //
                resetListActiveStatus();

                //
                $elmCalendarContainer.hide();

                //
                initEvents();

            }


            //console.log('--- fallback ---');
            //console.log('gogoro.App.currentState', gogoro.App.currentState);
            //console.log('gogoro.App.getBreakpoint()', gogoro.App.getBreakpoint());
        },
        destroy: function () { }
    };

    /*
    |--------------------------------------------------------------------------
    | Initialize module
    |--------------------------------------------------------------------------
    |  parame $scope
    |  parame $scope
    |  parame true or false
    */
    $scope.init($scope, $element, false);


}]).directive('daybox', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {

            scope.timelinesArrorLeft = function () {
                var index = scope.$index;
                var $timeBoxs = $('.time-boxs').eq(index);
                var timeBoxsWidth = $timeBoxs.width(); // totoal timeline width  e.g. 1598
                var negativeMaxLeftMargins = 0;

                var currentMarginLeft = parseInt($timeBoxs.css('marginLeft'));

                //
                if (currentMarginLeft !== 0) {
                    $timeBoxs.stop().velocity({ marginLeft: '+=150px' }, 200, function () {
                        if (currentMarginLeft > 0) {
                            $timeBoxs.stop().velocity({ marginLeft: '0px' }, 200);
                        }
                    });
                }
            }

            scope.timelinesArrorRight = function () {
                var index = scope.$index;
                var $timeBoxs = $('.time-boxs').eq(index);
                var timeBoxsWidth = $timeBoxs.width(); // 1598
                var $viewArea = $('.table-cell.time');
                var viewAreaWidth = $viewArea.width();

                var currentMarginLeft = parseInt($timeBoxs.css('marginLeft'));

                var maxPositiveMargins = timeBoxsWidth - viewAreaWidth;
                var maxNegativeMargins = parseInt('-' + maxPositiveMargins);

                //
                if (currentMarginLeft > maxNegativeMargins) {
                    $timeBoxs.stop().velocity({ marginLeft: '-=150px' }, 200, function () {

                        var currentMarginLeft = parseInt($timeBoxs.css('marginLeft'));
                        if (currentMarginLeft < maxNegativeMargins) {
                            $timeBoxs.stop().velocity({ marginLeft: maxNegativeMargins + 'px' }, 200);
                        }
                    });
                }
            }
        }
    }
}).directive('timelinebox', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            // avaiable time color     : #323237
            // not avaiable time color : #b9bcbf
            // selected time color     : #0069d2 

            // 101 : select line
            // 102 : margin line
            // 103 : toggle comment

            // variables 
            var $timeLink = elem.find('a');
            var $timeLinks = $('a.current-time');

            var schedule = scope.$parent.schedule;
            var thisTime = scope.gTime.time;//12:00...
            var thisMode = scope.gTime.mode;//AM or PM
            var thisDay = scope.$parent.schedule.date;//2015/01/02


            //
            $timeLink.bind('click', function () {
                var index = scope.$index;
                var parentIndex = scope.$parent.$index;

                //console.log('scope.$parent.$parent.dataSaved', scope.$parent.$parent.dataSaved);
                //console.log('thisDay', thisDay);

                var $elmWeek = $('.date-wrap .week');
                var $elmMonth = $('.date-wrap .month');
                var $elmDay = $('.date-wrap .day');

                if ($(this).hasClass('active')) {
                    //remove all seletet class
                    $elmWeek.removeClass('selected');
                    $elmMonth.removeClass('selected');
                    $elmDay.removeClass('selected');

                    //add selected class to this element
                    $elmWeek.eq(parentIndex).addClass('selected');
                    $elmMonth.eq(parentIndex).addClass('selected');
                    $elmDay.eq(parentIndex).addClass('selected');

                    // save
                    var tempData = [];
                    tempData.date = thisDay;
                    tempData.time = thisTime;
                    scope.$parent.$parent.dashboardUpdate(2, tempData);

                    //
                    scope.$parent.$parent.dashboardShowStep();

                } else {

                }
                
            });

            // In order to calculate total ul.time-boxs with
            // I need to get one of the current width of li
            // and multiply it with totoal number of li(s)
            //if (scope.$last) {
            //    var $timeBoxs = elem.parent();// ul.time-boxs
            //    var liTimeboxWidth = parseInt(elem.css('width'));
            //    var totoalNum = scope.$index + 2;//because index start from 0
            //    var totoalBoxsWidth = liTimeboxWidth * totoalNum;
            //    var marginLeft = totoalBoxsWidth / 2 - 200;

            //    var type = scope.$parent.$parent.dataSaved.type;

            //    if (scope.$parent.$parent.dataSaved.type === 1) {
            //        $timeBoxs.css('width', totoalBoxsWidth);
            //    } else {
            //    }
                    
            //}

            if (scope.$parent.$index === 0 && scope.$index === 0) {
                //var liTimeboxWidth = parseInt(elem.css('width'));
                //console.log(liTimeboxWidth);
            }
        }
    }

});

//.directive('fallbacktimelinebox', function () {
//    return {
//        restrict: "A",
//        link: function (scope, elem, attrs) {
//            elem.bind('click', function () {
//                var index = scope.$index;
//                var parentIndex = scope.$parent.$index;
//                var $contactWrapper = $('.contact-wrap');

//                if ($(this).hasClass('active')) {
//                    // show contact form 
//                    $contactWrapper.show();
//                } else {
//                    // hide contact form 
//                    $contactWrapper.hide();
//                }

//            });
//        }
//    }
//});