/**
 * Created by hhwang on 2/20/15.
 */
var app = angular.module('MapApp', ['uiGmapgoogle-maps'])
app.controller('MapController', function ($scope){
    $scope.map = {
        center: {latitude: 45, longitude: -73},
        zoom: 8
    }

    $scope.marker = {
        id: 0,
        coords: {
            latitude: 45,
            longitude: -73
        },
        options: {
            draggable: true
        },
        events: {
            
        }
    }
    /*$scope.searchbox = {
        template: 'searchbox.tpl.html',
        events: {
            places_changed: function(searchBox){
                console.log(searchBox)
            }
        }
    }*/

})
