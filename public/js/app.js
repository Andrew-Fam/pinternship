var app = angular.module('pinternshipApp',[ 'pinternship-controllers' , 'pinternship-directives' , 'ngRoute' ]);

app.config([ '$routeProvider','$locationProvider', function ( routeProvider , locationProvider ) {
	
	routeProvider.when('/',{
		templateUrl:'home.html',
		controller: 'HomeController'
	}).when('/industries',{
		templateUrl: 'jobs.html',
		controller: 'JobsController',
		reloadOnSearch: false
	}).
	when('/jobs',{
		templateUrl: 'jobs.html',
		controller: 'JobsController',
		reloadOnSearch: false
	}).
	when('/jobs/post',{
		templateUrl: 'postJob.html',
		controller: 'PostJobController'
	}).when('/jobs/post/preview',{
		templateUrl: 'viewJob.html',
		controller: 'previewJobPostController'
	}).
	when('/jobs/:id/:slug', {
		templateUrl: 'viewJob.html',
		controller: 'ViewJobController'
	});



	locationProvider.html5Mode(true);
}]);

