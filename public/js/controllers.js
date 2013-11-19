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
		 	
		 	var baseJobs = restangular.all('jobs');

		 	var newJob = {};

		 	var valid = true;

		 	if(!scope.formInvalid()){
			 	newJob.job_title = scope.newJob.job_title;
			 	newJob.skills = new Array();
			 	for(var i = 0; i < scope.newJob.skills.length;i++){
			 		newJob.skills.push(scope.newJob.skills[i].id);
			 	}
			 	
			 	newJob.industries = new Array();
			 	for(var i = 0; i < scope.newJob.industries.length;i++){
			 		newJob.industries.push(scope.newJob.industries[i].id);
			 	}
			 	newJob.job_logo = scope.newJob.job_logo || '/img/default_logo.png';
			 	newJob.job_description = scope.newJob.job_description;
			 	newJob.job_phone = scope.newJob.job_phone;
			 	newJob.job_email = scope.newJob.job_email;
			}

			baseJobs.post(newJob).then(function(response){
				console.log(response);
			},function(response){

			});

			//console.log(newJob);
		}


		// store the current new job item in the cache, so that it can be used in the preview view

		scope.storePreviewJob = function () {
			cacheService.previewingJob = scope.newJob;
		}
		// a worse approach: Update the preview job object as scope.newJob changes - uncertain, consuming

		/*scope.$watch( scope.newJob , function () {
			cacheService.previewingJob = scope.newJob;
		});*/

		// validation code

		scope.formInvalid = function () {
			return scope.postJobForm.email.$error.required && scope.postJobForm.email.$error.required && scope.postJobForm.description.$error.required && (scope.newJob.skills.length <= 0) && scope.postJobForm.title.$error.required && (scope.newJob.industries.length <= 0)
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

	// get industry id from parameter if possible
	// then set the corresponding industry as selectedIndustry if found
	console.log('Start jobs controller');
	



	scope.readIndustryFromUrl = function () {
		if(routeParams.industry != undefined && routeParams.industry != "") {
			for(var i = 0 ; i < cacheService.industries.length; i++ ){
				if (cacheService.industries[i].id == routeParams.industry) {
					cacheService.selectedIndustry = cacheService.industries[i];
					// load corresponding job list
					scope.moreJobs();
					break; // break loop when found
				}
			}
		}
	}

	




	scope.selectedIndustry = undefined;

	scope.cacheService = cacheService;

	// if already apply memorized scroll position, set this to true to prevent auto scrolling again

	scope.scrolledToMemorizeSpot = false;

	// get a list of all industries

	if(cacheService.industries == undefined){
		var baseIndustries = restangular.all('industries');
		
		baseIndustries.getList().then( function (industries) {
			cacheService.industries = industries;

			

			scope.readIndustryFromUrl();

		});
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
	

	// get a list of all jobs 

	var baseJobs = restangular.all('jobs');

	

	// watch cacheService selected Industry to restore full job list when no industry is selected and scope.scrolledToMemorizeSpot == true,
	// which only happens after the scroll position is restored when going back to this view from another route, or memorizedScrollPosition == undefined, which only happens when user visit the jobs view for the first time
	scope.$watch ( function() { return cacheService.selectedIndustry }, function (newValue, oldValue){
	
		if(scope.cacheService.selectedIndustry == undefined && (scope.scrolledToMemorizeSpot || cacheService.memorizedScrollPosition == undefined))
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


	// store job to cache, before going to viewJob

	scope.switchToJobView = function (job){

		cacheService.setCurrentJob(job);
	};

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
	scope.$on('$routeChangeSuccess', function() {
		scope.readIndustryFromUrl();
	});

	scope.getJobsInIndustry = function (industry) {
		scope.cacheService.selectedIndustry = industry;
		scope.refreshJobs();
	}

	scope.refreshJobs = function () {
		scope.cacheService.jobs = [];
		scope.moreJobs();
	}
	

	

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