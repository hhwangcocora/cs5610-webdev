/**
 * Created by hhwang on 2/12/15.
 */
var app = angular.module('courseApp', [])
app.controller('courseController', function ($scope){
    var courses = [
        {'number':'CS5600', 'name':'Computer System', 'campus':'Boston', 'professor':'Nathaniel Tuck',
            'time':'W: 10:00am to 12:00pm','classroom':'WVH 220'},
        {'number':'CS5610', 'name':'Web Development', 'campus':'Boston', 'professor':'Jose G. Annunziato',
            'time':'WF: 11:45am to 1:25pm','classroom':'WVH 110'},
        {'number':'CS5800', 'name':'Algorithm', 'campus':'Seattle', 'professor':'Ravi Sundaram',
            'time':'T: 6:00pm to 9:00pm','classroom':'WVH 120'},
        {'number':'CS5700', 'name':'Fundamentals of Computer Networking', 'campus':'Boston', 'professor':'David Ross Choffnes',
            'time':'MT: 1:45pm to 3:25pm','classroom':'SH 108'},
        {'number':'CS6240', 'name':'Parallel Data Processing in MapReduce', 'campus':'Boston', 'professor':'Jan Vitek',
            'time':'WF: 11:45am to 1:25pm','classroom':'EVH 440'},
        {'number':'CS6510', 'name':'Advanced Software Development', 'campus':'Online', 'professor':'James Slocum Miller',
            'time':'WF: 11:45am to 1:25pm','classroom':'MH 110'}
    ]

    $scope.courses = courses //bind data

    $scope.myFilter = function(course) {
        var filter = new RegExp($scope.searchFilter, 'i')
        return !filter || filter.test(course.number) || filter.test(course.name) ||
                filter.test(course.campus) || filter.test(course.professor) || filter.test(course.classroom)
    }


})

