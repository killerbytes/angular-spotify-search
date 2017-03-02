'use strict';

/**
 * @ngdoc directive
 * @name spotifyApp.directive:searchItem
 * @description
 * # searchItem
 */
angular.module('spotifyApp')
  .directive('searchItem', function () {
    return {
      templateUrl: 'views/directives/search-item.html',
      restrict: 'E',
      replace: true,
      scope: {
        item: "="
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
