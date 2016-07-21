'use strict';


angular.module('myApp')
  .controller('moviesController', ['moviesData','Bookmarks', function (moviesData, Bookmarks) {

    var self = this;

    // Данные фильмов.
    self.data = moviesData;

    // Закладки.
    self.bookmarksService = Bookmarks;

  }]);
