/**
 * Created by Nate on 03-Jan-16.
 */

var app = angular.module('MidburnCampIndexApp', []);

app.controller('CampListController', function ($scope) {

    //var post_GetCamps = {
    //    method: 'POST',
    //    url: '/',
    //    contentType: 'application/json',
    //    dataType: 'json',
    //    data: '{}'
    //}
    //
    //$http(post_GetCamps).then(function (data) {
    //
    //    // success
    //    console.log("Data: " + data);
    //
    //}, function () {
    //    // failure
    //    console.log("Error: failed to init new game");
    //});

    var CampData = [{
        campId: 1,
        campStatus: 0,
        campName: 'Sunrise Kingdom',
        campShortDesc: 'We\'re a sound camp at MidBurn, playing tech house, deep house and techno.',
        campFullDesc: 'Sunrise Kingdom is a group of Israeli burners (Burning Man addicts...) dedicates to bring you the music and sounds we love. Started for the 2014 Midburn, the Israeli Burning Man official regional, and representing the playa spirit in other events too.',
        campWebsite: 'http://soundcloud.com/sunrise-kingdom',
        campAvatar: 'content/sunrise_kingdom.jpg',
        campContacts: [
            {
                id: 1,
                name: 'Sivan',
                info: 'Sivan@burncamp.com'
            },
            {
                id: 1,
                name: 'David',
                info: 'David@mycampmail.com'
            }
        ],
        campIsOpen: true
    },
        {
            campId: 2,
            campStatus: 0,
            campName: 'Some Other Camp',
            campShortDesc: 'We\'re a bar camp at MidBurn, dressing as clowns & serving drinks to everyone.',
            campFullDesc: 'Wow!',
            campWebsite: 'http://soundcloud.com/sunrise-kingdom',
            campAvatar: 'content/camp-default-avatar.png',
            campContacts: [
                {
                    id: 1,
                    name: 'Sivan',
                    info: 'Sivan@burncamp.com'
                },
                {
                    id: 1,
                    name: 'David',
                    info: 'David@mycampmail.com'
                }
            ],
            campIsOpen: false
        },
    ]

    $scope.campData = CampData;
    $scope.campContacts = CampData.campContacts;

});
