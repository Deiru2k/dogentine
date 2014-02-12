'use strict';

angular.module('dogentineApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCrtl'
      })
      .state('card', {
        url: '/:card_id',
        templateUrl: 'views/card.html',
        controller: 'CardCtrl'
      });
  });
