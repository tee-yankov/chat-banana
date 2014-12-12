'use strict';

angular.module('angularFullstackApp')
.controller('MainCtrl', function ($scope, $http, socket, Auth, $modal) {
    $scope.awesomeThings = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/rooms').success(function(rooms) {
        $scope.rooms = rooms;
        socket.syncUpdates('room', $scope.rooms);
    });

    $scope.addRoom = function(roomName, roomInfo) {
        if(roomName === '') {
            return;
        }
        if (roomInfo === '') {
            return;
        }
        $http.post('/api/rooms', { name: roomName, info: roomInfo });
        roomName = '';
        roomInfo = '';
    };

    $scope.deleteRoom = function(room) {
        $http.delete('/api/rooms/' + room._id);
    };

    $scope.$on('$destroy', function () {
        socket.unsyncUpdates('room');
    });

    $scope.open = function(size) {
        var modalInstance = $modal.open({
            templateUrl: '/app/main/_modal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                room: function () {
                    return $scope.room;
                }
            }
        });

        modalInstance.result.then(function (room) {
            var roomName = room.name;
            var roomInfo = room.info;
            $scope.addRoom(roomName, roomInfo);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
})
.controller('ModalInstanceCtrl', function($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close($scope.room);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
