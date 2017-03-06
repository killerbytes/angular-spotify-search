'use strict';

describe('Directive: searchBar', function () {

  // load the directive's module
  beforeEach(module('spotifyApp'));
  beforeEach(module('foo'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should check template if loaded', inject(function ($compile) {
    element = angular.element('<search-bar></search-bar>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.html()).toContain('<input type="text" placeholder="Search..." ng-change="submit()" ng-model="query"');
  }));


});
