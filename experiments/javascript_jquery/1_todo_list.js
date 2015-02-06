/**
 * Created by hhwang on 2/5/15.
 */

var todoItems = [
    {'check':true, 'description':'This is an example todo text.'},
    {'check':false, 'description':'Use the check box to mark your todo task as done/undone.'},
    {'check':false, 'description':'Remove the task by clicking the close icon after the text.'}
]

// Load items to list at initialization phase
function loadTodoItems() {
    $('#list').empty()
    for (i in todoItems) {
        appendTodoItems(todoItems[i], i)
    }
}

// Append one item to the list
function appendTodoItems(newItem, i) {
    var lineLeft = $('<div class="col-sm-3"></div>')
    if (newItem['check']) {
        $('<span class="glyphicon glyphicon-check" onmousedown="toggleCheck(this)"></span>').appendTo(lineLeft)
    } else {
        $('<span class="glyphicon glyphicon-unchecked" onmousedown="toggleCheck(this)"></span>').appendTo(lineLeft)
    }
    lineLeft.append(newItem['description'])
    var line = $('<div class="row"></div>')
    line.attr('id', i)

    lineLeft.appendTo(line)
    $('<div><span class="glyphicon glyphicon-remove" onmouseup="removeItem(this)"></span></div>').appendTo(line)

    $('div#list').append(line)

}

function toggleCheck(ele) {
    // this refers to the element which causes this event
    row = ele.parentElement.parentElement
    console.log(row.id)
    todoItems[row.id]['check'] = !todoItems[row.id]['check']
    if (todoItems[row.id]['check']) {
        ele.className='glyphicon glyphicon-check'
    } else {
        ele.className='glyphicon glyphicon-unchecked'
    }
}

function removeItem(ele) {
    todoItems.splice(ele.parentElement.parentElement.id, 1)
    loadTodoItems()
}

function addItem() {
    var description = $('#newItem')[0].value
    if (!description) {
        return
    }
    var idx = todoItems.length
    $('#newItem')[0].value = '' // reset input field to be empty
    todoItems.push({
        'check':false,
        'description':description
    })
    appendTodoItems(todoItems[idx], idx)
}


loadTodoItems()

