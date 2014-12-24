(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.services')
        .factory('IdeaService', ['$q', 'FirebaseService', 'Auth',
            function ($q, FirebaseService, Auth) {
                return {
                    ideas: function () {
                        return FirebaseService.asArray('ideas');
                    },
                    getIdea: function (id) {
                        return FirebaseService.asObject('ideas/' + id);
                    },
                    comments: function () {
                        return FirebaseService.asArray('comments');
                    }
                };
            }]);
})(angular);
