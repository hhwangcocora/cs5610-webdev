var courses = [
    {'number':'CS5010', 'name':'Programming Design Paradigm', 'campus':'Boston', 'professor':'professor 2',
        'time':'W: 10:00am to 12:00pm','classroom':'WVH 220'},
    {'number':'CS5400', 'name':'Web Development', 'campus':'Boston', 'professor':'professor 1',
        'time':'WF: 11:45am to 1:25pm','classroom':'WVH 110'},
    {'number':'CS6210', 'name':'Information Retrieval', 'campus':'Seattle', 'professor':'professor 2',
        'time':'T: 6:00pm to 9:00pm','classroom':'WVH 120'},
    {'number':'CS5700', 'name':'Fundamentals of Computer Networking', 'campus':'Boston', 'professor':'professor 3',
        'time':'MT: 1:45pm to 3:25pm','classroom':'SH 108'},
    {'number':'CS6300', 'name':'Mobile Application Development', 'campus':'Boston', 'professor':'professor 4',
        'time':'WF: 11:45am to 1:25pm','classroom':'EVH 440'},
    {'number':'CS6200', 'name':'Distributed System using Map Reduce', 'campus':'Online', 'professor':'professor 4',
        'time':'WF: 11:45am to 1:25pm','classroom':'MH 110'}
]

function reloadTable() {
    emptyTable()
    for (i in courses) {
        var newRow = $('<tr></tr>')
        newRow.attr('id', 'tr-' + i)
        for (keyname in courses[i]) {
            $('<td>' + courses[i][keyname] + '</td>').appendTo(newRow)
        }
        $('table').append(newRow)
    }
}

function emptyTable() {
    $('[id^=tr-]').empty() // use wildcards to remove all table rows
}

function sort(ele) {
    if (ele.className == 'glyphicon glyphicon-triangle-bottom') {
        ele.className = 'glyphicon glyphicon-triangle-top'
        desc = false
    } else {
        ele.className = 'glyphicon glyphicon-triangle-bottom'
        desc = true
    }
    courses.sort(function(a, b){
        if (a.number > b.number) {
            return desc ? 1 : -1
        }
        if (a.number < b.number) {
            return desc ? -1 : 1
        }
        return 0
    })
    reloadTable()
}

reloadTable()