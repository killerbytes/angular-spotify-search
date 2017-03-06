'use strict';

/**
 * @ngdoc service
 * @name spotifyApp.artistService
 * @description
 * # artistService
 * Factory in the spotifyApp.
 */
angular.module('spotifyApp')
  .factory('artistService', function ($http, $q, apiUrl) {
    // Service logic
    // ...

    function get(id){
      var d = $q.defer();
      $http.get(apiUrl + "/artists/" + id).then(function(res){
        d.resolve(res.data);
      },function(err){
        d.reject(err);
      })
      return d.promise;
    }

    function getAlbums(id, page, limit){
      page = page || 0;
      limit = limit || 5;

      var config = {
        params: {
          offset: page*limit,
          limit: limit
        }
      }
      var d = $q.defer();
      $http.get(apiUrl+ "/artists/" + id + "/albums", config).then(function(res){
        d.resolve(res.data);
      }, function(err){
        d.reject(err);
      })
      return d.promise;
    }

    // Public API here
    return {
      get: get,
      getAlbums: getAlbums
    };
  });
