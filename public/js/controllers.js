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
		

	// watch document height to try and scroll to right position
/*
	scope.$watch (
		function () { 
			var D = document;
		    return Math.max(
		        D.body.scrollHeight, D.documentElement.scrollHeight,
		        D.body.offsetHeight, D.documentElement.offsetHeight,
		        D.body.clientHeight, D.documentElement.clientHeight
		    );
		},
		function (newValue, oldValue) {
			var viewportHeight;
  
			 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
			  
			if (typeof window.innerWidth != 'undefined')
			{
			  
			  viewportHeight = window.innerHeight;
			}
			  
			// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
			 
			else if (typeof document.documentElement != 'undefined'
			 && typeof document.documentElement.clientWidth !=
			 'undefined' && document.documentElement.clientWidth != 0)
			{
			   
			   viewportHeight = document.documentElement.clientHeight;
			}

			// older versions of IE

			else
			{
			   
			   viewportHeight = document.getElementsByTagName('body')[0].clientHeight;
			}


			//check if new body height is greater than viewport height to perform auto scroll
			var D = document;

			bodyHeight = Math.max(
		        D.body.scrollHeight, D.documentElement.scrollHeight,
		        D.body.offsetHeight, D.documentElement.offsetHeight,
		        D.body.clientHeight, D.documentElement.clientHeight
		    );

			

		    timeout( function () {
		    	if(bodyHeight>viewportHeight && !scope.scrolledToMemorizeSpot)
			    {
			    	window.scrollTo(0,jobsCache.memorizedScrollPosition);

			    	// if scroll successfully, change flag.

			    	if(window.scrollY == jobsCache.memorizedScrollPosition)
			    	{
			    		scope.scrolledToMemorizeSpot = true;
			    	}
			    }
		    }, 500);
		}
	);*/

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