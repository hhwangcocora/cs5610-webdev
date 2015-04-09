/**
 * Created by hhwang on 3/29/15.
 */
var app = angular.module('chartApp', [])
app.controller('chartController', function (){

    var controller = this

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
        {
            value: 0,
            color: '#f7464a',
            highlight: '#ff5a5e',
            label: ''
        },
        {
            value: 0,
            color: '#46bfbd',
            highlight: '#5ad3d1',
            label: ''
        },
        {
            value: 0,
            color: '#fdb45c',
            highlight: '#ffc870',
            label: ''
        },
        {
            value: 0,
            color: '#f7cccc',
            highlight: '#f9cccc',
            label: ''
        },
        {
            value: 0,
            color: '#27cccc',
            highlight: '#29cccc',
            label: ''
        }
    ]


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
            startTime: new Date(2015, 2, 20, 16, 10, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 5600
        },
        {
            l1Tag: 'TA hours',
            l2Tag: 'TA hours',
            startTime: new Date(2015, 2, 27, 15, 44, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 3600
        },
        {
            l1Tag: 'IR',
            l2Tag: 'project2',
            startTime: new Date(2015, 2, 28, 3, 2, 1, 0).getTime(),  // milliseconds since 1970, 1, 1
            duration: 2600
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
        var count = 0
        while (count < 5) {
            this.pieChartMinPerItem[count].value = 0
            count++
        }
        count = 0
        for (var t in this.currentTasks.minutesEachTag) {
            if (this.currentTasks.minutesEachTag.hasOwnProperty(t)) {
                this.hasDataForPieChart = true
                this.pieChartMinPerItem[count].label = t
                this.pieChartMinPerItem[count].value = this.currentTasks.minutesEachTag[t]
                count++;
                if (count > 5) {
                    break;
                }
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

    this.post = function(chartName) {
        // generate comment
        var duration = ''
        if (this.currentDuration.value == '1day') {
            duration = 'last day'
        } else if (this.currentDuration.value == '7day') {
            duration = 'last week'
        } else if (this.currentDuration.value == '1month') {
            duration = 'last month'
        } else if (this.currentDuration.value == '3month') {
            duration = 'last quarter'
        }
        var totalMinutes = 0
        var eachTag = ''
        for (var tagName in this.currentTasks.minutesEachTag) {
            if (this.currentTasks.minutesEachTag.hasOwnProperty(tagName)) {
                eachTag += tagName + '(' + this.currentTasks.minutesEachTag[tagName] + ' minutes) '
                totalMinutes += this.currentTasks.minutesEachTag[tagName]
            }
        }
        controller.myPost = 'In ' + duration + ', I spent ' + totalMinutes + ' minutes on my tasks, ' + eachTag + '.'
        controller.myPost += ' I made really big progress!'

        $('#myPostModal').modal('show')
    }

    controller.myPosts = [
        // sorted by time
        // {post:string, date:string, comments: [{author:string, content:string, date:string},...],commmentsNumber: number
        // likes: {}, likesNumber: number},
    ]

    var formatDate = function(date) {
        var dateStr = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        dateStr += ' ' + convert2Digit(date.getHours()) + ':' + convert2Digit(date.getMinutes())
        return dateStr
    }

    this.postTo = function() {
        var postDateStr = formatDate(new Date())
        controller.myPost = $('#myPostAfterEdit').text()
        console.log(controller.myPost)
        controller.myPosts.unshift({
            post: controller.myPost,
            date: postDateStr,
            comments: [],
            commentsNumber: 0,
            likes: {},
            likesNumber: 0
        })
        $('#myPostModal').modal('hide')
    }

    this.submitComment = function(postIndex) {
        var newComment = controller.newComment
        var post = controller.myPosts[postIndex]
        post.comments.unshift({
            author: 'alice',
            content: newComment,
            date: formatDate(new Date())
        })
        post.commentsNumber++
        controller.newComment = ''
    }

    this.likePost = function(postIndex) {
        controller.myPosts[postIndex].likes['alice'] = 0
        controller.myPosts[postIndex].likesNumber = Object.keys(controller.myPosts[postIndex].likes).length
    }

    this.currentUserName = 'Bob'

    this.hasDataForLineChart = false
    this.hasDataForPieChart = false
    var lineChart1 = null
    var pieChart1 = null

    this.changeDuration()  // call to init the current tasks


})

