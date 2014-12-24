(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.controllers', [])
        .controller('AuthController', ['$scope', '$rootScope', '$location', 'Auth', 'LoaderService',
            function ($scope, $rootScope, $location, Auth, _) {
                $scope.isLoggedIn = function () {
                    return Auth.isLoggedIn();
                };

                $scope.logIn = function (user) {
                    $scope.loginError = null;

                    $rootScope.$broadcast('loginStart');

                    Auth.logIn(user)
                        .then(
                            function () {
                                $location.path('/');
                            },
                            function (error) {
                                $scope.loginError = error.message;
                            }
                        )
                        .finally(
                            function () {
                                $rootScope.$broadcast('loginEnd');
                            }
                        );
                };

                $scope.logOut = function () {
                    Auth.logOut();
                };

                $scope.register = function (user) {
                    if (user.password != user.confirmPassword) {
                        $scope.registerError = "Passwords don't match";
                        return;
                    }

                    $rootScope.$broadcast('registerStart');

                    Auth.register(user)
                        .then(
                            function () {
                                $scope.logIn(user);
                            },
                            function (error) {
                                $scope.registerError = error.message;
                            }
                        )
                        .finally(
                            function () {
                                $rootScope.$broadcast('registerEnd');
                            }
                        );
                };
            }]);
})(angular);
