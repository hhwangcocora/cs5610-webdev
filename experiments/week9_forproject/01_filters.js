/**
 * Created by hhwang on 2/18/15.
 */
var app = angular.module('filterApp', [])
app.controller('filterController', function (){

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
            tasks: [],
            minutesEachDay: {
                // date -> hours
            },
            minutesEachTag: {
                // tagName -> hours
            }
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
        // convert all seconds or milliseconds to hours
        for (var idx in filteredTasks.minutesEachDay) {
            if (filteredTasks.minutesEachDay.hasOwnProperty(idx)) {
                filteredTasks.minutesEachDay[idx] /= 3600
            }
        }
        for (var idx in filteredTasks.minutesEachTag) {
            if (filteredTasks.minutesEachTag.hasOwnProperty(idx)) {
                filteredTasks.minutesEachTag[idx] /= 3600
            }
        }
        // fill in missing date
        var myDate = new Date(startTime)
        while (myDate.getTime() < endTime) {
            var convertedDate = '' + myDate.getMonth() + '-' + myDate.getDate()
            if (! filteredTasks.minutesEachDay.hasOwnProperty(convertedDate)) {
                filteredTasks.minutesEachDay[convertedDate] = 0
            }
            // add 24 hours to myDate
            myDate.setTime(myDate.getTime() + 24*3600000)
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
    }

    this.changeDuration()  // call to init the current tasks






})

