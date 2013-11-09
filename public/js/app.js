var app = angular.module('pinternshipApp',[ 'pinternship-controllers' , 'pinternship-directives' , 'ngRoute' , 'ngAnimate' ]);

app.config([ '$routeProvider','$locationProvider', function ( routeProvider , locationProvider ) {
	routeProvider.when('/jobs',{
		templateUrl: 'jobs.html',
		controller: 'JobsController'
	});

	//locationProvider.html5Mode(true);
}]);
app.controller('PinternshipCtrl',[ '$scope' ,  function (scope){

}]);
