'use strict';

describe('Service: artistService', function () {

  // load the service's module
  beforeEach(module('spotifyApp'));

  // instantiate service
  var artistService, $httpBackend;

  beforeEach(inject(function (_artistService_, _$httpBackend_) {
    artistService = _artistService_;
    $httpBackend = _$httpBackend_;

  }));

  it('should exist', function () {
    expect(artistService).toBeDefined();
  });

  it('should exist get()', function() {
    expect(artistService.get).toBeDefined();
  });
  it('should exist getAlbums()', function() {
    expect(artistService.getAlbums).toBeDefined();
  });

  it("should return promise get()", function () {
    $httpBackend.whenGET("https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6").respond({id: "1vCWHaC5f2uS3yhpwWbIA6"});
    artistService.get("1vCWHaC5f2uS3yhpwWbIA6").then(function(res) {
      expect(res).toEqual({id: "1vCWHaC5f2uS3yhpwWbIA6"});
    });
    $httpBackend.flush();
  });

  it("should return promise getAlbums()", function () {
    $httpBackend.whenGET("https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?limit=5&offset=0").respond({items: []});
    artistService.getAlbums("1vCWHaC5f2uS3yhpwWbIA6").then(function(res) {
      expect(res).toEqual({items: []});
    });
    $httpBackend.flush();
  });



});
