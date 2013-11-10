var pinternshipControllers = angular.module('pinternship-controllers', [ 'slugifier' , 'igTruncate', 'ui.bootstrap','angularMoment','tags-input','restangular']);




//set baseUrl for restangular. current api v0.1
pinternshipControllers.config(['RestangularProvider', function(RestangularProvider){
	RestangularProvider.setBaseUrl('/api/v0.1');
}]);

//jobs cache service
pinternshipControllers.service('cacheService',[ 'Restangular', function (restangular){
	
	this.jobs = [];
	
	this.currentJob = undefined;

	this.memorizedScrollPosition = undefined;

	this.industries = undefined;

	this.getJobs = function (){
		return this.jobs;
	};

	this.setJobs = function (jobs){
		this.jobs = jobs;
	}

	this.setCurrentJob = function (job){
		this.currentJob = job;
	}

	this.rememberScrollPosition = function (scrollPos){
		this.memorizedScrollPosition = scrollPos;
	}

}]);

// controllers for each view

pinternshipControllers.controller( 'HomeController',[
	'$routeParams', 
	'cacheService',
	'$scope',
	'$http', 
	'$timeout', 
	'Restangular', 
	function JobsController(routeParams, cacheService, scope,http,timeout,restangular){
				
	}]
);

pinternshipControllers.controller( 'PostJobController',[
	'$routeParams', 
	'cacheService',
	'$scope',
	'$http', 
	'$timeout', 
	'Restangular', 
	function JobsController(routeParams, cacheService, scope,http,timeout,restangular){
		
		scope.cacheService = cacheService;
		// get a list of all industries

		if(cacheService.industries == undefined){
			var baseIndustries = restangular.all('industries');
			
			baseIndustries.getList().then( function (industries) {
				cacheService.industries = industries;
			});
		}
	}]
);

pinternshipControllers.controller( 'JobsController',[
	'$routeParams', 
	'cacheService',
	'$scope',
	'$http', 
	'$timeout', 
	'Restangular', 
	function JobsController(routeParams, cacheService, scope,http,timeout,restangular){
	
	scope.selectedIndustry = undefined;

	scope.cacheService = cacheService;

	// if already apply memorized scroll position, set this to true to prevent auto scrolling again

	scope.scrolledToMemorizeSpot = false;

	// get a list of all industries

	if(cacheService.industries == undefined){
		var baseIndustries = restangular.all('industries');
		
		baseIndustries.getList().then( function (industries) {
			cacheService.industries = industries;
		});
	}


	// get a list of all jobs 

	var baseJobs = restangular.all('jobs');

	// only if cacheService is empty at first and there's no industry query

	if(cacheService.getJobs().length<=0 && 
		( routeParams.industry == undefined || routeParams.industry == '' )) {
		baseJobs.getList().then( function (jobs) {
			cacheService.setJobs(jobs);
		});
	}

	// watch cacheService

	scope.$watch ( function() { return cacheService.jobs }, function (newValue, oldValue){
		
		scope.jobs = cacheService.jobs;

	});
		

	// scroll when ngrepeat finish

	scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
	    timeout( function () {
	    	if(!scope.scrolledToMemorizeSpot)
		    {
		    	window.scrollTo(0,cacheService.memorizedScrollPosition);

		    	// if scroll successfully, change flag.

		    	if(window.scrollY == cacheService.memorizedScrollPosition)
		    	{
		    		scope.scrolledToMemorizeSpot = true;
		    	}
		    }
	    }, 500);
	});

	// get job from a specific industry

	scope.getJobs = function(){

		var jobsInIndustry = restangular.one('industries',scope.cacheService.selectedIndustry.id);

		jobsInIndustry.getList('jobs').then( function (jobs) {
			cacheService.setJobs(jobs);
		});
	};

	// store job to cache, before going to viewJob

	scope.switchToJobView = function (job){

		cacheService.setCurrentJob(job);
	};

	scope.$on('$routeChangeStart', function() {
		// set this to false to make app remember scroll position

		scope.scrolledToMemorizeSpot = false;

		//get cross-browser scroll position

		var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		
		//store to cache before switching to another view

		cacheService.rememberScrollPosition(scrollTop);

		console.log('save Scroll Pos');
	});
}]);

pinternshipControllers.controller('ViewJobController',['cacheService', '$routeParams', '$scope','$http', '$timeout', 'Restangular', function JobsController(cacheService,routeParams,scope,http,timeout,restangular){
	
	//try to set scope.job to the currentJob object in the cacheService

	scope.job = cacheService.currentJob;

	//however, if the cache is undefined, query from api

	if(scope.job == undefined){
		var baseJob = restangular.one('jobs',routeParams.id);

		baseJob.get().then( function (job){
			scope.job = job;
		});
	}


}]);