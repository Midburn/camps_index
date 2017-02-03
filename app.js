var app = angular.module('MidburnCampIndexApp', []);

app.controller('CampListController', function($scope, $http) {
    function _getCamps() {
        $http.get('http://localhost:3000/camps_published').then(function(res) {
            $scope.camps = res.data.published_camps;
        }).catch(function(err) {
            alert('No camps found.');
        });
    }

    $scope._fetchContactPerson = function(id) {
        $http.get('http://localhost:3000/camps_contact_person/' + id).then(function(res) {
            user_info = res.data.user;
            $scope.fullName = user_info.fullName;
            $scope.email = user_info.email;
            $scope.phone = user_info.phone;
        }).catch(function(err) {
            alert('No contacts found.');
        });
    }
    // $scope.changeOrderBy = function(orderByValue) {
    //     $scope.orderCamps = orderByValue;
    // }
    _getCamps();
});
