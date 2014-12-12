'use strict';

angular.module('angularFullstackApp')
.controller('ChatCtrl', function ($scope, $http, socket, Auth, $state) {
    $scope.messages = [];
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isAdmin = Auth.isAdmin;
    var thisRoom = $state.params.roomId ? $state.params.roomId : '548ac36f1fad20ee1d4209e9';

    $http.get('/api/rooms/' + thisRoom)
    .success(function(data) {
        $scope.messages = data.messages;
        socket.syncUpdates('room', $scope.messages);
        console.log($scope.messages);
    })
    .error(function() {
        console.log('Error retrieving messages.');
    });

    $scope.addMessage = function() {
        if($scope.newMessage === '') {
            return;
        }
        $http.post('/api/rooms/' + thisRoom, {messages: {name: $scope.getCurrentUser()._id, message: $scope.newMessage}});
        $scope.newMessage = '';
    };

    /*$scope.deleteMessage = function(message) {
        $http.delete('/api/rooms/' );
    };

    $scope.editMessage = function(message) {
        $scope.editedMessage = {};
        $scope.editedMessage.content = message.message;
        $scope.editedMessage.id = message._id;
    };

    $scope.submitEdit = function() {
        $http.put('/api/rooms/' + thisRoom + '/' + $scope.editedMessage.id, {message:$scope.editedMessage.content});
        delete $scope.editedMessage;
    };*/

    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('room'); 
    });
});
