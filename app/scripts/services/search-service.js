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
      let d = $q.defer();
      let reqs = [
        byType('artist', q),
        byType('album', q)
        ]
      $q.all(reqs).then(res=>{
        d.resolve({
          artists: res[0].data.artists,
          albums: res[1].data.albums
        });
      })
      return d.promise;
    }

    function byType(type, q, limit=5, offset=0){
      let config = {
        params: {
          q,
          limit,
          offset,
          type: type
        }
      }
      return $http.get(`${apiUrl}/search`, config);
    }

    return {
      search: search,
      byType: byType
    };
  });
