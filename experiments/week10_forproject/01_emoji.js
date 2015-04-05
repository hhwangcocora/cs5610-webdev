/**
 * Created by hhwang on 2/18/15.
 */
var app = angular.module('emojiApp', [])
app.controller('emojiController', function ($scope){
    $scope.emojis = ['1f645.png', '1f644.png', '1f643.png', '1f642.png', '1f647.png', '1f646.png', '1f641.png', '1f617.png',
        '1f616.png', '1f615.png', '1f614.png', '1f613.png', '1f612.png', '1f611.png', '1f610.png', '1f609.png', '1f608.png',
        '1f607.png', '1f606.png', '1f605.png', '1f604.png', '1f603.png', '1f602.png', '1f601.png', '1f600.png', '1f640.png',
        '1f639.png', '1f638.png', '1f637.png', '1f636.png', '1f635.png', '1f634.png', '1f633.png', '1f632.png', '1f631.png',
        '1f630.png', '1f629.png', '1f628.png', '1f627.png', '1f626.png', '1f625.png', '1f624.png', '1f623.png', '1f622.png',
        '1f621.png', '1f620.png', '1f619.png', '1f618.png']

    $scope.selectEmoji = function(idx) {
        $scope.showEmoji = false
        if (!$scope.status) {
            $scope.status = ''
        }
        $scope.status += '<img src="../../images/experiments/emoji/' + $scope.emojis[idx] + '">'
    }

    $scope.statuses = []

    $scope.post = function() {
        if ($scope.status) {
            $scope.statuses.push($scope.status)
        }
        $scope.status = null
    }

})

