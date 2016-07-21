'use strict';


angular.module('myApp')
  .controller('movieController', ['$state', 'Movies', 'selectedMovie', 'moviesData','Bookmarks', function ($state, Movies, selectedMovie, moviesData, Bookmarks) {

    var self = this;

   
    self.movies = moviesData;

  
    self.bookmarksService = Bookmarks;

    
    self.selectedMovie = selectedMovie;

    
    self.movieTrailerUrl = Movies.gettingMovieTrailerUrl(self.selectedMovie.trackName, $state.current.data.trailer);

  }]);
