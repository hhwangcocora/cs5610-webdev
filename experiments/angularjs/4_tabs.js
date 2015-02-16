/**
 * Created by hhwang on 2/15/15.
 */
var app = angular.module('tabsApp', [])
app.controller('tabsController', function ($scope){

    this.activeTab = 1

    this.show = function (tabName) {
        return tabName == this.activeTab
    }
    this.click = function (tabName) {
        this.activeTab = tabName
    }


})

