var app = angular.module('pinternshipApp',[ 'pinternship-controllers' , 'pinternship-directives' , 'ngRoute' , 'ngAnimate' ]);

app.config([ '$routeProvider','$locationProvider', function ( routeProvider , locationProvider ) {
	
	routeProvider.when('/jobs',{
		templateUrl: 'jobs.html',
		controller: 'JobsController'
	}).
	when('/jobs/:id/:slug', {
		templateUrl: 'viewJob.html',
		controller: 'ViewJobController'
	});



	locationProvider.html5Mode(true);
}]);

