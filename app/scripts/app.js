var blocTime = angular.module('bloctime', ['ui.router']);

blocTime.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    templateUrl: '/templates/home.html'
  });
}]);

blocTime.controller('HomeController', ['$scope', '$interval', '$filter', function($scope, $interval, $filter) {
  $scope.title = "Welcome to Bloc Time!";
  $scope.time = 65;
  $scope.buttonLabel = "Start";
  // $scope.timeString = "" + $scope.time;
  var countDown = function() {
    $scope.time -= 1;
    $scope.buttonLabel = "Reset";
    if ($scope.time == 0) {
      $interval.cancel(interval);
    }
    $scope.timeString = $filter('remainingTime')($scope.time);
  }

  var interval = $interval(countDown, 1000);
}]);

blocTime.filter('remainingTime', function() {
  return function(seconds) {
    seconds = Number.parseFloat(seconds);
    if (Number.isNaN(seconds)) {
      return '-:--';
    }
    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);
    remainingSeconds = wholeSeconds % 60;
    var output = minutes + ':';
    if (remainingSeconds < 10) {
      output += '0';
    }
    output += remainingSeconds;
    return output;
  }
})