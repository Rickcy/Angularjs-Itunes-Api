'use strict';

angular.module('myApp')
  .directive('movieLink', ['$state', '$filter', function ($state, $filter) {
    return {
      restrict: 'A',
      scope: {
        movieLink: '@',
        selectedMovieIndex: '=',
        movies: '='
      },
      link: function (scope, element) {

       
        var index = scope.selectedMovieIndex;
        var viewName = $state.current.name;
        var length = scope.movies.length;
        var eClass = scope.movieLink;

        
        element.text(scope.movieLink);
        element.addClass(eClass);

        // 
        if (scope.movieLink == 'Предыдущий' && index == 1 || scope.movieLink == 'Следуйщий' && index == length) {
          element.attr('disabled', 'true');
          element.addClass('disabled');
          return;
        }

        var changeSelectedMovie = function() {
          
          if (scope.movieLink == 'Предыдущий' && index != length) {
            index = index + 1;
          }

        
          if (scope.movieLink == 'Следуйщий' && index > 1) {
            index = index - 1;
          }

          var selectedMovie = $filter('filter')(scope.movies, {index: index});
          var selectedMovie = selectedMovie[0];
          $state.go(viewName, {'name': selectedMovie.urlAlias});
        }

        
        element.bind('click', changeSelectedMovie);

      }
    };
  }]);
