(function() {
    'use strict';

    angular.module('angularFullstackApp')
    .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['$scope', '$http', 'socket', 'Auth', '$state'];

    function ChatCtrl($scope, $http, socket, Auth, $state) {
        var vm = this;
        vm.messages = [];
        vm.getCurrentUser = Auth.getCurrentUser;
        vm.isAdmin = Auth.isAdmin;
        var thisRoom = $state.params.roomId ? $state.params.roomId : '548ac36f1fad20ee1d4209e9';

        activate();

        vm.addMessage = function() {
            if(vm.newMessage === '') {
                return;
            }
            $http.post('/api/rooms/' + thisRoom, {messages: {name: vm.getCurrentUser()._id, message: vm.newMessage}});
            vm.newMessage = '';
        };

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('room');
        });

        function activate() {
            $http.get('/api/rooms/' + thisRoom)
            .success(function(data) {
                vm.messages = data.messages;
                socket.syncUpdates('room', vm.messages);
            })
            .error(function() {
                console.log('Error retrieving messages.');
            });
        }
    }

})();
