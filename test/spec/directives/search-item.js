'use strict';

describe('Directive: searchItem', function () {

  // load the directive's module
  beforeEach(module('spotifyApp'));
  beforeEach(module('foo'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should check template if loaded', inject(function ($compile) {
    element = angular.element('<search-item></search-item>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.html()).toContain('<h4 class="media-heading ng-binding"></h4>');
  }));
});
