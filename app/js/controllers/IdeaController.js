(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.controllers')
        .controller('IdeaController', [
            '$scope', '$rootScope', '$routeParams', '$mdToast', 'IdeaService', 'LoaderService',
            function ($scope, $rootScope, $routeParams, $mdToast, IdeaService, _) {
                if ($routeParams.ideaId) {
                    $rootScope.$emit('loadIdeaStart');

                    $scope.idea = IdeaService.getIdea($routeParams.ideaId);
                    $scope.idea
                        .$loaded()
                        .finally(function () {
                            $scope.comments = IdeaService.comments();
                            $scope.comments
                                .$loaded()
                                .finally(function () {
                                    $rootScope.$emit('loadIdeaEnd');
                                });
                        });
                }

                $scope.byCurrentIdea = function (comment) {
                    return comment.ideaId === $scope.idea.$id;
                };

                $scope.addComment = function (comment) {
                    $rootScope.$emit('addCommentStart');

                    comment.ideaId = $scope.idea.$id;
                    $scope.comments
                        .$add(comment)
                        .then(
                            function () {
                                $mdToast.show({
                                    template: '<md-toast>The comment was added successfully!</md-toast>',
                                    position: 'top right'
                                });
                            },
                            function () {
                                $mdToast.show({
                                    template: '<md-toast>The comment was added successfully!</md-toast>',
                                    position: 'top right'
                                });
                            }
                        )
                        .finally(function () {
                            $rootScope.$emit('addCommentEnd');
                        });
                }
            }]);
})(angular);
