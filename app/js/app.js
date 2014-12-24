(function (angular, undefined) {
    'use strict';

    var app = angular.module('poolApp',
        ['ngRoute', 'ngMaterial', 'ng.httpLoader', 'poolApp.services', 'poolApp.controllers']
    );

    app.config(['$routeProvider', 'httpMethodInterceptorProvider',
        function ($routeProvider, httpMethodInterceptorProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'AuthController'
                })
                .when('/register', {
                    templateUrl: 'partials/register.html',
                    controller: 'AuthController'
                })
                .when('/dashboard', {
                    templateUrl: 'partials/dashboard.html',
                    controller: 'DashboardController'
                })
                .when('/pool', {
                    templateUrl: 'partials/pool.html',
                    controller: 'PoolController'
                })
                .when('/idea/:ideaId', {
                    templateUrl: 'partials/idea.html',
                    controller: 'IdeaController'
                })
                .otherwise({
                    redirectTo: '/pool'
                });

            httpMethodInterceptorProvider.whitelistDomain('firebase.com');
        }]);

    app.run(['$rootScope', '$location', 'Auth',
        function ($rootScope, $location, Auth) {
            $rootScope.$on('$routeChangeStart', function (_, next) {
                if (!Auth.isLoggedIn() && next.originalPath != '/register') {
                    $location.path('/login');
                }
            });
        }]);
})(angular);

