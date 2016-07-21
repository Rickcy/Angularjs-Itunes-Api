'use strict';
angular.module('myApp')
  .directive('scrollBar', function () {

    return {
      restrict: 'EA',

      link: function(scope, element) {

      
        element.mCustomScrollbar({
          setHeight: 75,
          theme: 'light-thick'
        });
      }
    };
  });
