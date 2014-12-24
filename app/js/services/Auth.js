(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.services')
        .factory('Auth', ['$rootScope', '$q', 'FirebaseService',
            function ($rootScope, $q, FirebaseService) {
                return {
                    isLoggedIn: function () {
                        return FirebaseService.isLoggedIn();
                    },
                    logIn: function (user) {
                        return FirebaseService.logIn(user);
                    },
                    logOut: function () {
                        FirebaseService.logOut();
                    },
                    register: function (user) {
                        return FirebaseService.register(user.email, user.password);
                    },
                    getUserId: function () {
                        return FirebaseService.getAuth() && FirebaseService.getAuth().uid;
                    }
                };
            }]);
})(angular);
