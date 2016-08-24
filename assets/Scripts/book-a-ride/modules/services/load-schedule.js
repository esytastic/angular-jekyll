/*
references
http://www.benlesh.com/2013/02/angularjs-creating-service-with-http.html


資料
http://local.www.gogoro.com/api/book-a-ride/list
報名
http://local.www.gogoro.com/api/book-a-ride/cancel
取消
http://local.www.gogoro.com/api/book-a-ride/cancel

取得store和event列表(不帶時間)
/api/book-a-ride/store-list

根據ID取得時間
/api/book-a-ride/date-list/{id}

*/
gogoroApp.factory('BookRideService', ["$http", "$q", function ($http) {
    var self = this;

    self.SEPARATE = '/';
    self.num_of_days = 7; //
    self.rawData = {};
    self.dataSaved = [];

    //generateTimes = function () {
    //    return [
    //        { time: '10:00', mode: 'AM' },
    //        { time: '11:00', mode: 'AM' },
    //        { time: '11:30', mode: 'AM' },
    //        { time: '12:00', mode: 'PM' },
    //        { time: '12:30', mode: 'PM' },
    //        { time: '13:00', mode: 'PM' },
    //        { time: '13:30', mode: 'PM' },
    //        { time: '14:00', mode: 'PM' },
    //        { time: '14:30', mode: 'PM' },
    //        { time: '15:00', mode: 'PM' },
    //        { time: '15:30', mode: 'PM' },
    //        { time: '16:00', mode: 'PM' },
    //        { time: '16:30', mode: 'PM' },
    //        { time: '17:00', mode: 'PM' },
    //        { time: '17:30', mode: 'PM' }
    //    ];
    //}

    // 門市為每20分鐘為一個梯次，早上第一個可預約時間為 11:00AM，晚上最後一場為 19:40PM
    generateTimes = function () {
        return [
            { time: '11:00', mode: 'AM' },
            { time: '14:00', mode: 'PM' },
            { time: '17:00', mode: 'PM' }
        ];
    }

    generateEventTimes = function () {
        return [
            { time: '11:00', mode: 'AM' },
            { time: '16:00', mode: 'PM' }
        ];
    }

    // store time frame
    self.storeTimeFrame = {
        'tw':
            {
                '11:00': "中午場 (11:00~14:00)",
                '14:00': "下午場 (14:00~17:00)",
                '17:00': "晚上場 (17:00~20:00)"
            },
        'en':
           {
               '11:00': "Afternoon session (11:00AM~16:00)",
               '14:00': "Afternoon session (14:00AM~17:00)",
               '17:00': "Night session (16:00~20:00)"
           }
    };

    // 下午場 (11:00AM ~16:00PM)
    // 晚上場 (16:00PM ~20:00PM)
    self.eventTimeFrame = {
        'tw':
            {
                '11:00': "下午場 (11:00~16:00)",
                '16:00': "晚上場 (16:00~20:00)"
            },
        'en':
           {
               '11:00': "Afternoon session (11:00~16:00)",
               '16:00': "Night session (16:00~20:00)"
           }
    };


    // variables
    self.days      = {};
    self.days.en   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    self.days.tw   = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    self.months    = {};
    self.months.en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    self.months.tw = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

    init = function (language) {

        if (language == 'en-tw') {
            self.lang = 'en';
        } else {
            self.lang = 'tw';
        }

    }

    getEventTimeSubject = function (timeString) {
        return self.eventTimeFrame[self.lang][timeString];
    }

    getStoreTimeSubject = function (timeString) {
        return self.storeTimeFrame[self.lang][timeString];
    }

    getArrayDays = function () {
        return self.days;
    }

    setRawData = function (data) {
        self.rawData = data;
    }

    // save choosen data to service to share between controllers
    setSavedDataToService = function (dataSaved) {
        self.dataSaved = dataSaved;
    }

    // get saved data
    getSavedDataFromService = function () {
        return self.dataSaved;
    }

    // generate date list for Stroe
    generateDays = function (num) {

        if (angular.isUndefined(num)) {
            console.error("generateDays: number is missing");
        }

        var schedules = [];

        for (i = 0; i < num; i++) {

            // generate a date
            var fulldate = assignSpecificStartDate();

            // new array
            var schedule = [];

            //fulldate.setDate(fulldate.getDate() + 1); // start from tomorrow
            fulldate.setDate(fulldate.getDate()); // start today
            fulldate.setDate(fulldate.getDate() + i);

            //add leading zero to month
            var month = ('0' + (fulldate.getMonth() + 1)).slice(-2);

            //add leading zero to day
            var day = ('0' + (fulldate.getDate())).slice(-2);

            // assign
            schedule['date'] = fulldate.getFullYear() + self.SEPARATE + month + self.SEPARATE + day; // 2015-03-12
            schedule['month_str'] = self.months[self.lang][fulldate.getMonth()]; // Monday...
            schedule['day']       = day; // 1,2,3
            schedule['day_str']   = self.days[self.lang][fulldate.getDay()]; // Sunday...
            schedule['timestamp'] = new Date(fulldate.getFullYear(), fulldate.getMonth(), fulldate.getDate(),0,0,0).getTime();

            // push
            schedules.push(schedule);
        }

        return schedules;

    }

    // Comparing dates
    assignSpecificStartDate = function () {
        //Note: 00 is month i.e. January
        var dateOne = new Date(); //Year, Month, Date
        var dateTwo = new Date(2015, 04, 17); //Year, Month, Date

        if (dateOne >= dateTwo) {
            return dateOne;
        } else {
            return dateTwo;
        }
    }

    // extract a booking information from remote data by id
    getOne = function (id) {
        var location = {};

        angular.forEach(self.rawData, function (value, key) {
            if (value.id === id) {
                location = value;
            }
        });

        return location;
    }

    getAll = function () {
        return self.rawData;
    }

    getAllByType = function (type) {
        var result = [];

        angular.forEach(self.rawData, function (value, key) {
            if (value.types === type) {
                var row = [];
                row = value;

                // push
                result.push(row);
            }
        });

        return result;
    }

    // generate schedule for events
    generateEventsSchedule = function (location, schedulings) {
        // use generateDays(num) to get the list of dates(2015/03/25,2015/03/26...)
        var gDays = [];
        var i = 0;

        angular.forEach(schedulings, function (scheduling) {
            var gTimes = generateEventTimes();
            var gDay = [];

            //
            gDay['id'] = location.id;
            gDay['types'] = location.types;
            gDay['date'] = schedulings[i]['date'];

            //
            var date = dateDetails(gDay['date']);
            gDay['month_str'] = date['month_str'];
            gDay['day'] = date['day'];
            gDay['day_str'] = date['day_str'];

            //
            gDay['gTimes'] = getEventsSchedulingDate(gTimes, scheduling);

            //
            gDays.push(gDay);

            i++;
        });

        return gDays;
    }

    // compare generate date with avaiable date and time.
    getEventsSchedulingDate = function (gTimes, scheduling) {

        var collectTimes = gTimes;

        angular.forEach(collectTimes, function (collectTime) {

            angular.forEach(scheduling.time, function (availableTime) {

                if (collectTime.time === availableTime.time) {

                    //    //console.log("------ availableTime assigned------");
                    //console.log('availableTime.time', availableTime.time);
                    //    //console.log('availableTime.can_sign_up', availableTime.can_sign_up);

                    collectTime.subject = self.eventTimeFrame[self.lang][availableTime.time];
                    if (availableTime.can_sign_up > 0) {
                        collectTime.status = true;
                    } else {
                        collectTime.status = false;
                    }
                    collectTime.can_sign_up = availableTime.can_sign_up;
                }

            });


        });

        //return collectTimes;
        return checkTimeStatusUndefined(collectTimes);
    }

    // genertate schedule for stores
    generateSchedule = function (num, location, schedulings) {
        // use generateDays(num) to get the list of dates(2015/03/25,2015/03/26...)
        var gDays  = generateDays(num);// g


        // compare each geneate date with remote avaiable date,
        // if remote avaiable date is exist, assign it to correspondent geneate date
        for (i = 0; i < gDays.length; i++) {
            //console.log(gDays[i]['date']);
            //console.log(gDays[i]['month_str']);
            //console.log(gDays[i]['day']);
            //console.log(gDays[i]['day_str']);
            //console.log("---------------------------------------------------");
            var gTimes = generateTimes();

            gDays[i]['location']          = new Array();
            gDays[i]['location']['id']    = location.id;
            gDays[i]['location']['types'] = location.types;
            gDays[i]['gTimes'] = getSchedulingDate(gTimes, schedulings, gDays[i]['timestamp']);

        }

        return gDays;
    }

    // compare generate date with avaiable date and time.
    getSchedulingDate = function (gTimes, schedulings, gTimestamp) {

        var collectTimes = gTimes;
        var counter = 0;
        //console.log('gDate', gDate);
        angular.forEach(schedulings, function (scheduling) {

            var schedulingTimestamp = string2Timestamp(scheduling.date);

            //console.log("------ before compare date ------");
            //console.log('scheduling.date', scheduling.date);
            //console.log('schedulingTimestamp', schedulingTimestamp);

            // compare with timestamp
            if (schedulingTimestamp === gTimestamp) {
                availableTimes = scheduling.time;

                angular.forEach(availableTimes, function (availableTime) {

                    //console.log("------ availableTime ------");
                    //console.log('availableTime.time', availableTime.time);

                    angular.forEach(collectTimes, function (collectTime) {

                        if (collectTime.time === availableTime.time) {

                            //console.log("------ availableTime assigned------");
                            // console.log('availableTime.time', availableTime.time);
                            //console.log('availableTime.can_sign_up', availableTime.can_sign_up);

                            collectTime.subject = self.storeTimeFrame[self.lang][availableTime.time];

                            if (availableTime.can_sign_up > 0) {
                                collectTime.status = true;
                            } else {
                                collectTime.status = false;
                            }

                            collectTime.can_sign_up = availableTime.can_sign_up;
                        }

                    });

                });
            }

        });

        //return collectTimes;
        return checkTimeStatusUndefined(collectTimes);
    }


    checkTimeStatusUndefined = function (collectTimes) {

        angular.forEach(collectTimes, function (collectTime) {

            if (angular.isUndefined(collectTime.status)) {

                collectTime.status = false;
                collectTime.can_sign_up = 0;
                collectTime.subject = self.storeTimeFrame[self.lang][collectTime.time];
            }

        });

        return collectTimes;
    }

    //convert data string to timestamp
    string2Timestamp = function (stringDate) {

        var s = stringDate.split(self.SEPARATE);
        // Date object's month is from 0-11
        //
        var rdate = new Date(s[0], s[1]-1, s[2], 0, 0, 0);

        return rdate.getTime();
    }

    //console.log(gDays[i]['date']);
    //console.log(gDays[i]['month_str']);
    //console.log(gDays[i]['day']);
    //console.log(gDays[i]['day_str']);
    dateDetails = function (stringDate) {

        var detail = [];

        //
        var fulldate = new Date(stringDate);

        //add leading zero to month
        var month = ('0' + (fulldate.getMonth() + 1)).slice(-2);

        //add leading zero to day
        var day = ('0' + (fulldate.getDate())).slice(-2);

        detail['month_str'] = self.months[self.lang][fulldate.getMonth()]; // Monday...
        detail['day_str']   = self.days[self.lang][fulldate.getDay()]; // Sunday...
        detail['day']       = day; // 1,2,3

        return detail;
    }


    // get avaiable schedule data form remote
    getAllFromAjax = function () {

        var url = gogoro.api.url_list
        var method = 'POST';
        var csrfToken = $('input[name=__RequestVerificationToken]').val();

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's
        //callback argument, we can return that.
        return $http({method: method, url: url,
            headers: {
                '__RequestVerificationToken': csrfToken
            }
        }).then(function (result) {
            return result.data;
        });
    }

    // get avaiable schedule data form remote
    getStoreListFromAjax = function () {

        var url = gogoro.api.url_store_list;
        var method = 'POST';
        var csrfToken = $('input[name=__RequestVerificationToken]').val();

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's
        //callback argument, we can return that.
        // return $http({
        //     method: method, url: url,
        //     headers: {
        //         '__RequestVerificationToken': csrfToken
        //     }
        // }).then(function (result) {
        //     return result.data;
        // });

        // FIXME: Temporary solution until we get access to an API

        return new Promise(function (resolve, reject) {
            var data = {"result":1,"message":"","data":[{"id":"abb339f5-5e48-4be1-bc1e-534c1dabf564","source_id":"ES312001","types":1,"chinese_name":"士林文林店","english_name":"Shilin Wenlin Store","phone":"","latitude":"25.0873269,121.5257023","chinese_address":"台北市士林區文林路65號","english_address":"65, Wenlin Rd., Shilin Dist.,  Taipei City 111,","scheduling":null},{"id":"21e37221-fcdb-4e7f-9cee-5d98e5e57d6e","source_id":"ES313001","types":1,"chinese_name":"誠品松菸店","english_name":"Eslite Songyen Store","phone":"02-66366060","latitude":"25.044545,121.5614574","chinese_address":"台北市松山區菸廠路88號二樓","english_address":"2F., No.88, Sec. 2, Bade Rd., Songshan Dist.","scheduling":null},{"id":"50ea86df-ab3f-4ce9-9d18-9e41c89f3fae","source_id":"ES311000","types":1,"chinese_name":"全球體驗中心","english_name":"Global Experience Centre","phone":"02-27298777","latitude":"25.0356839,121.56681","chinese_address":"台北市信義區松壽路18號","english_address":"18, Songshou Rd., Xinyi Dist.","scheduling":null},{"id":"7e98e693-69e3-409a-8d34-aae162468f09","source_id":"ES313002","types":1,"chinese_name":"板橋館前店","english_name":"Banqiao Guanqian Store","phone":"02-29641010","latitude":"25.0070782,121.4603758","chinese_address":"新北市板橋區館前東路26號一樓","english_address":"1F., No.26, Guanqian E. Rd., Banqiao Dist., 220","scheduling":null},{"id":"b838f98d-6a93-405e-9e2d-e6d2fbf0216a","source_id":"ES312002","types":1,"chinese_name":"光華八德店","english_name":"Guanghua Bade Store","phone":"02-23957070","latitude":"25.0441128,121.5312496","chinese_address":"台北市中正區八德路一段27號一樓","english_address":"1F, No.27, Sec. 1, Bade Rd., Zhongzheng Dist., 100","scheduling":null}],"error_code":null};
            resolve(data);
        });
    }

    // get a schedule by id
    getScheduleByIdFromAjax = function (id) {

        var url = gogoro.api.url_date_list +'/'+id
        var method = 'POST';
        var csrfToken = $('input[name=__RequestVerificationToken]').val();

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's
        //callback argument, we can return that.
        // return $http({
        //     method: method, url: url,
        //     headers: {
        //         '__RequestVerificationToken': csrfToken
        //     }
        // }).then(function (result) {
        //     return result.data;
        // });

        // FIXME: Temporary solution until we get access to an API

        return new Promise(function (resolve, reject) {
            var data = {"result":1,"message":"","data":[{"id":"7d6af088-32ae-485d-ab0e-87d46ff3100a","date":"2015/12/24","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"5297deb2-8b8d-4cec-bf8d-ea78625ab9d8","date":"2015/12/25","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"e057da8b-3735-4f03-862d-6c2e58fe1287","date":"2015/12/26","time":[{"time":"11:00","can_sign_up":3}]},{"id":"65a3e6e4-f432-4818-b61d-fa2f1391d1cf","date":"2015/12/27","time":[{"time":"11:00","can_sign_up":5}]},{"id":"cb8435df-2859-4420-a0f1-b1ade4016761","date":"2015/12/28","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"7e4bf174-22b9-480f-9d78-d09b12981377","date":"2015/12/29","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"c1f6c0f2-cf1e-4357-bc7b-4edd33a58873","date":"2015/12/30","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"b1faeb3d-91d2-41f6-8a3b-8cd1f1f0f36d","date":"2015/12/31","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"f0081595-1ee0-45ec-944a-139a2084f08c","date":"2016/01/01","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"94af3538-244f-4744-aa92-1d8e16d9a6ab","date":"2016/01/02","time":[{"time":"11:00","can_sign_up":5}]},{"id":"420190cb-fcc1-4e68-a2e2-389ef7c50c0f","date":"2016/01/03","time":[{"time":"11:00","can_sign_up":5}]},{"id":"533c426f-be7d-4e6a-8126-02148525e280","date":"2016/01/04","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"62a81592-321e-4563-9ab0-5336c45bcf7e","date":"2016/01/05","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]},{"id":"e548ee39-5a79-41be-998c-935f8237c4bb","date":"2016/01/06","time":[{"time":"14:00","can_sign_up":5},{"time":"17:00","can_sign_up":5}]}],"error_code":null};
            resolve(data);
        });
    }

    // save booking
    save = function (formData) {

        var url = gogoro.api.url_save
        var method = 'POST';
        var csrfToken = $('input[name=__RequestVerificationToken]').val();

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's
        //callback argument, we can return that.
        // return $http({
        //     method: method,
        //     data: JSON.stringify(formData),
        //     dataType: "json",
        //     url: url,
        //     headers: {
        //         '__RequestVerificationToken': csrfToken
        //     }
        // }).then(function (result) {
        //     return result.data;
        // });

        // FIXME: Temporary solution until we get access to an API

        return new Promise(function (resolve, reject) {
            var data = {"result":1,"message":"","data":null,"error_code":null};
            resolve(data);
        });
    }

    // cancel booking
    cancel = function (formData) {

        var url = gogoro.api.url_cancel
        var method = 'POST';
        var csrfToken = $('input[name=__RequestVerificationToken]').val();

        //since $http.get returns a promise,
        //and promise.then() also returns a promise
        //that resolves to whatever value is returned in it's
        //callback argument, we can return that.
        return $http({
            method: method,
            data: JSON.stringify(formData),
            dataType: "json",
            url: url,
            headers: {
                '__RequestVerificationToken': csrfToken
            }
        }).then(function (result) {
            return result.data;
        });

    }
    // build queries


    return {

        init: init,
        getOne:getOne,
        getAll: getAll,
        getArrayDays: getArrayDays,
        getAllByType:getAllByType,
        generateDays: generateDays,
        generateTimes: generateTimes,
        setRawData: setRawData,
        generateSchedule: generateSchedule,
        generateEventsSchedule:generateEventsSchedule,
        getAllFromAjax: getAllFromAjax,
        getStoreListFromAjax: getStoreListFromAjax,
        setSavedDataToService: setSavedDataToService,
        getSavedDataFromService: getSavedDataFromService,
        save: save,
        cancel: cancel,
        string2Timestamp:string2Timestamp,
        getScheduleByIdFromAjax: getScheduleByIdFromAjax,
        getEventTimeSubject: getEventTimeSubject,
        getStoreTimeSubject: getStoreTimeSubject
    }
}]);
