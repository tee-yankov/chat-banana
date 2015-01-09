'use strict';

angular.module('angularFullstackApp')
.config(function ($stateProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
    })
    .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'vm',
        resolve: {
            Auth: 'Auth',
            profile: function(Auth) {
                Auth.refreshCurrentUser();
                return Auth.getCurrentUser().$promise;
            }
        },
        authenticate: true
    });
});
