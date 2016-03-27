'use strict';

var config = {
  server: 'http://entzun.jazar.org:3030'
}
/**
 * @ngdoc overview
 * @name angularLightApp
 * @description
 * # angularLightApp
 *
 * Main module of the application.
 */
angular
  .module('angularLightApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFeathers'
  ])
  .config(function ($routeProvider,FeathersProvider) {
     FeathersProvider.defaults.server = config.server

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
