'use strict';

var awesomeApp = angular.module('awesomeApp', ['ngCookies', 'ngRoute', 'ui.bootstrap', 'flash', 'restangular']);
awesomeApp.config(['$routeProvider', '$locationProvider', 'RestangularProvider', function($routeProvider, $locationProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
	$routeProvider
	.when('/', {
		templateUrl: 'partials/index.html'
	})
	.when('/student', {
		templateUrl: 'partials/student.html',
		controller: 'QuizDescriptorCtrl',
		controllerAs: 'quizDescriptors'
	})
	.when('/instructor', {
		templateUrl: 'partials/instructor.html',
		controller: 'QuizDescriptorCtrl',
		controllerAs: 'quizDescriptors'
	})
	.when('/developer', {
		templateUrl: 'partials/developer.html'
	})
	.when('/author', {
		templateUrl: 'partials/author.html'
	})
	.when('/quizdescriptor/:id', {
		templateUrl: 'partials/quizdescriptor.html',
		controller: 'QuizStartCtrl',
		controllerAs: 'quizStarter'
	})
	.when('/login', {
		templateUrl: 'partials/login.html'
	})
	.when('/usersettings', {
		templateUrl: 'partials/usersettings.html',
		controller: 'UserPrefCtrl',
		controllerAs: 'preferences'
	})
	$locationProvider.html5Mode({
		enabled: true
	});
}])
.run(['AuthService', '$rootScope', '$location', function(AuthService, $rootScope, $location) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		if (!AuthService.isAuthenticated()) {

			// redirect user to login page if they try to access user settings page
			if (next.templateUrl === "partials/usersettings.html") {
				$location.path("/login");
			}

		} else {

			// redirect user to preferred page if they try to access login page
			if (next.templateUrl === "partials/login.html") {
				$location.path("/" + AuthService.getRole());
			}
 
		}
	});
}]);


















