'use strict';

/**
 * @ngdoc directive
 * @name spotifyApp.directive:searchBar
 * @description
 * # searchBar
 */
angular.module('spotifyApp')
  .directive('searchBar', function ($location, searchService) {
    return {
      templateUrl: 'views/directives/search-bar.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        const t = {
          artist: 'artists',
          album: 'albums'
        }
        scope.button = {};
        scope.$location = $location;

        scope.$watch('$location.path()', function(locationPath) {
          scope.query = null;
          scope.model = null;
        });

        scope.submit = function(q){
          if(!scope.query){
            scope.model = null;
            return false;
          }
          searchService.search(scope.query).then(res=>{
            scope.model = res;
            scope.button.artist = true;
            scope.button.album = true;
          });
        };

        scope.more = function(type){
          let data = scope.model[t[type]];
          let offset = data.offset+data.limit;

          searchService.byType(type, scope.query, data.limit, offset).then(res=>{
            let model = scope.model[t[type]];
            let result = res.data[t[type]];
            let items  = [...model.items, ...result.items];

            if(result.offset + result.limit >= result.total){
              scope.button[type] = false;
            }
            scope.model[t[type]] = result;
            scope.model[t[type]].items = items;
          });

        }
      }
    };
  });
