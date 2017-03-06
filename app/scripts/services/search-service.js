'use strict';

/**
 * @ngdoc service
 * @name spotifyApp.searchService
 * @description
 * # searchService
 * Service in the spotifyApp.
 */
angular.module('spotifyApp')
  .service('searchService', function ($http, $q, apiUrl) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function search(q){
      var d = $q.defer();
      var reqs = [
        byType('artist', q),
        byType('album', q)
        ]
      $q.all(reqs).then(function(res){
        d.resolve({
          artists: res[0].data.artists,
          albums: res[1].data.albums
        });
      })
      return d.promise;
    }

    function byType(type, q, limit, offset){
      limit = limit || 5;
      offset = offset || 0;
      var config = {
        params: {
          q: q,
          limit: limit,
          offset: offset,
          type: type
        }
      }
      return $http.get(apiUrl + "/search", config);
    }

    return {
      search: search,
      byType: byType
    };
  });
