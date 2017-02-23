/**
 * Midburn camp index application
 * @version: 1.1
 * @author: nate ben
 * @type {angularjs_app}
 */
var app = angular.module('camps_index', ['ngSanitize']);

app.controller('CampListController', function($scope, $http) {
    var API_URL = 'http://54.194.247.12',
        labels = {
            en: {
                search_placeholder: 'Serach a camp',
                members: 'New members',
                families: 'Accept families',
                homepage: 'Homepage',
                contact: {
                    btn: 'Contact',
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone'
                },
                misc: {
                    theend: 'the end...',
                    scrolltop: 'Back to top'
                }
            },
            he: {
                search_placeholder: 'חיפוש מחנה',
                members: 'פתוח למצטרפים',
                families: 'מקבל משפחות',
                homepage: 'דף הבית',
                contact: {
                    btn: 'יצירת קשר',
                    name: 'שם',
                    email: 'אימייל',
                    phone: 'טלפון'
                },
                misc: {
                    theend: 'זה הסוף...',
                    scrolltop: 'חזרה להתחלה'
                }
            }
        },
        lang = $('html').attr('lang');

    // multi-language labels
    $scope.lang = lang;
    $scope.labels = labels[lang];

    // init function
    $scope.init = function() {
        // init animations-on-scroll effect
        AOS.init({
            duration: 300
        });
    }

    /**
     * filters
     */
    $scope.sortBy = function(propertyName) {
        // sorting filters for the list
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
        $scope.propertyName = propertyName;
        $('.camp__wrapper').slice('5').addClass('aos-animate');
    };

    // data fetch
    function _fetchCampsAPI() {
        /**
         * data fetch from Spark API
         * @type {JSON}
         */
        $http.get(API_URL + '/camps_published').then(function(res) {
            $scope.camps = res.data.published_camps;
        }).catch(function(err) {
            alert('No camps found.');
        });
    }

    // serach callback
    $scope.$watch('searchCamp', function() {
        $('.camp__wrapper').slice('5').addClass('aos-animate');
    });

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
        /**
         * data fetch JSON file
         * @type {JSON}
         */
        $http.get('/data.json').then(function(res) {
            $scope.camps = res.data.ToPublish;
        }).catch(function(err) {
            alert('No camps found.');
        });
    }

    _getCampsJSON();
});

app.directive('campsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/list.html',
        replace: true,
        controller: 'CampListController'
    }
});
