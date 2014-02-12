/**
 * Created by ilya on 12/02/14.
 */

'use strict';

function getRandomizer(bottom, top) {
  return function() {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
  };
}

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}


angular.module('dogentineApp').
  directive('dogetext', function () {
    var directiveDefinitionObject = {
      controller: function($element) {
        var pos = $('.valentine').position();

        var size = {
          height: $('.valentine').height(),
          width: $('.valentine').width()
        };

        var x_random = getRandomizer(pos.top+50, pos.top+size.height-50);
        var y_random = getRandomizer(pos.left+50, pos.left+size.width-300);
        $element.css({
          'position': 'absolute',
          'top': x_random(),
          'left': y_random(),
          'z-index': 1,
          'color': get_random_color()
        });
      }
    };
    return directiveDefinitionObject;
  });