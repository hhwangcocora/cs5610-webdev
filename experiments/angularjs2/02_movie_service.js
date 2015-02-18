/**
 * Created by hhwang on 2/18/15.
 */
var app = angular.module('serviceApp', [])

app.factory('MovieService', function($http){
        var searchTrailer = function(title, callback) {
            var url = 'http://www.myapifilms.com/imdb?title='+encodeURIComponent(title)+'&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=10&lang=en-us&actors=N&biography=0&trailer=1&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK'

            $http.jsonp(url).success(function(resp, status){
                var trailers = []
                for (m in resp) {
                    if (resp[m].trailer.qualities && resp[m].trailer.qualities.length > 0) {
                        trailers.push(resp[m].trailer)
                    }
                }
                callback(trailers)
            })
        }
    return { // Expose the services
        searchTrailer: searchTrailer
    }
})

