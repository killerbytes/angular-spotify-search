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
        var t = {
          artist: 'artists',
          album: 'albums'
        }
        scope.button = {};
        scope.loading = {}
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
          searchService.search(scope.query).then(function(res){
            scope.model = res;
            scope.button.artist = true;
            scope.button.album = true;
          });
        };

        scope.more = function(type){
          var data = scope.model[t[type]];
          var offset = data.offset+data.limit;
          scope.loading[type] = true;
          searchService.byType(type, scope.query, data.limit, offset).then(function(res){
            var model = scope.model[t[type]];
            var result = res.data[t[type]];
            var items  = model.items.concat(result.items);
            scope.loading[type] = false;

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
