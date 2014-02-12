'use strict';

angular.module('dogentineApp')
  .controller('CardCtrl', function ($scope, $stateParams, $http, $resource) {
    var id = $stateParams.card_id;
    var Card = $resource('/api/cards/:cardId', {cardId: '@id'});
    var card = Card.get({'cardId': id});
    $http.get('/api/wows')
      .success(function (data) {
        $scope.wows = data;
      });
    $scope.card = card;
  });
