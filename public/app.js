var app = angular.module('MidburnCampIndexApp', ['ngSanitize']);

app.controller('CampListController', function($scope, $http) {
    var API_URL = 'http://54.194.247.12';

    function _fetchCampsAPI() {
        $http.get(API_URL + '/camps_published').then(function(res) {
            $scope.camps = res.data.published_camps;
        }).catch(function(err) {
            alert('No camps found.');
        });
    }

    /*$scope._fetchContactPerson = function(id) {
        $http.get(API_URL + '/camps_contact_person/' + id).then(function(res) {
            user_info = res.data.user;
            $scope.fullName = user_info.fullName;
            $scope.email = user_info.email;
            $scope.phone = user_info.phone;
        }).catch(function(err) {
            alert('No contacts found.');
        });
    }*/
    //_fetchCampsAPI();

    function _getCampsJSON() {
        $http.get('/data.json').then(function(res) {
            $scope.camps = res.data.ToPublish;
        }).catch(function(err) {
            alert('No camps found.');
        });
    }

    _getCampsJSON();
});

app.directive('camps-index', function() {
    return {restrict: 'E', templateUrl: 'templates/list.html', replace: true, controller: 'CampListController'}
});