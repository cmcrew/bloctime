var blocTime = angular.module('bloctime', ['ui.router']);

blocTime.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    templateUrl: '/templates/home.html'
  });
}]);

blocTime.controller('HomeController', ['$scope', '$interval', function($scope, $interval) {
  $scope.title = "Welcome to Bloc Time!";
  $scope.time = 65;
  $scope.buttonLabel = "Start";
  $scope.timeString = "" + $scope.time;
  var countDown = function() {
    $scope.time -= 1;
    $scope.buttonLabel = "Reset";
    if ($scope.time == 0) {
      $interval.cancel(interval);
    }
    // See Bloc Jams Filter
    $scope.timeString = parseInt($scope.time/60, 10) + ":" + ($scope.time % 60);
  }

  var interval = $interval(countDown, 1000);
}]);