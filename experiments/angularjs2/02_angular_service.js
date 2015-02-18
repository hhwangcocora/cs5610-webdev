/**
 * Created by hhwang on 2/18/15.
 */

app.controller('serviceController', function (MovieService){
    this.trailers = []
    var controller = this;
    this.startQuery = function() {
        MovieService.searchTrailer(controller.movieTitle, function(resp){
            console.log(resp)
            controller.trailers = resp
        })
    }
})
