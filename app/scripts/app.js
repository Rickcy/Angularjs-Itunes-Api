'use strict';


angular
.module('myApp', [
    'ui.router',
    'ngAnimate',
    'config',
    'angular-loading-bar',
    'LocalStorageModule',
    'duScroll'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider){


    localStorageServiceProvider.setPrefix('myApp');


    var redirect = function($state, selectedMovie) {
      if (!angular.isDefined(selectedMovie)) {
       
        $state.go('main.movies');
      }
    };


    var gettingSelectedMovie = function(moviesData, $stateParams, $filter){
      var selectedMovie = $filter('filter')(moviesData, {urlAlias: $stateParams.name});
      return selectedMovie[0];
    };


    $urlRouterProvider.otherwise('/movies');

    $stateProvider
     
      .state('main',{
        url: '/',
        abstract: true,
        views: {

          'header': {
            templateUrl: 'views/main/header.html'
          },

          'footer': {
            templateUrl: 'views/main/footer.html'
          }
        }
       })

     
      .state('main.movies',{
        url: 'movies',
        views: {

          'content@': {
            templateUrl: 'views/pages/movies/movies.html',
            controller: 'moviesController',
            controllerAs: 'movies'
          },

          'preview@main.movies': {
            templateUrl: 'views/pages/movies/movie.preview.html'
          },

          'summary@main.movies': {
            templateUrl: 'views/pages/movies/movie.summary.html'
          }
        },
        resolve: {

          moviesData: function(Movies){
            return Movies.gettingMovies();
          }
        }
       })


      .state('main.bookmarks',{
        url: 'bookmarks',
        views: {

          'content@': {
            templateUrl: 'views/pages/movies/movies.html',
            controller: 'moviesController',
            controllerAs: 'movies'
          },

          'preview@main.bookmarks': {
            templateUrl: 'views/pages/movies/movie.preview.html'
          },

          'summary@main.bookmarks': {
            templateUrl: 'views/pages/movies/movie.summary.html'
          }
        },
        resolve: {
          moviesData: function(Bookmarks){
            return Bookmarks.getMovies();
          }
        }
       })

      .state('main.movie',{
        url: 'movie/{name}?originBookmark',
        abstract: true,
        resolve: {
          moviesData: function(Movies, Bookmarks, $stateParams){

            return (parseInt($stateParams.originBookmark)) ? Bookmarks.getMovies(): Movies.gettingMovies();
          }
        },
        data: {
          trailer: {
            basePath: 'http://www.youtube.com/embed/?listType=search&list=',
            params: {
              controls: 2,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              autoplay: 1,
              hd: 1
            }
          }
        }
      })

    
      .state('main.movie.movieInfo',{

        url: '^/movie/info/{name}?originBookmark',
        views: {
          'content@': {
            templateUrl: 'views/pages/movie/movieInfo.html',
            controller: 'movieController',
            controllerAs: 'movie'
          }
        },
        resolve: {

          selectedMovie: gettingSelectedMovie
        },
        onEnter: redirect,
        data: {
          breadcrumbs: 'info'
        }
      })

     
      .state('main.movie.trailer',{

        url: '^/movie/trailer/{name}?originBookmark',
        views: {
          'content@': {
            templateUrl: 'views/pages/movie/trailer.html',
            controller: 'movieController',
            controllerAs: 'movie'
          }
        },
        resolve: {

          selectedMovie: gettingSelectedMovie
        },
        onEnter: redirect,
        data: {
          breadcrumbs: 'trailer'
        }
      })
  }])
  .run([ '$rootScope', '$state', '$stateParams', 'localStorageService', 'Bookmarks', function ($rootScope, $state, $stateParams, localStorageService, Bookmarks) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.parseInt = parseInt;

   
    $rootScope.console = function(data) {
      return console.log(data);
    };

  
    $rootScope.localStorageService = localStorageService;
  }])
