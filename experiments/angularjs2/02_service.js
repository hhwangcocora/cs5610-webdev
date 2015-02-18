/**
 * Created by hhwang on 2/18/15.
 */
var app = angular.module('', [])
app.controller('', function (MovieService, $scope){


})


app.config(['$routeProvider', // Config route
        function($routeProvider){
            when('/a', {
                templateUrl: '',
                controller: ''
            })
        }]

)

app.factory('MovieService', function($http){
    var searchMovie = function(title, callback) {
        $http.jsonp('url').success(callback)
    }
    return { // Expose the services
        search: searchMovie
    }
})