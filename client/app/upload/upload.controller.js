(function() {
    'use strict';

    angular.module('angularFullstackApp')
        .controller('UploadCtrl', UploadCtrl);

    UploadCtrl.$inject = ['$scope'];

    function UploadCtrl($scope) {
        $scope.message = 'Hello';
    }

})();
