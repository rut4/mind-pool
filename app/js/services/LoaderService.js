(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.services')
        .service('LoaderService', ['$rootScope',
            function ($rootScope) {
                function showLoader() {
                    $rootScope.$emit('loaderShow', '');
                }

                function hideLoader() {
                    $rootScope.$emit('loaderHide', '');
                }

                function eventFactory() {
                    return [
                        'login',
                        'register',
                        'makeIdea',
                        'loadIdeas',
                        'removeIdea',
                        'loadIdea'
                    ];
                }

                var events = eventFactory();
                for (var i = 0; i < events.length; i++) {
                    $rootScope.$on(events[i] + 'Start', showLoader);
                    $rootScope.$on(events[i] + 'End', hideLoader);
                }
            }]);
})(angular);
