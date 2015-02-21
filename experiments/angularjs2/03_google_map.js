/**
 * Created by hhwang on 2/20/15.
 */
var app = angular.module('MapApp', ['uiGmapgoogle-maps'])
app.controller('MapController', function ($scope){
    if (google.loader.ClientLocation) {
        $scope.latitude = google.loader.ClientLocation.latitude
        $scope.longitude = google.loader.ClientLocation.longitude
    } else {
        $scope.latitude = 42
        $scope.longitude = -72
    }

    $scope.map = {
        center: {latitude: $scope.latitude, longitude: $scope.longitude},
        zoom: 12
    }

    $scope.marker = {
        id: 0,
        coords: {
            latitude: $scope.latitude,
            longitude: $scope.longitude
        },
        options: {
            draggable: true
        },
        events: {
            dragend: function(event) {
                $scope.latitude = event.position.k
                $scope.longitude = event.position.D
                $scope.map['center'] = {latitude: $scope.latitude, longitude: $scope.longitude}

            }
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
