(function() {
    'use strict';

    angular.module('angularFullstackApp')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];

    function ModalInstanceCtrl($scope, $modalInstance) {
        $scope.ok = function() {
            $modalInstance.close($scope.room);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }

})();
