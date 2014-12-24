(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.services')
        .factory('FirebaseService', ['firebaseUrl', '$firebase', '$firebaseAuth',
            function (firebaseUrl, $firebase, $firebaseAuth) {
                var ref = new Firebase(firebaseUrl),
                    authObj = $firebaseAuth(ref);

                return {
                    isLoggedIn: function () {
                        return !!authObj.$getAuth();
                    },
                    logIn: function (user) {
                        return authObj.$authWithPassword(user);
                    },
                    logOut: function () {
                        authObj.$unauth();
                    },
                    register: function (email, password) {
                        return authObj.$createUser(email, password);
                    },
                    getAuth: function () {
                        return authObj.$getAuth();
                    },
                    asArray: function (entity) {
                        return $firebase(entity ? ref.child(entity) : ref)
                            .$asArray();
                    },
                    asObject: function (entity) {
                        return $firebase(entity ? ref.child(entity) : ref)
                            .$asObject();
                    }
                };
            }]);
})(angular);
