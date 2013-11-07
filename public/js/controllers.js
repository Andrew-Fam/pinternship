var pinternshipApp = angular.module('pinternshipApp', ['ui.bootstrap','angularMoment']);

pinternshipApp.controller('JobListCtrl',['$scope','$http','$timeout','$window', function JobListCtrl(scope, http, timeout, window){


	scope.selectedIndustry = undefined;

	scope.isViewingJob = false;

	scope.currentListPosition = 0;
	
	scope.skillList = new Array();

	scope.fetchJob = function(){
		http.get('dummy_data/data.js').success(function(data){
			scope.industries = data;
			
			scope.allJobs = new Array();
			//img holder for testing only
			var imgHolderClass= ['img-rounded','img-circle','img-square'];
			scope.industries.forEach(function(industry){
				industry.jobs.forEach(function(job){
					job.imgHolderClass = imgHolderClass[Math.floor(Math.random()*imgHolderClass.length)];


					scope.allJobs.push(job);
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
			return scope.allJobs;
		}
	};

	//watch selectedIndustry to update skillList for search result filtering

	scope.$watch( 'selectedIndustry' , function(){
		if(scope.selectedIndustry!=undefined){
			scope.skillList = scope.selectedIndustry.tags;
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

	scope.fetchJob();
}]);