/**
 * Created by hhwang on 3/31/15.
 */
var app = angular.module('profileApp', [])
app.controller('profileController', function (){
    var controller = this;
    controller.profile = {
        firstName: 'Bob',
        lastName: 'White',
        userName: 'bwhite',
        email: 'bob.white@xxxxxx.com',
        gender: 'male',
        password: '123456',
        birthday: new Date(1990, 3, 5),
        friends: ['lily', 'alice', 'lucy', 'bob'],
        picUrl: ''
    }

    controller.defaultProfileUrl = '../../images/experiments/default-profile-pic.png'

    var setDisplayPic = function() {
        if (controller.profile.picUrl && controller.profile.picUrl.length > 0) {
            controller.displayProfilePic = controller.profile.picUrl
        } else {
            controller.displayProfilePic = controller.defaultProfileUrl
        }
    }

    setDisplayPic()


    var copyProfile = function() {
        return {
            firstName: controller.profile.firstName,
            lastName: controller.profile.lastName,
            email: controller.profile.email,
            gender: controller.profile.gender,
            birthday: controller.profile.birthday,
            picUrl: controller.profile.picUrl
        }
    }

    this.originalProfile = copyProfile()


    this.profileUpdated = function() {
        return controller.profile.firstName != controller.originalProfile.firstName
            || controller.profile.lastName != controller.originalProfile.lastName
            || controller.profile.email != controller.originalProfile.email
            || controller.profile.gender != controller.originalProfile.gender
            || controller.profile.birthday != controller.originalProfile.birthday
            || controller.profile.picUrl != controller.originalProfile.picUrl
    }

    this.saveProfile = function() {
        controller.originalProfile = copyProfile()
        setDisplayPic()
    }

    this.visitHomepage = function(index) {
        console.log(controller.profile.friends[index])
    }

    this.unfriend = function(index) {
        controller.profile.friends.splice(index, 1)
    }

    this.searchFriend = function() {
        controller.searchResults = ['Mary', 'gary']
    }


})

