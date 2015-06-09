// describe('HomeController', function(){
//   var $scope;

//   beforeEach(module('bloctime'));

//   beforeEach(inject(function($rootScope, $controller, $interval, $filter) {
//     $scope = $rootScope.$new();
//     $controller('HomeController', {$scope: $scope, $interval: $interval, $filter: $filter});
//   }));

//   it('should decrement the time', function() {
//     $scope.countDown();
//     expect($scope.time).to.equal(24);
//   });
// })

describe('remainingTimeFilter', function() {
  beforeEach(module('bloctime'));
  it('should convert milliseconds to minutes:seconds formatted time',
    inject(function(remainingTimeFilter) {
      expect(remainingTimeFilter(20)).to.equal("0:20");
  }));
})


describe('tasklistDirective', function() {
  beforeEach(module('bloctime'));
  var element;
  var scope;
  var $compile;

  beforeEach(inject(function ($rootScope, _$compile_) {

    scope = $rootScope;
    $compile = _$compile_;

    element = angular.element('<tasklist></tasklist>');

  }));
  it('should add task to the list', function() {
    debugger;
    scope.addTask();
    expect(scope.tasks)
  });
})
