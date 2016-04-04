//	allServies.js

angular.module('ucc.myservice',[])

.factory('allServiesServiceFact',['$http','$q','$timeout','$state','$cordovaGeolocation',function($http,$q,$timeout,$state, $cordovaGeolocation){

var allServiesServiceFact = {};

allServiesServiceFact.addMeetingToLacelStorage = () => {
	console.log('-------->addMeetingToLacelStorage-------->');
};

allServiesServiceFact.getMeetingToLacelStorage = function (){


var deferred = $q.defer();

$timeout(function(){

deferred.resolve('Jaga');

}, 1000000000);


	console.log('-------->getNewMeetingToLacelStorage-------->');
   return deferred.promise;
};

allServiesServiceFact.editMeetingToLacelStorage = function (){
  console.log('-------->editMeetingToLacelStorage-------->');
};

allServiesServiceFact.loadMap = function (data){


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
      content: "Here I am!"
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










  














};

allServiesServiceFact.loadIncidents = function (){
  console.log('-------->checkNewMeetingToLacelStorage-------->');

$http.get('data/incidents.json').success(function(data) {
  // $return data;
});

};
return allServiesServiceFact;

}])	


.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);