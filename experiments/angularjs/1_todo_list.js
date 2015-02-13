/**
 * Created by hhwang on 2/12/15.
 */
var app = angular.module('todoApp', [])
app.controller('todoController', function ($scope){
    var todoItems = [
        {'check':true, 'description':'This is an example todo text.'},
        {'check':false, 'description':'Use the check box to mark your todo task as done/undone.'},
        {'check':false, 'description':'Remove the task by clicking the close icon after the text.'}
    ]

    $scope.todoItems = todoItems

    $scope.removeItem = function(idx) {
        todoItems.splice(idx, 1)
    }

    $scope.addItem = function() {
        var description = $scope.newTodo
        if (!description) {
            return
        }
        todoItems.push({
            'check':false,
            'description':description
        })
        $scope.newTodo = ''
    }
})

