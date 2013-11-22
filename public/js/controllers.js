var pinternshipControllers = angular.module('pinternship-controllers', [ 'slugifier' , 'igTruncate', 'ui.bootstrap','angularMoment','tags-input','restangular']);

var ausPostAPIKey = '4fa3a420-2948-49ee-a620-8d7dc6f5294c';


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
	'$location', 
	function PostJobController(routeParams, cacheService, scope,http,timeout,restangular,$location){

		scope.alerts = [];

		scope.shakeAlert = false;

		scope.newJob = cacheService.previewingJob || {};
		if(scope.newJob.skills==undefined){
			scope.newJob.skills = [];
		}
		if(scope.newJob.industries==undefined){
			scope.newJob.industries = [];
		}
		

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
		
		

		scope.getLocations = function (query) {

			return restangular.all('locations/query').getList({q:query});
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
			 	newJob.job_postcode = scope.newJob.job_location.postcode;
			 	newJob.job_suburb = scope.newJob.job_location.location;
			 	newJob.job_state = scope.newJob.job_location.state;
			 	baseJobs.post(newJob).then(function(response){
					//after successful post, clear jobs from cache to refresh job list

					scope.cacheService.jobs = [];

					console.log(response);
					scope.postingJob = false;
					cacheService.postedJob = response; 
					$location.path('/jobs/post/successful');
				},function(response){
					console.log(response);
					scope.addAlert('danger','Post unsuccessful! Please check post details for errors or try again later.');
					scope.postingJob = false;
				});

			} else {


				scope.addAlert('danger','Some details are invalid!');
				scope.postingJob = false;
			}

			

			//console.log(newJob);
		}


		// store the current new job item in the cache, so that it can be used in the preview view

		scope.previewJob = function () {


			cacheService.previewingJob = scope.newJob;
			cacheService.previewingJob.isInvalid = scope.formInvalid();
		}
		// a worse approach: Update the preview job object as scope.newJob changes - uncertain, consuming

		/*scope.$watch( scope.newJob , function () {
			cacheService.previewingJob = scope.newJob;
		});*/

		// validation code

		scope.formInvalid = function () {

			return scope.locationIsInvalid() || scope.industriesExceedLimit() || scope.skillsExceedLimit() || scope.postJobForm.email.$error.required || scope.postJobForm.email.$error.required || scope.postJobForm.description.$error.required || (scope.newJob.skills.length <= 0) || scope.postJobForm.title.$error.required || (scope.newJob.industries.length <= 0)
		}

		scope.industryIsInvalid = function () {
			var invalid = false;

			if( scope.newJob.industries.length <= 0 ){
				invalid = true;
				console.log('industry invalid');
			}

			return invalid;
		}

		scope.locationIsInvalid = function () {
			var invalid = false;

			if( scope.newJob.job_location === undefined){
				invalid = true;
				console.log(scope.newJob);
				console.log(scope.newJob.job_location);
				console.log('location invalid');
			}

			return invalid;
		}

		scope.skillsInvalid = function () {
			var invalid = false;

			if( scope.newJob.skills.length <= 0 ){
				invalid = true;
				console.log('skill invalid');
			}

			return invalid;
		}

		scope.skillsExceedLimit = function () {
			var invalid = false;

			if( scope.newJob.skills.length > 10 ){
				invalid = true;
			}
			
			return invalid;
		}

		scope.industriesExceedLimit = function () {
			var invalid = false;

			if( scope.newJob.industries.length > 3 ){
				invalid = true;
			}
			
			return invalid;
		}


		scope.getAlerts = function () {
			return scope.alerts;
		}

		scope.addAlert = function(t,message) {
			
		    scope.alerts.push({'type':t, 'msg': message});
		   
		};

		scope.closeAlert = function(index) {
		   	scope.alerts.splice(index, 1);
		    //console.log(scope.alerts);
		};
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
		if(scope.cacheService.industries!=undefined && scope.cacheService.selectedIndustry == undefined && newValue != oldValue)
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

	scope.contactShowed = "";

	scope.toggleContact = function (contactType) {
		if(scope.contactShowed === contactType) {
			scope.contactShowed = "";
		}
		else {
			scope.contactShowed = contactType;
		}
	};

	scope.isCollapsed =  function (contactType) {
		if(scope.contactShowed === contactType)
		{
			return false;
		} else {
			return true;
		}
	}
}]);

pinternshipControllers.controller('PreviewJobPostController',['$location','cacheService', '$routeParams', '$scope','$http', '$timeout', 'Restangular', function PreviewJobPostController($location,cacheService,routeParams,scope,http,timeout,restangular){
	

	scope.alerts = [];

	//try to set scope.job to the currentJob object in the cacheService

	scope.job = cacheService.previewingJob;

	scope.cacheService = cacheService;



	if(scope.job==undefined) {
		$location.path("/");
	}

	console.log(scope.job);

	scope.previewing = true;
	
	scope.cancel = function () {
		window.history.back();
	}

	scope.postJob = function () {
		 	

		scope.postingJob = true;

	 	var baseJobs = restangular.all('jobs');

	 	var newJob = {};

	 

	 	if(!scope.job.isInvalid){
	 		
		 	newJob.job_title = scope.job.job_title;
		 	newJob.skills = new Array();
		 	for(var i = 0; i < scope.job.skills.length;i++){
		 		newJob.skills.push(scope.job.skills[i].id);
		 	}
		 	
		 	newJob.industries = new Array();
		 	for(var i = 0; i < scope.job.industries.length;i++){
		 		newJob.industries.push(scope.job.industries[i].id);
		 	}
		 	newJob.job_logo = scope.job.job_logo;
		 	newJob.job_description = scope.job.job_description;
		 	newJob.job_phone = scope.job.job_phone;
		 	newJob.job_email = scope.job.job_email;
		 	newJob.job_postcode = scope.job.job_location.postcode;
		 	newJob.job_suburb = scope.job.job_location.location;
		 	newJob.job_state = scope.job.job_location.state;
		 	baseJobs.post(newJob).then(function(response){
				//after successful post, clear jobs from cache to refresh job list

				scope.cacheService.jobs = [];

				console.log(response);
				scope.postingJob = false;
				cacheService.postedJob = response; 
				$location.path('/jobs/post/successful');
			},function(response){
				console.log(response);
				scope.addAlert('danger','Post unsuccessful! Please check post details for errors or try again later.');
				scope.postingJob = false;
			});

		} else {


			scope.addAlert('danger','Some details are invalid!');
			scope.postingJob = false;
		}

		

		//console.log(newJob);
	}

	scope.getAlerts = function () {
		return scope.alerts;
	}

	scope.addAlert = function(t,message) {
		
	    scope.alerts.push({'type':t, 'msg': message});
	   
	};

	scope.closeAlert = function(index) {
	   	scope.alerts.splice(index, 1);
	    //console.log(scope.alerts);
	};



}]);


pinternshipControllers.controller('PostSuccessfulController',['$location','cacheService', 'Slug', '$scope', function PostSuccessfulController($location,cacheService,Slug,scope){
	scope.job =  cacheService.postedJob;	
	if(scope.job===undefined) {
		$location.path("/");
	}
	scope.job.slug = Slug.slugify(scope.job.job_title);
	scope.job.edit_key = "mock_key";
}]);