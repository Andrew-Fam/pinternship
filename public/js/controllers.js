var pinternshipApp = angular.module('pinternshipApp', []);

pinternshipApp.controller('JobListCtrl', function JobListCtrl($scope, $http, $timeout, $window){

	$scope.fetchJob = function(){
		$http.get('dummy_data/data.js').success(function(data){
			$scope.industries = data;
			$scope.jobs = new Array();

			for(var i = 0; i < $scope.industries.length; i++)
			{
				$scope.jobs = $scope.jobs.concat($scope.industries[i].jobs); 
			}


			//img holder for testing only
			var imgHolderClass= ['img-rounded','img-circle','img-square'];
			$scope.jobs.forEach(function(job){
				job.imgHolderClass = imgHolderClass[Math.floor(Math.random()*imgHolderClass.length)];
			});
			//end dummy test code section
		});
	};



	$scope.isViewingJob = false;



	$scope.currentListPosition = 0;
	


	//select job function
	$scope.viewJob = function(job){
		$scope.selectedJob = $scope.jobs[job];
		//console.log($scope.selectedJob);
		$scope.isViewingJob = true;
		//console.log($scope.isViewingJob);
		$scope.currentListPosition = window.scrollY;
		
		$(document).scrollTop(0);
	};

	$scope.backToJobList = function(job){
		$scope.isViewingJob = false;
		$scope.selectedJob = {};
		
		$timeout(function(){
		 	$(document).scrollTop($scope.currentListPosition);
		});	
	};


	
	$scope.getWindowScroll = function(){
		return angular.element($window).scrollTop();
	}




	$scope.fetchJob();
});