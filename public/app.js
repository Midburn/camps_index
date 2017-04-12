/**
 * Midburn camp index application
 * @version: 1.2
 * @author: nate ben
 * @type {angularjs_app}
 */
var app = angular.module('camps_index', ['ngSanitize']);

app.controller('CampListController', function($scope, $http) {
    var API_URL = '',
        labels = {
            en: {
                search_placeholder: 'Serach a camp',
                members: 'New members',
                families: 'Accept families',
                support_art: 'Support Art',
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
                support_art: 'תומך אומנות',
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
        updateView()
    };

    // search callback
    $scope.$watch('searchCamp', function() {
        updateView()
    });

    function updateView() {
      $('.camp__wrapper').slice('5').addClass('aos-animate');
    }

    (function fetchCampsData() {
        function _fetchFromSparkAPI() {
            /**
             * fetch data from Spark API
             * @type {JSON}
             */
            $http.get(API_URL).then(function(res) {
                if (res.data.camps.length) {
                  $scope.camps = res.data.camps;
                  $('#loading_spinner').fadeOut() // hide loading animation
                }
            }).catch(function(err) {
                // fallback to JSON file
                _fetchFromJSON()
            });
        }

        function _fetchFromJSON() {
            /**
             * fallback method, fetch data from local JSON file
             * @type {JSON}
             */
            $http.get('/data.json').then(function(res) {
                $scope.camps = res.data.ToPublish;
                $('#loading_spinner').fadeOut() // hide loading animation
            }).catch(function(err) {
                alert('No camps found.');
            });
        }
        // _fetchFromSparkAPI();
        _fetchFromJSON()
    })()
});

app.directive('campsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/list.html',
        replace: true,
        controller: 'CampListController'
    }
});
