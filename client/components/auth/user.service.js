'use strict';

angular.module('angularFullstackApp')
.factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
    },
                     {
        changePassword: {
            method: 'PUT',
            params: {
                controller:'password'
            }
        },
        changeImage: {
            method: 'PUT',
            params: {
                controller:'image'
            }
        },
        get: {
            method: 'GET',
            params: {
                id:'me'
            }
        }
    });
});
