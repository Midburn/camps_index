/**
 * Midburn camp index application
 * @version: 1.1
 * @author: nate ben
 * @type {angularjs_app}
 */
var app = angular.module('camps_index', ['ngSanitize', 'firebase']);

app.controller('CampListController', function($scope, $http, $firebaseArray) {
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
        AOS.init({duration: 300});
    }

    /**
     * filters
     */
    $scope.sortBy = function(propertyName) {
        // sorting filters for the list
        $scope.reverse = ($scope.propertyName === propertyName)
            ? !$scope.reverse
            : true;
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

    function _getCampsJSON() {
        /**
         * fetch data from Firebase:Database
         * @type {JSON}
         */
        var ref = firebase.database().ref(),
            camps_array = $firebaseArray(ref);
        $scope.camps = camps_array;

        // loading callback
        camps_array.$loaded().then(function(data) {
            // loading animation
            $('#loading_spinner').remove();
        }).catch(function(error) {
            alert("Error lading camps\n\n---\n:", error);
        });
    }

    _getCampsJSON();
});

app.directive('campsList', function() {
    return {restrict: 'E', templateUrl: 'templates/list.html', replace: true, controller: 'CampListController'}
});
