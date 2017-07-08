angular.module('angular-app-ng-api', []);

angular.module('angular-app-ng-api').factory('RosterDetailsApi', ['$q', '$http', function ($q, $http) {

    return {
        getRosterData: function (startDate, endDate) {

            var deferred = $q.defer();
            var managerNtId;
            var roleType;
            var firstDay = startDate;
            var lastDay = endDate;
            var url;

            managerNtId = sessionStorage.getItem("empntid");

            var protocol = window.location.protocol;
            var hostName = window.location.hostname + ":" + window.location.port;
            url = 'http://'+hostName+'/sat-shift-service/employees/shift-roster';
            if (protocol == "https:") {
                url = url.replace("http:", "https:");
            }

            $http
                .get(url, {
                    params: {
                        managerNTId: managerNtId,
                        fromDate: firstDay,
                        toDate: lastDay
                    }
                })

                .success(function (data, status, headers, config) {
                    deferred.resolve(data);

                }).error(function (data, status, headers, config) {
                    deferred.reject({
                        status: status,
                        headers: headers,
                        config: config,
                        body: data
                    });
                });
            return deferred.promise
        },

        submitRosterData: function (createDataObj,editDataObj,empId,overWriteWeekOff) {

            var deferred1 = $q.defer();
            var deferred2 = $q.defer();
            var deferred = $q.defer();
            var promise1 = deferred1.promise;
            var promise2 = deferred2.promise;
            var url;

            var promises = [];

            var protocol = window.location.protocol;
            var hostName = window.location.hostname + ":" + window.location.port;
            url = 'http://'+ hostName +'/sat-shift-service/employees/' + empId + '/shift-roster?overrideWeekOff=' + overWriteWeekOff;
   
            if (protocol == "https:")
            {
                url = url.replace("http:", "https:");
            }


             if (createDataObj != null && createDataObj != "" && createDataObj != undefined) {
                         promise1 = $http({
                            url: url,
                            method: 'POST',
                            data: createDataObj
                        }).success(function (data, status, headers, config) {
                            deferred1.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred1.reject({
                                status: status,
                                headers: headers,
                                config: config,
                                body: data
                            });
                        });
                 promises.push(deferred1.promise);
                     }
                    if (editDataObj != null && editDataObj != "" && editDataObj != undefined) {
                        promise2 = $http({
                            url: url,
                            method: 'PUT',
                            data: editDataObj
                        }).success(function (data, status, headers, config) {
                            deferred2.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred2.reject({
                                status: status,
                                headers: headers,
                                config: config,
                                body: data
                            });
                        });
                        promises.push(deferred2.promise);
                     }

            return $q.all(promises);
      }
   };
}]);

