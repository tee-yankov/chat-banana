'use strict';

describe('Controller: RoomCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackApp'));

  var RoomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoomCtrl = $controller('RoomCtrl', {
      $scope: scope
    });
  }));

  it('should fetch a room', function () {
    expect(scope.room.length >= 1).toBe(true);
  });
});
