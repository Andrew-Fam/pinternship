var pinternshipControllers = angular.module('pinternship-controllers', [ 'slugifier' , 'igTruncate', 'ui.bootstrap','angularMoment','tags-input','restangular']);




//set baseUrl for restangular. current api v0.1
pinternshipControllers.config(['RestangularProvider', function(RestangularProvider){
	RestangularProvider.setBaseUrl('/api/v0.1');
}]);

//jobs cache service
pinternshipControllers.service('cacheService', function (){
	
	this.jobs = [];
	
	this.jobsPerRetrieval = 3;

	this.currentJob = undefined;

	this.memorizedScrollPosition = undefined;

	this.industries = undefined;

	this.skills = undefined;

	this.getJobs = function (){
		return this.jobs;
	};

	this.setJobs = function (jobs){
		this.jobs = jobs;
	}

	this.appendJobs = function (jobs){
		for(var i=0; i< jobs.length; i++) {
			this.jobs.push(jobs[i]);
		}
		
	}

	this.setCurrentJob = function (job){
		this.currentJob = job;
	}

	this.rememberScrollPosition = function (scrollPos){
		this.memorizedScrollPosition = scrollPos;
	}

});

// controllers for each view

pinternshipControllers.controller( 'HomeController',[
	'$routeParams', 
	'cacheService',
	'$scope',
	'$http', 
	'$timeout', 
	'Restangular', 
	function HomeController(routeParams, cacheService, scope,http,timeout,restangular){
				
	}]
);

pinternshipControllers.controller( 'PostJobController',[
	'$routeParams', 
	'cacheService',
	'$scope',
	'$http', 
	'$timeout', 
	'Restangular', 
	function PostJobController(routeParams, cacheService, scope,http,timeout,restangular){

		scope.newJob = scope.newJob || cacheService.previewingJob || {};

		scope.cacheService = cacheService;
		// get a list of all industries
		scope.getSkillTagsSource = function () { 
			//console.log('getIndustryTagsSource in the parent controller gets called');
			return scope.cacheService.skills;
			
		};

		// get a list of all industries
		scope.getIndustryTagsSource = function () { 
			//console.log('getTagsSource in the parent controller gets called');
			return scope.cacheService.industries;
		};

		scope.foo = 'Hello!';
		
		if(cacheService.industries == undefined){
			var baseIndustries = restangular.all('industries');
			
			baseIndustries.getList().then( function (industries) {
				cacheService.industries = industries;
				
			});
		}

		if(cacheService.skills == undefined){
			var baseSkills = restangular.all('skills');
			
			baseSkills.getList().then( function (skills) {
				cacheService.skills = skills;
				
			});
		}

		scope.cancel = function () {
			// clear previewing Job from cache
			console.log('clear previewing job');
			cacheService.previewingJob = {};
			//window.history.back();
		}




		scope.postJob = function () {
		 	

			scope.postingJob = true;

		 	var baseJobs = restangular.all('jobs');

		 	var newJob = {};

		 

		 	if(!scope.formInvalid()){
		 		console.log('hahaha');
			 	newJob.job_title = scope.newJob.job_title;
			 	newJob.skills = new Array();
			 	for(var i = 0; i < scope.newJob.skills.length;i++){
			 		newJob.skills.push(scope.newJob.skills[i].id);
			 	}
			 	
			 	newJob.industries = new Array();
			 	for(var i = 0; i < scope.newJob.industries.length;i++){
			 		newJob.industries.push(scope.newJob.industries[i].id);
			 	}
			 	newJob.job_logo = scope.newJob.job_logo;
			 	newJob.job_description = scope.newJob.job_description;
			 	newJob.job_phone = scope.newJob.job_phone;
			 	newJob.job_email = scope.newJob.job_email;

			 	baseJobs.post(newJob).then(function(response){
					console.log(response);
					scope.postingJob = false;
				},function(response){
					console.log(response);
					scope.postingJob = false;
				});

			} else {



				scope.postingJob = false;
			}

			

			//console.log(newJob);
		}


		// store the current new job item in the cache, so that it can be used in the preview view

		scope.previewJob = function () {
			cacheService.previewingJob = scope.newJob;
		}
		// a worse approach: Update the preview job object as scope.newJob changes - uncertain, consuming

		/*scope.$watch( scope.newJob , function () {
			cacheService.previewingJob = scope.newJob;
		});*/

		// validation code

		scope.formInvalid = function () {
			return scope.industriesExceedLimit() || scope.skillsExceedLimit() || scope.postJobForm.email.$error.required || scope.postJobForm.email.$error.required || scope.postJobForm.description.$error.required || (scope.newJob.skills.length <= 0) || scope.postJobForm.title.$error.required || (scope.newJob.industries.length <= 0)
		}

		scope.industryIsInvalid = function () {
			var invalid = false;

			if( scope.newJob.industries.length <= 0 ){
				invalid = true;
			}

			return invalid;
		}

		scope.skillsInvalid = function () {
			var invalid = false;

			if( scope.newJob.skills.length <= 0 ){
				invalid = true;
			}

			return invalid;
		}

		scope.skillsExceedLimit = function () {
			var invalid = false;

			if( scope.newJob.skills.length > 10 ){
				invalid = true;
			}
			console.log("skillsExceedLimit: "+invalid);
			return invalid;
		}

		scope.industriesExceedLimit = function () {
			var invalid = false;

			if( scope.newJob.industries.length > 3 ){
				invalid = true;
			}
			console.log("industriesExceedLimit: "+invalid);
			return invalid;
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
	'$q',
	function JobsController(routeParams, cacheService, scope,http,timeout,restangular,$q){


	// controller scope functions 

	// get industry id from parameter if possible
	// then set the corresponding industry as selectedIndustry if found

	scope.readIndustryFromUrl = function () {

		console.log('read industry from url');

		if(routeParams.industry != undefined && routeParams.industry != "") {
			console.log('detected industry from url');
			for(var i = 0 ; i < cacheService.industries.length; i++ ){
				if (cacheService.industries[i].id == routeParams.industry) {
					cacheService.selectedIndustry = cacheService.industries[i];
					console.log('found');
					// load corresponding job list
					scope.refreshJobs();
					break; // break loop when found
				}
			}
		}else if(scope.cacheService.jobs == undefined || scope.cacheService.jobs.length <=0)
		{
			scope.moreJobs();
		}
		
		
	}

	

	// call this function to retrieve more jobs

	scope.moreJobs = function () {

		scope.isLoadingJob = true;

		if(scope.cacheService.selectedIndustry != undefined){
			// get job in a specific industry
			var jobsInIndustry = restangular.one('industries',scope.cacheService.selectedIndustry.id);

			jobsInIndustry.getList('jobs',{'skip':scope.cacheService.jobs.length,'take':scope.cacheService.jobsPerRetrieval})
			.then( function (jobs) {
				cacheService.appendJobs(jobs);
				scope.isLoadingJob = false;
			});
		}else {

			// prepare restangular object for jobs 

			var baseJobs = restangular.all('jobs');

			// get job from all industries
			
			baseJobs.getList({'skip':scope.cacheService.jobs.length,'take':scope.cacheService.jobsPerRetrieval})
			.then( function (jobs) {
				cacheService.appendJobs(jobs);
				scope.isLoadingJob = false;
			});
		}

		// set flag to prevent scrolling when ng-repeat finishes

		scope.justAddedMoreJob = true;


	}
	
	// store job to cache, before going to viewJob

	scope.switchToJobView = function (job){

		cacheService.setCurrentJob(job);
	};


	scope.refreshJobs = function () {
		scope.cacheService.jobs = [];
		scope.moreJobs();
	}


	/*
	* Event handlers
	*
	*/

	// prepare resource for the controller soon as route change complete 

	scope.$on('$routeChangeSuccess', function() {


		scope.selectedIndustry = undefined;

		scope.cacheService = cacheService;

		// if already apply memorized scroll position, set this to true to prevent auto scrolling again

		scope.scrolledToMemorizeSpot = false;


		// query industries first if cacheService.industries is undefined
		if(cacheService.industries == undefined){
			var baseIndustries = restangular.all('industries');
			
			baseIndustries.getList().then( function (industries) {
				cacheService.industries = industries;

				

				scope.readIndustryFromUrl();
			});
		}else // otherwise, proceed to read industry From URL directly
		{
			scope.readIndustryFromUrl();
		}
		

	});

	
	
	



	// this function aims to refresh the jobs list when user erase the search box.
	// it is fired whenever cacheService.selectedIndustry is changed. Including when the controller is first created.
	// therefore, an if statement is needed to only refresh the jobs 
	// from a user erasing the search box.
	scope.$watch ( function() { return cacheService.selectedIndustry }, function (newValue, oldValue){
		
		if(scope.cacheService.industries!=undefined && scope.cacheService.selectedIndustry == undefined && (scope.scrolledToMemorizeSpot || cacheService.memorizedScrollPosition == undefined))
		{	
			
			scope.refreshJobs();
		}
	});
		

	// scroll when ngrepeat finish

	scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
	    timeout( function () {
	    	if(!scope.scrolledToMemorizeSpot && !scope.justAddedMoreJob)
		    {
		    	window.scrollTo(0,cacheService.memorizedScrollPosition);

		    	// if scroll successfully, change flag.

		    	if(window.scrollY == cacheService.memorizedScrollPosition)
		    	{
		    		scope.scrolledToMemorizeSpot = true;
		    	}
		    }

		    scope.justAddedMoreJob = false;
	    }, 500);
	});



	

	scope.$on('$routeUpdate', function (){
		scope.readIndustryFromUrl();
	});

	scope.$on('$routeChangeStart', function() {
		// set this to false to make app remember scroll position

		scope.scrolledToMemorizeSpot = false;

		//get cross-browser scroll position

		var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		
		//store to cache before switching to another view

		cacheService.rememberScrollPosition(scrollTop);

		//console.log('save Scroll Pos');
	});


	

	

}]);

pinternshipControllers.controller('ViewJobController',['cacheService', '$routeParams', '$scope','$http', '$timeout', 'Restangular', function ViewJobController(cacheService,routeParams,scope,http,timeout,restangular){
	
	scope.contactIsCollapsed = true;

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

pinternshipControllers.controller('previewJobPostController',['cacheService', '$routeParams', '$scope','$http', '$timeout', 'Restangular', function JobsController(cacheService,routeParams,scope,http,timeout,restangular){
	
	//try to set scope.job to the currentJob object in the cacheService

	scope.job = cacheService.previewingJob;

	console.log(scope.job);

	scope.previewing = true;
	
	scope.cancel = function () {
		window.history.back();
	}
}]);