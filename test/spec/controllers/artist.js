'use strict';

describe('Controller: ArtistCtrl', function () {
  var $controller,
  $scope,
  $q,
  $httpBackend,
  deferred,
  $location;

  // load the controller's module
  beforeEach(module('spotifyApp'));


  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$location_, _$httpBackend_, artistService) {
    $controller = _$controller_;
    $location = _$location_;
    $scope = _$rootScope_.$new();
    $q = _$q_;


    $controller('ArtistCtrl', { $scope: $scope, artistService: artistService });
  }));


  it('should change param page', function() {
    $scope.currentPage = 1;
    $scope.pageChanged();
    expect($location.search()).toEqual({page: 1});
  });


  it('should exist pageChanged()', function() {
    expect($scope.pageChanged).toBeDefined();
  });


});
