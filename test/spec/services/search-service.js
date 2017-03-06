'use strict';

describe('Service: searchService', function () {

  // load the service's module
  beforeEach(module('spotifyApp'));

  // instantiate service
  var searchService, $httpBackend;

  beforeEach(inject(function (_searchService_, _$httpBackend_) {
    searchService = _searchService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should exist', function () {
    expect(!!searchService).toBe(true);
  });

  it('should exist search()', function() {
    expect(searchService.search).toBeDefined();
  });
  it('should exist byType()', function() {
    expect(searchService.byType).toBeDefined();
  });

  it("should return promise search()", function () {
    $httpBackend.whenGET("https://api.spotify.com/v1/search?limit=5&offset=0&q=guns&type=artist").respond({artists: []});
    $httpBackend.whenGET("https://api.spotify.com/v1/search?limit=5&offset=0&q=guns&type=album").respond({albums: []});
    searchService.search("guns").then(function(res) {
      expect(res).toEqual({ artists: [], albums: [] });
    });
    $httpBackend.flush();
  });

  it("should return promise byType()", function () {
    $httpBackend.whenGET("https://api.spotify.com/v1/search?limit=5&offset=0&q=guns&type=artist").respond();
    searchService.byType('artist', 'guns').then(function(res) {
      expect(res).toBeDefined();
    });
    $httpBackend.flush();
  });



});
