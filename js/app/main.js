angular.module('sw', ['ui.bootstrap', 'ngSanitize', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/projects/:projectId', {
        title: 'project',
        controller: 'MainCtrl',
        templateUrl: 'js/app/views/project.html'
      })
      .when('/projects', {
        title: 'projects',
        controller: 'StaticCtrl',
        templateUrl: 'js/app/views/projects.html'
      })
      .when('/info', {
        title: 'info',
        controller: 'StaticCtrl',
        templateUrl: 'js/app/views/info.html'
      })
      .when('/contact', {
        title: 'contact',
        controller: 'StaticCtrl',
        templateUrl: 'js/app/views/contact.html'
      })
      .otherwise({
        title: '',
        controller: 'StaticCtrl',
        templateUrl: 'js/app/views/splash.html'
      });
  }])

  .controller('MainCtrl', ['$scope', 'projects', '$anchorScroll', '$location', '$timeout', '$route', '$rootScope',
    function ($scope, projects, $anchorScroll, $location, $timeout, $route, $rootScope) {
    $scope.projects = projects;

    function setCurrentProject(projectId) {
      $scope.currentProject = projects[projectId];
    }

    if ($route.current.params.projectId) {
      setCurrentProject($route.current.params.projectId);
    }

    $rootScope.$on('$locationChangeSuccess', function () {
      $timeout(function() {
        var projectId = $route.current.params.projectId;
        setCurrentProject(projectId);

        /*var easeDurationInMiliseconds = 0;
        $('html, body').animate({
          scrollTop: angular.element('.current-project').offset().top
        }, easeDurationInMiliseconds);*/
      }, 0);
    });
  }])

  .controller('StaticCtrl', ['$scope', 'projects',
    function ($scope, projects) {
      $scope.projects = projects;
    }])

  .filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });
    return array;
 }
});;
