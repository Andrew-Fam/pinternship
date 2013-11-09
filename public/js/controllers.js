var pinternshipControllers = angular.module('pinternship-controllers', [ 'slugifier' , 'igTruncate', 'ui.bootstrap','angularMoment','tags-input','restangular']);




//set baseUrl for restangular. current api v0.1
pinternshipControllers.config(['RestangularProvider', function(RestangularProvider){
	RestangularProvider.setBaseUrl('/api/v0.1');
}]);

//jobs cache service
pinternshipControllers.service('jobsCache',[ 'Restangular', function (restangular){
	this.jobs = [];

	this.getJobs = function (){
		return this.jobs;
	};

	this.setJobs = function (j){
		this.jobs = j;
	}
}]);

pinternshipControllers.controller('JobsController',['$routeParams', 'jobsCache','$scope','$http', '$timeout', 'Restangular', function JobsController(routeParams, jobsCache, scope,http,timeout,restangular){
	
	scope.selectedIndustry = undefined;

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
		console.log('sumthing changed in the jobsCache');
		scope.jobs = jobsCache.jobs;
	});

	// get job from a specific industry

	scope.getJobs = function(){
		console.log(scope.selectedIndustry);
		var jobsInIndustry = restangular.one('industries',scope.selectedIndustry.id);

		jobsInIndustry.getList('jobs').then( function (jobs) {
			jobsCache.setJobs(jobs);
		});
	};

}]);

pinternshipControllers.controller('ViewJobController',['$routeParams', '$scope','$http', '$timeout', 'Restangular', function JobsController(routeParams,scope,http,timeout,restangular){
	
	var baseJob = restangular.one('jobs',routeParams.id);

	baseJob.get().then( function (job){
		console.log(job.job_title);
		scope.job = job;
	});

}]);

/*
pinternshipController.controller('JobListCtrl',['$scope','$http','$timeout','$window','$modal', function JobListCtrl(scope, http, timeout, window, modal){

	scope.selectedIndustry = undefined;

	scope.isViewingJob = false;

	scope.currentListPosition = 0;
	
	scope.skillList = new Array();

	scope.fetchJob = function(){
		http.get('dummy_data/data.js').success(function(data){
			scope.industries = data;
			
			
			//img holder for testing only
			var imgHolderClass= ['img-rounded','img-circle','img-square'];
			scope.industries.forEach(function(industry){
				industry.jobs.forEach(function(job){
					job.imgHolderClass = imgHolderClass[Math.floor(Math.random()*imgHolderClass.length)];

					job.date = moment(job.date,"YYYY/DD/MM").format('X');

					
				});
			});
			//end dummy test code section
		});
	};

	//select job function
	scope.viewJob = function(job){
		if( scope.selectedIndustry!=undefined && scope.selectedIndustry!="")
		{
			scope.selectedJob = scope.selectedIndustry.jobs[job];
		}
		else
		{
			scope.selectedJob = scope.allJobs[job];
		}
		//console.log(scope.selectedJob);
		scope.isViewingJob = true;
		//console.log(scope.isViewingJob);
		scope.currentListPosition = window.scrollY;
		timeout(function(){
			window.scrollTo(0,0);
		});
	};

	scope.backToJobList = function(job){
		scope.isViewingJob = false;
		scope.selectedJob = {};
		
		timeout(function(){
		 	window.scrollTo(0,scope.currentListPosition);
		});	
	};

	scope.getJobs = function(){
		if( scope.selectedIndustry!=undefined && scope.selectedIndustry!="")
		{
			return scope.selectedIndustry.jobs;
		}
		else
		{
			scope.allJobs = new Array();
			//img holder for testing only
			
			scope.industries.forEach(function(industry){
				
				scope.allJobs = scope.allJobs.concat(industry.jobs);
			});

			return scope.allJobs;
		}
	};

	//watch selectedIndustry to update skillList for search result filtering

	scope.$watch( 'selectedIndustry' , function(){
		if(scope.selectedIndustry!=undefined){
			scope.skillList = scope.selectedIndustry.tags.slice(0);
		}
		
	});

	scope.hasSkill = function(skill){
		if(scope.skillList!=undefined){
			for(var i=0; i< scope.skillList.length;i++)
			{
				if(skill==scope.skillList[i])
					return true;
			}
			return false;
		}
		else
		{
			return false;
		}
	}

	//open skillList modal window

	scope.viewSkillList = function () {
		var skillListModalInstance = modal.open({
			templateUrl: 'skillListTpl.html',
			controller: SkillListModalInstanceCtrl,
			resolve: {
				skillList: function (){
					return scope.skillList;
				}
			}
		});
		
		scope.modalOpened = true;

		skillListModalInstance.result.then(function(){
			scope.modalOpened = false;
		}, function(){
			scope.modalOpened = false;
		});
	};


	var SkillListModalInstanceCtrl = ['$scope','$modalInstance','skillList', function (scope, modal, skillList) {

	  scope.mySkillList = skillList.slice(0);
	  
	 
	
	  scope.ok = function () {
	  	//over write the original skill List;

	  	skillList.length = 0;

	  	for(var i = 0; i<scope.mySkillList.length; i++) {
	  		skillList.push(scope.mySkillList[i]);
	  	}

	    modal.close(scope.mySkillList);
	  };

	  scope.cancel = function () {
	  	
	    modal.dismiss('cancel');
	  };
	}];

	//controller for post job modal window

	scope.postJob =  function () {
		var postJobModalInstance = modal.open({
			templateUrl: 'postJob.html',
			controller: PostJobModalInstanceCtrl,
			resolve: {
				'industries': function() {
					return scope.industries;
				}
			}
		});
		
		scope.modalOpened = true;

		postJobModalInstance.result.then(function(){
			scope.modalOpened = false;
		}, function(){
			scope.modalOpened = false;
		});
	}

	var PostJobModalInstanceCtrl = ['$scope','$modalInstance','industries', function (scope, modal, industries) {


		scope.industries = industries;
		scope.newJob = {};

		scope.ok = function () {
			//over write the original skill List;
			scope.newJob.date = moment().format("X");

			console.log(scope.newJob);
			console.log(scope.newJob.industry);
			scope.newJob.industry.jobs.push(scope.newJob);

			modal.close();
		};

		scope.cancel = function () {
			
		modal.dismiss('cancel');
		};
	}];

	scope.fetchJob();
}]);
*/