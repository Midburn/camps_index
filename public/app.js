/**
 * Midburn camp index application
 * @version: 1.2
 * @author: nate ben
 * @type {angularjs_app}
 */
var app = angular.module('camps_index', ['firebase']);

app.controller('CampListController', function($scope, $http, $firebaseObject) {
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
        $scope.reverse = ($scope.propertyName === propertyName) ?
            !$scope.reverse :
            true;
        $scope.propertyName = propertyName;
        $('.camp__wrapper').slice('5').addClass('aos-animate');
    };

    // serach callback
    $scope.$watch('searchCamp', function() {
        $('.camp__wrapper').slice('5').addClass('aos-animate');
    });

    function fetchCampsData() {

        function _fetchFromSparkAPI() {
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

        (function _fetchFromFirebase() {
            /**
             * fetch data from Firebase:Database
             * @type {JSON}
             */
            var ref = firebase.database().ref('ToPublish'),
                data_object = $firebaseObject(ref);

            // loading callback
            data_object.$loaded().then(function(data) {
                // bind data to DOM
                var camps = []
                angular.forEach(data, function(key, value) {
                    camps.push({
                        key: value
                    })
                })
                $scope.camps = camps;

                // loading animation
                $('#loading_spinner').remove();
            }).catch(function(error) {
                _fetchFromJSON();
            });
        })()

        function _fetchFromJSON() {
            /**
             * fallback method, fetch data from local JSON file
             * @type {JSON}
             */
            $http.get('/data.json').then(function(res) {
                $scope.camps = res.data.ToPublish;
            }).catch(function(err) {
                alert('No camps found.');
            });
        }
    }

    fetchCampsData();
});

app.directive('campsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/list.html',
        replace: true,
        controller: 'CampListController'
    }
});