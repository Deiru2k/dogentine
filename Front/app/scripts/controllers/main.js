/**
 * Created by ilya on 12/02/14.
 */

'use strict';

angular.module('dogentineApp')
  .controller('MainCrtl', function ($scope, $http, $state) {
    $http.get('/api/cards/count')
      .success(function (data) {
        $scope.cards = data.counter;
      });
    $http.get('/api/wows/count')
      .success(function (data) {
        $scope.wows = data.counter;
      });
    $scope.submit_doge = function () {
      $http.post('/api/cards', $scope.card)
        .success(function (data) {
          if ($scope.wowser !== "") {
            $http.post('/api/wows', {'wowser': $scope.wowser})
              .success(function (){});
          }
          $state.go('card', {'card_id': data.$oid});
        });
    };
  });


/*
[{"wowser": "Wow"},
{"wowser": "Such valentine"},
{"wowser": "Many wishes"},
{"wowser": "Much Regards"}]
 */