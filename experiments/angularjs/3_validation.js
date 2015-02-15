/**
 * Created by hhwang on 2/15/15.
 */
var app = angular.module('registerApp', [])
app.controller('registerController', function ($scope){

    this.user = {}

    this.register = function() {
        console.log('register')
        console.log(this.user)
    }

    this.matchPassword = function() {
        return this.user.password === this.user.password2
    }

})

