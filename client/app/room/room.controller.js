(function() {
    'use strict';

    angular.module('angularFullstackApp')
    .controller('RoomCtrl', RoomCtrl);

    RoomCtrl.$inject = ['$scope', '$http', '$state'];

    function RoomCtrl($scope, $http, $state) {
        var thisRoom = $state.params.roomId ? $state.params.roomId : '548ac36f1fad20ee1d4209e9';
        $scope.room = {};

        $http.get('/api/rooms/' + thisRoom)
        .success(function(data) {
            $scope.room = data;
            $scope.room.valid = true;
        })
        .error(function() {
            $scope.room.valid = false;
        });
    }

})();
