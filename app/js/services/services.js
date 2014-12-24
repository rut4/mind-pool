(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.services', ['firebase'])
        .config(function ($provide) {
            $provide.value('firebaseUrl', 'https://mind-pool.firebaseio.com/');
        });
})(angular);
