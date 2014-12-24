(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.controllers')
        .controller('PoolController', ['$rootScope', '$scope', 'IdeaService',
            function ($rootScope, $scope, IdeaService) {
                $rootScope.$emit('loadIdeasStart');

                $scope.ideas = IdeaService.ideas();

                $scope.ideas
                    .$loaded()
                    .finally(function () {
                        $rootScope.$emit('loadIdeasEnd');
                    });
            }]);
})(angular);
