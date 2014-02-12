'use strict';

angular.module('dogentineApp')
  .controller('CardCtrl', function ($scope, $stateParams, $http, $resource) {
    var id = $stateParams.card_id;
    var Card = $resource('/api/cards/:cardId', {cardId: '@id'});
    var card = Card.get({'cardId': id});
    var Wow = $resource('/api/wows');
    var wows = Wow.query();
    $scope.card = card;
    $scope.wows = wows;
  });
