(function() {
    'use strict';

    angular.module('angularFullstackApp')
    .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['User', 'Auth', 'profile'];

    function SettingsCtrl(User, Auth, profile) {
        var vm = this;
        vm.errors = {};
        vm.userImage = profile.image.path;
        vm.userImageName = profile.image.name;

        vm.changePassword = function(form) {
            vm.submitted = true;
            if(form.$valid) {
                Auth.changePassword( vm.user.oldPassword, vm.user.newPassword )
                .then( function() {
                    vm.message = 'Password successfully changed.';
                })
                .catch( function() {
                    form.password.$setValidity('mongoose', false);
                    vm.errors.other = 'Incorrect password';
                    vm.message = '';
                });
            }
        };

        vm.changeImage = function() {
            if (vm.image !== 'undefined') {
                Auth.changeImage(vm.image, function(data) {
                    if (data.data.name.length) {
                        vm.userImage = data.data.path;
                        vm.userImageName = data.data.name;
                    }
                });
            }
        };

    }

})();
