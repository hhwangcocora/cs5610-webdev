/**
 * Created by hhwang on 3/29/15.
 */
var app = angular.module('chartApp', [])
app.controller('chartController', function ($scope){

    $scope.colors = ['#f7464a', '#46bfbd', '#fdb45c', '#f7cccc', '#27cccc', '#680980', '#949494']
    $scope.highlights = ['#ff4f4a', '#4fbfbd', '#ffbf5c', '#ffcfcc', '#2fcfcc', '#6f0f80', '#9f9f94']

    $scope.class = '#fff'

    // Line chart
    this.lineChartTotalMinutes = {
        labels: [],
        datasets: [
            {
                label: "Total minutes per day",
                fillColor: "rgba(0,220,220,0.2)",
                strokeColor: "rgba(0,220,220,1)",
                pointColor: "rgba(0,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }
        ]
    };

    // Pie chart

    this.pieChartMinPerItem = [
        //{
        //    value: 0,
        //    color: '#f7464a',
        //    highlight: '#ff5a5e',
        //    label: ''
        //}
    ]

    $scope.getClass = function(idx) {
        var c = minutesPerItem[idx].color
    }


    // This is the data get from backend server
    tasks = [
        {
            l1Tag: 'web',
            l2Tag: 'project',
            startTime: new Date(2015, 1, 20, 10, 20, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 3600  // seconds
        },
        {
            l1Tag: 'web',
            l2Tag: 'project',
            startTime: new Date(2015, 2, 1, 10, 20, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 3600  // seconds
        },
        {
            l1Tag: 'web',
            l2Tag: 'project',
            startTime: new Date(2015, 2, 3, 10, 20, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 4600
        },
        {
            l1Tag: 'web',
            l2Tag: 'experiment',
            startTime: new Date(2015, 2, 5, 7, 6, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 36000
        },
        {
            l1Tag: 'web',
            l2Tag: 'others',
            startTime: new Date(2015, 2, 1, 10, 20, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 3600
        },
        {
            l1Tag: 'IR',
            l2Tag: 'project1',
            startTime: new Date(2015, 2, 7, 12, 40, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 2600
        },
        {
            l1Tag: 'IR',
            l2Tag: 'project1',
            startTime: new Date(2015, 2, 9, 10, 20, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 9600
        },
        {
            l1Tag: 'TA hours',
            l2Tag: 'TA hours',
            startTime: new Date(2015, 2, 10, 10, 20, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 3600
        },
        {
            l1Tag: 'IR',
            l2Tag: 'project2',
            startTime: new Date(2015, 2, 30, 16, 10, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 5600
        },
        {
            l1Tag: 'TA hours',
            l2Tag: 'TA hours',
            startTime: new Date(2015, 3, 3, 15, 44, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 3600
        },
        {
            l1Tag: 'IR',
            l2Tag: 'project2',
            startTime: new Date(2015, 3, 8, 3, 2, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 1600
        },
        ,
        {
            l1Tag: 'TA hours',
            l2Tag: 'TA hours',
            startTime: new Date(2015, 3, 10, 5, 2, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 2800
        }

    ]

    var convert2Digit = function(number) {
        var result = '' + number
        if (result.length == 1) {
            return '0' + number
        }
        return number
    }

    // when we get the data, we first need to construct data structures for better search/filter
    var getByDate = function(startTime, endTime) { // startTime and endTime are all in milliseconds since 1970, 1, 1
        var filteredTasks = {
            tasks: [],/////////////////////////////////////////////////////////////////////////////////////////////
            minutesEachDay: {
                // date -> minutes
            },
            minutesEachTag: {
                // tagName -> minutes
            }
        }
        // fill in all date with 0
        var myDate = new Date(startTime)
        while (myDate.getTime() < endTime) {
            var convertedDate = '' + myDate.getMonth() + '-' + myDate.getDate()
            if (! filteredTasks.minutesEachDay.hasOwnProperty(convertedDate)) {
                filteredTasks.minutesEachDay[convertedDate] = 0
            }
            // add 24 hours to myDate
            myDate.setTime(myDate.getTime() + 24*3600000)
        }

        for (var idx in tasks) {
            var task = tasks[idx]
            if (task.startTime >= startTime && task.startTime <= endTime) {
                console.log(task)
                var date = new Date(task.startTime)
                filteredTasks.tasks.push({
                    l1Tag: task.l1Tag,
                    l2Tag: task.l2Tag,
                    startTime: '' + date.getFullYear() + '-' + convert2Digit(date.getMonth() + 1) + '-'
                    + convert2Digit(date.getDate()) + ' ' + convert2Digit(date.getHours()) + ':' + convert2Digit(date.getMinutes()),
                    duration: '' + Math.floor(task.duration / 60) + ' minutes'
                })

                var convertedDate = '' + date.getMonth() + '-' + date.getDate()
                if (filteredTasks.minutesEachDay.hasOwnProperty(convertedDate)) {
                    filteredTasks.minutesEachDay[convertedDate] += task.duration
                } else {
                    filteredTasks.minutesEachDay[convertedDate] = task.duration
                }
                if (filteredTasks.minutesEachTag.hasOwnProperty(task.l1Tag)) {
                    filteredTasks.minutesEachTag[task.l1Tag] += task.duration
                } else {
                    filteredTasks.minutesEachTag[task.l1Tag] = task.duration
                }
            }
        }
        // convert all seconds or milliseconds to minutes
        for (var idx in filteredTasks.minutesEachDay) {
            if (filteredTasks.minutesEachDay.hasOwnProperty(idx)) {
                filteredTasks.minutesEachDay[idx] = Math.floor(filteredTasks.minutesEachDay[idx]/60)
            }
        }
        for (var idx in filteredTasks.minutesEachTag) {
            if (filteredTasks.minutesEachTag.hasOwnProperty(idx)) {
                filteredTasks.minutesEachTag[idx] = Math.floor(filteredTasks.minutesEachTag[idx] / 60)
            }
        }

        return filteredTasks
    }



    this.durationOptions = [
        {name: 'Last 1 day (24 hours)', shade: 'day', notAnOption: false, value: '1day'},
        {name: 'Last 7 day', shade: 'day', notAnOption: false, value: '7day'},
        {name: 'Last 1 month', shade: 'month', notAnOption: false, value: '1month'},
        {name: 'Last 3 month', shade: 'month', notAnOption: true, value: '3month'}
    ]
    this.currentDuration = this.durationOptions[1]

    this.currentTasks = []


    this.changeDuration = function() {
        // get start and end time (milliseconds) of the duration, and then update currentTasks to display
        var endDate = new Date()
        var endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 0).getTime()
        var startTime = endTime
        if (this.currentDuration.value == '1day') {
            startTime -= 24*3600000
        } else if (this.currentDuration.value == '7day') {
            startTime -= 7*24*3600000
        } else if (this.currentDuration.value == '1month') {
            startTime -= 31*24*3600000
        } else if (this.currentDuration.value == '3month') {
            startTime -= 92*24*3600000
        }

        this.currentTasks = getByDate(startTime, endTime)
        console.log(this.currentTasks)

        this.hasDataForLineChart = false
        this.hasDataForPieChart = false

        // init the data for the charts
        this.lineChartTotalMinutes.labels = []
        this.lineChartTotalMinutes.datasets[0].data = []
        for (var d in this.currentTasks.minutesEachDay) {
            if (this.currentTasks.minutesEachDay.hasOwnProperty(d)) {
                this.lineChartTotalMinutes.labels.push(d)
                this.lineChartTotalMinutes.datasets[0].data.push(this.currentTasks.minutesEachDay[d])
                if (this.currentTasks.minutesEachDay[d] > 0) {
                    this.hasDataForLineChart = true
                }
            }
        }
        this.pieChartMinPerItem = []
        count = 0
        $scope.labels = []
        for (var t in this.currentTasks.minutesEachTag) {
            if (this.currentTasks.minutesEachTag.hasOwnProperty(t)) {
                this.hasDataForPieChart = true
                this.pieChartMinPerItem.push({
                    label: t,
                    value: this.currentTasks.minutesEachTag[t],
                    color: $scope.colors[count],
                    highlight: $scope.highlights[count]
                })
                $scope.labels.push({
                    color: $scope.colors[count],
                    label: t + ' (' + this.currentTasks.minutesEachTag[t] + ' minutes)'
                })
                count++
            }
        }

        if (lineChart1 != null) {

            lineChart1.clear().destroy()

            lineChart1 = null
        }
        if (pieChart1 != null) {
            pieChart1.clear().destroy()

            pieChart1 = null

        }

        if (this.currentDuration.value != '1day' && this.hasDataForLineChart) {
            lineChart1 = new Chart($('#lineChart1').get(0).getContext('2d')).Line(this.lineChartTotalMinutes, null);
        }

        if (this.hasDataForPieChart) {
            pieChart1 = new Chart($('#pieChart1').get(0).getContext('2d')).Pie(this.pieChartMinPerItem, null);

        }

    }


    this.hasDataForLineChart = false
    this.hasDataForPieChart = false

    this.changeDuration()  // call to init the current tasks

    var lineChart1 = null
    var pieChart1 = null


})

