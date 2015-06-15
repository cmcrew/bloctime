var blocTime = angular.module('bloctime', ['ui.router', 'firebase']);

blocTime.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    templateUrl: '/templates/home.html'
  });
}]);

blocTime.factory('TaskFactory', ['$firebase', function($firebase) {
  var ref = new Firebase("https://glaring-heat-213.firebaseio.com/");
  var sync = $firebase(ref);
  tasks = sync.$asArray();
  return {
    all: tasks
  };
}]);

blocTime.controller('HomeController', ['$scope', '$interval', '$filter', function($scope, $interval, $filter) {
  completedWorkSessions = 0;
  onBreak = false;
}]);

blocTime.directive('tasklist', ['TaskFactory', function(TaskFactory) {
  return {
    templateUrl: '/templates/directives/tasks.html',
    replace: true,
    restrict: 'E',
    scope: {},
    link: function(scope, element, attributes) {
      scope.tasks = TaskFactory.all;
      scope.addTask = function() {
        if (scope.newTask === "") return;
        var task = {task: scope.newTask, created_at: Firebase.ServerValue.TIMESTAMP}
        scope.tasks.$add(task);
        scope.newTask = "";
      };
      scope.buttonLabel = "Add task";
    }
  };
}]);

blocTime.directive('timer', ['$interval','$filter', function($interval, $filter) {
  return {
    templateUrl: '/templates/directives/timer.html',
    replace: true,
    restrict: 'E',
    scope: {},
    link: function(scope, element, attributes) {
      var $timer = element;
      var promise;
      var dingSound = new buzz.sound( "/media/ding.mp3", {
        preload: true
      }); 
      scope.isPaused = false;
      scope.buttonLabel = "Start";
      scope.setTimer = function() {
        if (onBreak) {
          if(completedWorkSessions % 4 === 0) {
            scope.time = attributes.longBreakTime;
          } else {
            scope.time = attributes.breakTime;
          }
        } else {
          scope.time = attributes.workTime;
        }
      }
      scope.setTimer();
      scope.pauseButtonShown = function(){
         return scope.buttonLabel !== "Start" && !scope.isPaused;
      }
      scope.start = function() {
        scope.showPauseButton = true;
        scope.stop();
        promise = $interval(scope.countDown, 1000);
      }
      scope.stop = function() {
        scope.showPauseButton = false;
        $interval.cancel(promise);
      }
      scope.pauseTimer = function() {
        scope.isPaused = true;
        scope.stop();
      }
      scope.resumeTimer = function() {
        scope.isPaused = false;
        scope.start();
      }
      scope.countDown = function() {
        scope.time -= 1;
      }
      scope.updateTimer = function() { 
        if (scope.buttonLabel === "Reset") {
          scope.stop();
          scope.setTimer();
          scope.buttonLabel = "Start";
        } 
        else {
          scope.start();
          scope.buttonLabel = "Reset";
        }
        scope.isPaused = false;
      }
      scope.$watch('time', function(newVal, oldVal) {
        if (newVal === 0) {
          dingSound.play();
          scope.stop();
          if (!onBreak) {
            completedWorkSessions++;     
          }
          onBreak = !onBreak;
        }
      });
    }
  };
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
});
