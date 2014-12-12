'use strict';

angular.module('angularFullstackApp')
.config(function ($stateProvider) {
    $stateProvider
    .state('room', {
        url: '/room',
        templateUrl: 'app/room/room.html',
        controller: 'RoomCtrl'
    }).
    state('room.id', {
        url: '^/room/:roomId',
        templateUrl: 'app/room/room.html',
        controller: 'RoomCtrlr'
    });
});