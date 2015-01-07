'use strict';

describe('Controller: RoomCtrl', function () {

    // load the controller's module
    beforeEach(module('angularFullstackApp'));
    beforeEach(module('socketMock'));

    var RoomCtrl,
        scope,
        $httpBackend,
        thisRoom;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        thisRoom = '548ac36f1fad20ee1d4209e9';
        $httpBackend.expectGET('/api/rooms/' + thisRoom)
            .respond('');
        $httpBackend.expectGET('app/main/main.html')
            .respond('');

        scope = $rootScope.$new();
        RoomCtrl = $controller('RoomCtrl', {
            $scope: scope
        });
    }));

    it('should fetch a room', function () {
        $httpBackend.flush();
        expect(typeof(scope.room)).toBe('string');
    });
});
