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
  beforeEach(module('app/templates/directives/tasks.html'));
  var element;
  var scope;
  var $compile;

  beforeEach(inject(function ($templateCache, $rootScope, _$compile_) {

    template = $templateCache.get('app/templates/directives/tasks.html');
		$templateCache.put('/templates/directives/tasks.html', template);

    scope = $rootScope;
    $compile = _$compile_;

    element = $compile(angular.element('<tasklist></tasklist>'))(scope);
    scope.$apply();
    isolateScope = element.isolateScope();

  }));
  it('should add task to the list', function() {
    isolateScope.tasks = [];
    isolateScope.tasks.$add = function(task){ isolateScope.tasks.push(task);};
    isolateScope.addTask();
    expect(isolateScope.tasks.length).to.equal(1);
  });
})
