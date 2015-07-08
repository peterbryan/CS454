var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource, $location) {
  var url = $location.absUrl().split('/');
   var comicID = url[url.length - 1];

  var factory = {};

  factory.routes = {
   comicAPI: $resource('character/:action', {}, {
      fetch: {method: 'GET', params: {name: '@name', action: 'search'}, isArray: true },
      details: {method: 'GET', params: {id: comicID, action: 'details'}, isArray: false},
      // boxoffice: {method: 'GET', params: {action: 'boxoffice'}, isArray: false },
      // review: {method: 'GET', params: {id: '@id', action: 'review'}, isArray: false }
    })
  };

  return factory;
});

app.controller('comicController', function($scope, resources) {

  $scope.searchComics = function() {
    resources.routes.comicAPI.fetch({name: $scope.searchname}, function done(response) {
      console.log(response);
      if (response.length > 0){
        console.log('im in');
        $scope.comic = { main: response[0], alternatives: response };
        console.log($scope.comic);
        //console.log($scope.comic.main);
      }
      else 
        $scope.comic = response.comic;
    });
  };


  $scope.switch= function(info){
    resources.routes.comicAPI.fetch({name: $scope.searchname}, function done(response) {
      console.log(info.name);
      console.log(response);
      if (response != null){
        console.log('im in 2');
        $scope.comic = { main: info, alternatives: response };
        console.log($scope.comic);
      }
      else 
        $scope.comic = response.comic;
    });
  };


});

  app.controller('comicDetailController', function($scope, resources) {

    function init() {
      resources.routes.comicAPI.details(function done(response) {
          console.log('returning this: \n');
          console.log(response);
          $scope.comic = response;
      });
    }
    init();

  });


$scope.togglePowers = function() {
    if ($scope.displayPowers) {
      $scope.pwrBtnText = '+ Show Powers';
      $scope.displayPowers = false;
    }
    else {
      $scope.pwrBtnText = '- hide Powers';
      $scope.displayPowers = true;
    }
  };


