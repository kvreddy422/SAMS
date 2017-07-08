angular.module('angular-app-ng-api')
 .factory('ShiftDetailsApi', ['$scope', '$http','$location', '$rootScope', function ($scope, $http,$location,$rootScope ) {
    return {
      getShiftData: function (startDate,endDate) {

        var deferred = $q.defer();
        var empId;
        var firstDay = startDate;
        var lastDay =  endDate;
        var url;

        function getQueryVariable(variable)
        {
          var query = window.location.search.substring(1);
          var vars = query.split("&");
          for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
          }
          return(false);
        }
        empId = getQueryVariable("empntid");
        url = RestEndpoints.apiUrl;

        $http
          .get(url, {
            params: {
              empNTId: empId,
              fromDate: firstDay,
              toDate: lastDay
            }
          })
          .success(function (data, status, headers, config) {
            deferred.resolve(data);
            $location.path('/shiftRecord');
            // not relevant
          }).error(function (data, status, headers, config) {

            deferred.reject({
              status: status,
              headers: headers,
              config: config,
              body: data
            });
          });
        return deferred.promise;

      }
    }

  }]);


