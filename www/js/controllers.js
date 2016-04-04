angular.module('ucc.controllers', ['ucc.myservice'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup) {

  // Form data for the login modal
  //$scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// 


//feedback

// Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<textarea style="width:100%"></textarea>',
    title: 'Feedback',
    subTitle: 'Please Enter Your Feedback',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Send</b>',
        type: 'button-royal',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

};


})
.controller('IncidentsCtrl', function($scope, $http, allServiesServiceFact, NgMap) {
  $scope.incidents = [
  {
    "incidentID" : "1",
    "incidentName" : "ATM Skimming Event",
    "incidentDesc" : "Incident1",
    "incidentStartDate" : "12/16/2015 9:30 AM",
    "incidentEndDate" : "12/18/2015 9:10 AM",
    "notificationType" : "None",
    "incidentPriority" : "Green",
    "latitude" :"29.424122",
    "longitude" : " -98.493629",
    "locationName" : "San Antonio",
    "MSRImpact" : "No",
    "Category" : "Fraud",
    "incidentType" : "N/A"
  },
  {
    "incidentID" : "2",
    "incidentName" : "Tornado Warning",
    "incidentDesc" : "Incident2",
    "incidentStartDate" : "10/11/2015 10:30 PM",
    "incidentEndDate" : "10/15/2015 9:30 AM",
    "notificationType" : "OPREP",
    "incidentPriority" : "Green",
    "latitude" : "36.778259",
    "longitude" : "-119.417931",
    "locationName" : "California",
    "MSRImpact" : "No",
    "Category" : "Natural",
    "incidentType" : "Tornado"

  },
  {
    "incidentID" : "3",
    "incidentName" : "Lightning Notification",
    "incidentDesc" : "Incident3",
    "incidentStartDate" : "08/20/2014 11:30 AM",
    "incidentEndDate" : "08/22/2014 9:30 PM",
    "notificationType" : "INREP",
    "incidentPriority" : "Green",
    "latitude" : "40.72332346",
    "longitude" : "-74.00115967",
    "locationName" : "New York",
    "MSRImpact" : "No",
    "Category" : "Natural",
    "incidentType" : "Lightning"
  },

  {
    "incidentID" : "4",
    "incidentName" : "US Army Helicopter crash",
    "incidentDesc" : "Incident3",
    "incidentStartDate" : "08/20/2015 11:30 AM",
    "incidentEndDate" : "08/22/5 9:30 PM",
    "notificationType" : "None",
    "incidentPriority" : "Green",
    "latitude" : "35.489746",
    "longitude" : "-93.824272",
    "locationName" : "Arkansas",
    "MSRImpact" : "N/A",
    "Category" : "Brand",
    "incidentType" : "Member"
  },

  {
    "incidentID" : "5",
    "incidentName" : "Law Enforcement Contact",
    "incidentDesc" : "Incident3",
    "incidentStartDate" : "08/20/2015 11:30 AM",
    "incidentEndDate" : "08/22/5 9:30 PM",
    "notificationType" : "None",
    "incidentPriority" : "Green",
    "latitude" : "33.019844",
    "longitude" : "-96.698883",
    "locationName" : "Plano",
    "MSRImpact" : "N/A",
    "Category" : "Call for Assistance",
    "incidentType" : "Member"
  }

];


NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });


  // $scope.playlists = allServiesServiceFact.loadIncidents();
  // console.log($scope.playlists);  

// },function error(data){

// });
// console.log('in.....');

// $http.get('data/incidents.js').then(function(data) { 
//     console.log("success!");
//     $scope.playlists = data;
//         console.log(data);
//     });  


})

.controller('IncidentCtrl', function($scope, $stateParams) {


console.log($stateParams);


})

  
.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicPlatform) {

  // NgMap.getMap().then(function(map) {
  //   console.log(map.getCenter());
  //   console.log('markers', map.markers);
  //   console.log('shapes', map.shapes);
  // });

$ionicPlatform.ready(function() {
    // called when ready
 
 
var posOptions = {timeout: 100000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      var latLng = new google.maps.LatLng(lat, long);
 var mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
       $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

       //Wait until the map is loaded
google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
 var infoWindow = new google.maps.InfoWindow({
      content: "Here!"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
})
    }, function(err) {
      // error
    });


  var watchOptions = {
    timeout : 100000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
  });


  watch.clearWatch();
  // OR
  // $cordovaGeolocation.clearWatch(watch).then(function(result) {
  //     // success
  //     }, function (error) {
  //     // error
  //   });





 });






});




