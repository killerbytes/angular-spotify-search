'use strict';

/**
 * @ngdoc function
 * @name spotifyApp.controller:ArtistCtrl
 * @description
 * # ArtistCtrl
 * Controller of the spotifyApp
 */
angular.module('spotifyApp')
  .controller('ArtistCtrl', function ($scope, $routeParams, $location, artistService) {

    $scope.id = $routeParams.id;
    $scope.currentPage = $routeParams.page;
    let page = $routeParams.page > 1 ? $routeParams.page-1 : 0;

    $scope.pageChanged = function() {
      $location.search('page', $scope.currentPage);
    };

    artistService.get($scope.id).then(res=>{
      $scope.model = res;
    })

    $scope.loading = true;
    artistService.getAlbums($scope.id, page).then(res=>{
      $scope.albums = res;
      $scope.loading = false;
    })

  });
