describe('HomeController', function(){
  var $scope;

  beforeEach(module('bloctime'));

  beforeEach(inject(function($rootScope, $controller, $interval, $filter) {
    $scope = $rootScope.$new();
    $controller('HomeController', {$scope: $scope, $interval: $interval, $filter: $filter});
  }));

  it('should decrement the time', function() {
    $scope.countDown();
    expect($scope.time).to.equal(24);
  });
})
