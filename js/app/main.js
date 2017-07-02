angular.module('sw', ['ui.bootstrap', 'ngSanitize', 'ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // use the HTML5 History API
    $locationProvider.html5Mode(true);

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
        templateUrl: 'js/app/views/projects.html'
      });
  }])

  .controller('MainCtrl', ['$scope', 'projects', '$anchorScroll', '$location', '$timeout', '$route', '$rootScope',
    function ($scope, projects, $anchorScroll, $location, $timeout, $route, $rootScope) {
      $scope.splashActiveVariable = false;
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
        }, 0);
      });
    }])

  // controller for pages without a current project
  .controller('StaticCtrl', ['$scope', 'projects',
    function ($scope, projects) {
      $scope.projects = projects;
      $scope.splashActiveVariable = false;
    }])

  // sort project list by custom order
  .filter('orderObjectBy',
    function(){
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
   })

   .run(['$rootScope', '$route', '$location', '$window',
     function($rootScope, $route, $location, $window) {
       $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
       //Change page title, based on Route information
       $rootScope.title = $route.current.title;

       // initialise google analytics (http://jasonwatmore.com/post/2015/11/07/angularjs-google-analytics-with-the-ui-router)
        $window.ga('create', 'UA-101955661-1', 'auto');

        // track pageview on state change
        $rootScope.$on('$stateChangeSuccess', function (event) {
            $window.ga('send', 'pageview', $location.path());
        });
     });
}]);;
