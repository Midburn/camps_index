var app = angular.module('MidburnCampIndexApp', []);

app.controller('CampListController', function($scope, $http) {
    function _getCamps() {
        $http.get('http://localhost:3000/published_camps').then(function(res) {
            $scope.camps = [res.data.camps];
        });
    }
    // $scope.changeOrderBy = function(orderByValue) {
    //     $scope.orderCamps = orderByValue;
    // }
    _getCamps();
});
