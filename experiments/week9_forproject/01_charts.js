/**
 * Created by hhwang on 3/29/15.
 */
var app = angular.module('chartApp', [])
app.controller('chartController', function (){

    // Bar charts
    var data = {
        labels: ["Web", "Research", "Map Reduce", "TA hours", "Others"],
        datasets: [
            {
                label: "Accumulated hours within recent 3 months",
                fillColor: "rgba(0,220,220,0.2)",
                strokeColor: "rgba(0,220,220,1)",
                pointColor: "rgba(0,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56]
            }
        ]
    };
    var barChart1 = new Chart($('#barChart1').get(0).getContext('2d')).Bar(data, null);

    // Bar charts
    var webData = {
        labels: ["Experiments", "Project", "Courses", "TA hours"],
        datasets: [
            {
                label: "Accumulated hours for web within recent 3 months",
                fillColor: "rgba(0,220,220,0.2)",
                strokeColor: "rgba(0,220,220,1)",
                pointColor: "rgba(0,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [54, 20, 30, 5]
            }
        ]
    }
    var barChart1 = new Chart($('#barChart2').get(0).getContext('2d')).Bar(webData, null);

    // Line chart
    var totalHours = {
        labels: ["03-23", "03-24", "03-25", "03-26", "03-27", "03-28", "03-29"],
        datasets: [
            {
                label: "Total hours per day within recent 1 week",
                fillColor: "rgba(0,220,220,0.2)",
                strokeColor: "rgba(0,220,220,1)",
                pointColor: "rgba(0,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [10, 3, 4, 8, 8, 0, 1]
            }
        ]
    };
    var lineChart1 = new Chart($('#lineChart1').get(0).getContext('2d')).Line(totalHours, null);

    // Pie chart
    var hoursPerItem = [
        {
            value: 20,
            color: '#f7464a',
            highlight: '#ff5a5e',
            label: 'Web'
        },
        {
            value: 35,
            color: '#46bfbd',
            highlight: '#5ad3d1',
            label: 'IR'
        },
        {
            value: 20,
            color: '#fdb45c',
            highlight: '#ffc870',
            label: 'MapReduce'
        },
        {
            value: 15,
            color: '#f7cccc',
            highlight: '#f9cccc',
            label: 'TA hours'
        }
    ]
    var pieChart1 = new Chart($('#pieChart1').get(0).getContext('2d')).Pie(hoursPerItem, null);
})

