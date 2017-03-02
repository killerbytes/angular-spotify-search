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
      let d = $q.defer();
      $http.get(`${apiUrl}/artists/${id}`).then(res=>{
        d.resolve(res.data);
      },err=>{
        d.reject(res.data);
      })
      return d.promise;
    }

    function getAlbums(id, page=0, limit=5){
      var config = {
        params: {
          offset: page*limit,
          limit
        }
      }
      let d = $q.defer();
      $http.get(`${apiUrl}/artists/${id}/albums`, config).then(res=>{
        d.resolve(res.data);
      }, err=>{
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
