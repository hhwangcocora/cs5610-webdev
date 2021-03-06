/**
 * Created by hhwang on 2/18/15.
 */
var app = angular.module('routingApp', ['ngRoute']) // depend on the route module
app.controller('HomeController', function (){


})

app.config(['$routeProvider', // Config route // Use the url to store the state of page informaiton // back button still work
    function($routeProvider){
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController',
                controllerAs: 'hc'

            }).
            when('/documentation', {
                templateUrl: 'partials/documentation.html'
            }).
            when('/codesnippet', {
                templateUrl: 'partials/codesnippet.html'
            }).
            when('/references', {
                templateUrl: 'partials/references.html'
            }).
            otherwise('/home')
    }]
)
