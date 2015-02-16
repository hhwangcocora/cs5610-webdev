var app = angular.module('directiveApp', [])
app.controller('directiveController', ['$http', '$scope', function ($http, $scope){
    this.wikiLink = ''
    this.errorMsg = ''
    var controller = this;
    this.startQuery = function() {
        var queryStr = controller.queryString
        if (queryStr.length > 0) {
            var url = "http://en.wikipedia.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=info&limit=500&titles=" + encodeURIComponent(queryStr);
            $http.jsonp(url).
                success(function (data, status) {
                    var pages = data.query.pages
                    for (page in pages) {
                        var pageurl = "http://en.wikipedia.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=info&inprop=url&pageids=" + page
                        $http.jsonp(pageurl).
                            success(function (data, status) {
                                for (page in data.query.pages) {
                                    var url = data.query.pages[page]['fullurl']
                                    controller.wikiLink = url;
                                    break;
                                }
                            }).
                            error(function (data, status) {
                                controller.errorMsg = data
                            });
                    }
                }).
                error(function (data, status) {
                    controller.errorMsg = data
                });
        }
        this.queryString = ''
    }
}])

app.directive('queryBar', function() {
    return {
        restrict: 'E',
        templateUrl: '5_directive_input.html'
    }
})
