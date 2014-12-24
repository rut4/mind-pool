(function (angular, undefined) {
    'use strict';

    angular.module('poolApp.controllers')
        .controller('DashboardController', ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'IdeaService', 'Auth',
            function ($scope, $rootScope, $mdDialog, $mdToast, IdeaService, Auth) {

                $rootScope.$emit('loadIdeasStart');

                $scope.ideas = IdeaService.ideasAsArray();
                $scope.ideas
                    .$loaded()
                    .finally(function () {
                        $rootScope.$emit('loadIdeasEnd');
                    });

                $scope.newIdea = function ($event) {
                    $mdDialog.show({
                        targetEvent: $event,
                        templateUrl: '../../partials/new-idea.html',
                        controller: 'DashboardController',
                        clickOutsideToClose: false
                    });
                };

                $scope.createIdea = function (idea) {
                    $rootScope.$emit('makeIdeaStart');

                    idea.uid = Auth.getUserId();

                    $scope.ideas
                        .$add(
                            idea
                        )
                        .then(
                            function () {
                                $mdToast.show({
                                    template: '<md-toast>The idea was saved successfully!</md-toast>',
                                    position: 'top right'
                                });
                            },
                            function () {
                                $mdToast.show({
                                    template: '<md-toast>:( An error occurred while saving the idea</md-toast>',
                                    position: 'top right'
                                });
                            }
                        )
                        .finally(function () {
                            $mdDialog.hide();
                            $rootScope.$emit('makeIdeaEnd');
                        });
                };

                $scope.cancelNewIdea = function () {
                    $mdDialog.hide();
                };

                $scope.removeIdea = function (idea) {
                    $rootScope.$emit('removeIdeaStart');

                    $scope.ideas
                        .$remove(
                            idea
                        )
                        .then(
                            function () {
                                $mdToast.show({
                                    template: '<md-toast>The idea was removed successfully!</md-toast>',
                                    position: 'top right'
                                });
                            },
                            function () {
                                $mdToast.show({
                                    template: '<md-toast>:( An error occurred while removing the idea</md-toast>',
                                    position: 'top right'
                                });
                            }
                        )
                        .finally(function () {
                            $mdDialog.hide();
                            $rootScope.$emit('removeIdeaEnd');
                        });
                };

                $scope.filterIdeaByCurrentUser = function (idea) {
                    return idea.uid === Auth.getUserId();
                };
            }]);
})(angular);
