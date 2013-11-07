var pinternshipApp = angular.module('pinternshipApp', ['ui.bootstrap']);

pinternshipApp.controller('JobListCtrl', function JobListCtrl($scope, $http, $timeout, $window){


	$scope.selectedIndustry = undefined;

	$scope.isViewingJob = false;

	$scope.currentListPosition = 0;
	


	$scope.fetchJob = function(){
		$http.get('dummy_data/data.js').success(function(data){
			$scope.industries = data;
			

			//img holder for testing only
			var imgHolderClass= ['img-rounded','img-circle','img-square'];
			$scope.industries.forEach(function(industry){
				industry.jobs.forEach(function(job){
					job.imgHolderClass = imgHolderClass[Math.floor(Math.random()*imgHolderClass.length)];
				});
			});
			//end dummy test code section
		});
	};

	//select job function
	$scope.viewJob = function(job){
		$scope.selectedJob = $scope.jobs[job];
		//console.log($scope.selectedJob);
		$scope.isViewingJob = true;
		//console.log($scope.isViewingJob);
		$scope.currentListPosition = window.scrollY;
		
		window.scrollTo(0,0);
	};

	$scope.backToJobList = function(job){
		$scope.isViewingJob = false;
		$scope.selectedJob = {};
		
		$timeout(function(){
		 	window.scrollTo(0,$scope.currentListPosition);
		});	
	};

	$scope.fetchJob();
});