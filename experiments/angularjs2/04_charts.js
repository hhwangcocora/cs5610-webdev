/**
 * Created by hhwang on 2/18/15.
 */
var app = angular.module('chartApp', [])
app.controller('chartController', function (){

    var data = {
        labels: ["Boston", "New York", "San Fransisco", "Washington DC", "Seattle", "Dallas"],
        datasets: [
            {
                label: "Average Temperature",
                fillColor: "rgba(0,220,220,0.2)",
                strokeColor: "rgba(0,220,220,1)",
                pointColor: "rgba(0,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55]
            },
            {
                label: "Average Humility",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var ctx = $('#myLineChart').get(0).getContext('2d')
    var myLineChart = new Chart(ctx).Line(data, null);

    var myBarChart = new Chart($('#myBarChart').get(0).getContext('2d')).Bar(data, null);
})

