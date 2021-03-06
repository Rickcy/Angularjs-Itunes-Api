'use strict';

angular.module('myApp')
  .factory('Bookmarks', ['localStorageService', '$filter', '$q', function (localStorageService, $filter, $q) {

    // Массив данных
    var data =[];
    data = localStorageService.get('bookmarks');
    data = data != null ? data : new Array();

    return {

     //Сохранение в закладках
      addToBookmarks: function(movie) {

        var deferred = $q.defer();

        
        var movieCopy = {};
        angular.copy(movie, movieCopy);

        
        var movies = data;

        
        movieCopy.originBookmark = 1;
        movieCopy.isBookmarked = true;

      
        movieCopy.index = movies.length ? (movies.length + 1) : 1;

        
        movies.push(movieCopy);

        
        var save = localStorageService.set('bookmarks', movies);

      
        if (save) {
         
          movie.isBookmarked = true;

          deferred.resolve({"saved": save, "error": false});
        }
      
        else {
          deferred.reject({"saved": save, "error": true});
        }

     
        return deferred.promise;
      },

     
      removeFromBookmarks: function(movie) {

        var deferred = $q.defer();

      
        var movies = data;

       
        var targetMovie = $filter('filter')(movies, {id: movie.id});

      
        movies.splice((targetMovie[0].index -1), 1);

       
        angular.forEach(movies, function(movie, index) {
          movie.index = (index + 1);
        });

       
        var deleted = localStorageService.set('bookmarks', movies);

     
        if (deleted) {

      
          movie.isBookmarked = false;

          deferred.resolve({"deleted": deleted, "error": false});
        }
       
        else {
          deferred.reject({"deleted": deleted, "error": true});
        }

      
        return deferred.promise;
      },

    
      getMovies: function() {
        var deferred = $q.defer();
        deferred.resolve(data);
        // Return promise object.
        return deferred.promise;
      },

    /
    isMovieBookmarked: function(movieId) {
      var movies = data;
      // Find the target movie from with in the movies array.
      var targetMovie = $filter('filter')(movies, {id: movieId});
      return targetMovie.length ? true : false;
    }
   }

  }]);
