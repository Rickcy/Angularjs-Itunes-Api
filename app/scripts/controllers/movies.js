'use strict';


angular.module('myApp')
  .controller('moviesController', ['moviesData','Bookmarks', function (moviesData, Bookmarks) {

    var self = this;

    // Movies data.
    self.data = moviesData;

    // Bookmarks service 
    self.bookmarksService = Bookmarks;

  }]);
