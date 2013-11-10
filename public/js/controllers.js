var pinternshipControllers = angular.module('pinternship-controllers', [ 'slugifier' , 'igTruncate', 'ui.bootstrap','angularMoment','tags-input','restangular']);




//set baseUrl for restangular. current api v0.1
pinternshipControllers.config(['RestangularProvider', function(RestangularProvider){
	RestangularProvider.setBaseUrl('/api/v0.1');
}]);

//jobs cache service
pinternshipControllers.service('jobsCache',[ 'Restangular', function (restangular){
	this.jobs = [];
	
	this.currentJob = undefined;

	this.memorizedScrollPosition = undefined;

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
	'jobsCache',
	'$scope',
	'$http', 
	'$timeout', 
	'Restangular', 
	function JobsController(routeParams, jobsCache, scope,http,timeout,restangular){
				
	}]
);

pinternshipControllers.controller( 'PostJobController',[
	'$routeParams', 
	'jobsCache',
	'$scope',
	'$http', 
	'$timeout', 
	'Restangular', 
	function JobsController(routeParams, jobsCache, scope,http,timeout,restangular){
				
	}]
);

pinternshipControllers.controller( 'JobsController',[
	'$routeParams', 
	'jobsCache',
	'$scope',
	'$http', 
	'$timeout', 
	'Restangular', 
	function JobsController(routeParams, jobsCache, scope,http,timeout,restangular){
	
	scope.selectedIndustry = undefined;


	// if already apply memorized scroll position, set this to true to prevent auto scrolling again

	scope.scrolledToMemorizeSpot = false;

	// get a list of all industries

	var baseIndustries = restangular.all('industries');
	
	baseIndustries.getList().then( function (industries) {
		scope.industries = industries;
	});


	// get a list of all jobs 

	var baseJobs = restangular.all('jobs');

	// only if jobsCache is empty at first and there's no industry query

	if(jobsCache.getJobs().length<=0 && 
		( routeParams.industry == undefined || routeParams.industry == '' )) {
		baseJobs.getList().then( function (jobs) {
			jobsCache.setJobs(jobs);
		});
	}

	// watch jobsCache

	scope.$watch ( function() { return jobsCache.jobs }, function (newValue, oldValue){
		
		scope.jobs = jobsCache.jobs;

	});
		

	// scroll when ngrepeat finish

	scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
	    timeout( function () {
	    	if(!scope.scrolledToMemorizeSpot)
		    {
		    	window.scrollTo(0,jobsCache.memorizedScrollPosition);

		    	// if scroll successfully, change flag.

		    	if(window.scrollY == jobsCache.memorizedScrollPosition)
		    	{
		    		scope.scrolledToMemorizeSpot = true;
		    	}
		    }
	    }, 500);
	});

	// get job from a specific industry

	scope.getJobs = function(){

		var jobsInIndustry = restangular.one('industries',scope.selectedIndustry.id);

		jobsInIndustry.getList('jobs').then( function (jobs) {
			jobsCache.setJobs(jobs);
		});
	};

	// store job to cache, before going to viewJob

	scope.switchToJobView = function (job){

		jobsCache.setCurrentJob(job);
	};

	scope.$on('$routeChangeStart', function() {
		// set this to false to make app remember scroll position

		scope.scrolledToMemorizeSpot = false;

		//get cross-browser scroll position

		var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		
		//store to cache before switching to another view

		jobsCache.rememberScrollPosition(scrollTop);

		console.log('save Scroll Pos');
	});
}]);

pinternshipControllers.controller('ViewJobController',['jobsCache', '$routeParams', '$scope','$http', '$timeout', 'Restangular', function JobsController(jobsCache,routeParams,scope,http,timeout,restangular){
	
	//try to set scope.job to the currentJob object in the jobsCache

	scope.job = jobsCache.currentJob;

	//however, if the cache is undefined, query from api

	if(scope.job == undefined){
		var baseJob = restangular.one('jobs',routeParams.id);

		baseJob.get().then( function (job){
			scope.job = job;
		});
	}


}]);