'use strict';

angular.module('myApp')
  .factory('Movies', ['$http', '$q', '$sce', 'Bookmarks', function ($http, $q, $sce, Bookmarks) {


    function requestTopMoviesIds(moviesCount) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'https://itunes.apple.com/us/rss/topmovies/limit=' + moviesCount + '/json'
      })
      .success(function(data) {
          var moviesIds = [];
          // Get the top 30 movies IDs.
          angular.forEach(data.feed.entry, function(movie) {
            moviesIds.push(movie.id.attributes['im:id']);
          });
          deferred.resolve(moviesIds);
      })


      return deferred.promise;
    }


    function requestMoviesById(ids) {


      if (!angular.isArray(ids)) {
        return;
      }

      var deferred = $q.defer();
      $http.jsonp('https://itunes.apple.com/lookup', {params: { id: ids.join(), callback: 'JSON_CALLBACK'}})
        .success(function(movies) {

          angular.forEach(movies.results, function(movie, index) {


            movie.id = ids[index];


            movie.isBookmarked = Bookmarks.isMovieBookmarked(movie.id);


            movie.originBookmark = 0;


            movie.index = index + 1;


            movie.artworkUrl600 = movie.artworkUrl100.replace('100x100', "600x600");


            movie.urlAlias = movie.trackName.replace(/ /g, '-').toLowerCase();
          });

          deferred.resolve(movies.results);
        })
      // Return promise object.
      return deferred.promise;
    }

    // Public API here
    return {

      gettingMovies: function(moviesCount) {
        var deferred = $q.defer();

        moviesCount = angular.isDefined(moviesCount) ? moviesCount : 60;


        requestTopMoviesIds(moviesCount).then(function(moviesIds) {
          requestMoviesById(moviesIds).then(function(movies) {
            deferred.resolve(movies);
          })
        });


        return deferred.promise;
      },



      gettingMovieTrailerUrl: function(movieName, movieData) {


        var params = [];
        angular.forEach(movieData.params, function(value, param){
          this.push(param + '=' + value);
        }, params);


        params = '&' + params.join('&');

        return $sce.trustAsResourceUrl(encodeURI(movieData.basePath + movieName + ' ' + 'trailer' + params))
      }
    };
  }]);
