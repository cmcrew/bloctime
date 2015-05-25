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
  var promise;
  var onBreak = false;
  var workTime = 25;
  var breakTime = 5;

  $scope.title = "Welcome to Bloc Time!";
  $scope.setTimer = function() {
    if (onBreak) {
      $scope.time = breakTime;
    } else {
      $scope.time = workTime;
    }
  }
  $scope.setTimer();
  $scope.timeString = $filter('remainingTime')($scope.time);
  $scope.buttonLabel = "Start";
  
  $scope.start = function() {
    $scope.stop();
    promise = $interval(countDown, 1000);
  }
  $scope.stop = function() {
    $interval.cancel(promise);
  }
  var countDown = function() {
    $scope.time -= 1;
    $scope.buttonLabel = "Reset";
    if ($scope.time == 0) {
      $scope.stop();
      onBreak = !onBreak;
    }
    $scope.timeString = $filter('remainingTime')($scope.time);
  }
  $scope.updateTimer = function() { 
    if ($scope.buttonLabel === "Reset") {
      $scope.stop();
      $scope.setTimer();
      $scope.timeString = $filter('remainingTime')($scope.time);
      $scope.buttonLabel = "Start";
    } 
    else {
      $scope.start();
    }
  }
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