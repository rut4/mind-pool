(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.controllers')
        .controller('IdeaController', ['$scope', '$rootScope', '$routeParams', 'IdeaService', 'LoaderService',
            function ($scope, $rootScope, $routeParams, IdeaService, _) {
                if ($routeParams.ideaId) {
                    $rootScope.$emit('loadIdeaStart');

                    $scope.idea = IdeaService.getIdea($routeParams.ideaId);
                    $scope.idea
                        .$loaded()
                        .finally(function () {
                            $rootScope.$emit('loadIdeaEnd');
                        });
                }
            }]);
})(angular);
