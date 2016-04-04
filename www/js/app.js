angular.module('ucc', ['ionic','ngCordova', 'ngMap', 'ionic.service.core', 'ucc.controllers','ucc.myservice'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.incidents', {
      url: '/incidents',
      views: {
        'menuContent': {
          templateUrl: 'templates/incidents.html',
          controller: 'IncidentsCtrl'
        }
      }
    })

    .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
         templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
   
  })
 

  .state('app.single', {
    url: '/incidents/:incidentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/incident.html',
        controller: 'IncidentCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/incidents');
});
