<!doctype html>
<html lang="en" ng-app="pinternshipApp">
<head>
    <meta charset="UTF-8">
    <title>Pinternship</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo asset('bootstrap/css/bootstrap.css')?>"/>
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo asset('css/ng-tags-input.min.css')?>"/>
    <link rel="stylesheet" href="<?php echo asset('css/pinternship.css')?>"/>
    <link rel="stylesheet" href="<?php echo asset('css/theme.css')?>"/>
    <link rel="stylesheet" href="<?php echo asset('css/pinternship.css')?>"/>

</head>
<body ng-controller="JobListCtrl" ng-class="{'modal-open':modalOpened}">
	<script type="text/ng-template" id="skillListTpl.html">
		<div class="modal-background-click-handler" ng-click="cancel()">
		</div>
		<div class="modal-dialog">
			<div class="modal-content">
		        <div class="modal-header">
		            <h3>Your skill list: </h3>
		        </div>
		        <div class="modal-body">
		            <tags-input ng-model="mySkillList"></tags-input>
		        </div>
		        <div class="modal-footer">
		            <button class="btn btn-primary" ng-click="ok()">OK</button>
		            <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
		        </div>
		    </div>
	    </div>
    </script>
    <script type="text/ng-template" id="postJob.html">
		<div class="modal-background-click-handler" ng-click="$close($event)">
		</div>
		<div class="modal-dialog">
			<div class="modal-content">
		        <div class="modal-header">
		            <h3>Post a job: </h3>
		        </div>
		        <div class="modal-body">
		        	<div class="form-group">
			        	<input type="text" class="form-control" ng-model="newJob.title" placeholder="title"/>
			        	<textarea class="form-control" ng-model="newJob.description" placeholder="description"></textarea>
			        	
			        	<input type="text" class="form-control" ng-model="newJob.logo" placeholder="logo"/>

			        	<input type="text" class="form-control" ng-model="newJob.industry" typeahead="industry as industry.name for industry in industries | filter:{name: $viewValue} | limitTo:8" typeahead-editable="false" placeholder="Search">
		
			        	<tags-input ng-model="newJob.tags"></tags-input>
		        	</div>
		        </div>
		        <div class="modal-footer">
		            <button class="btn btn-primary" ng-click="ok()">OK</button>
		            <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
		        </div>
		    </div>
	    </div>
    </script>
	<nav class="pint-navbar navbar navbar-fixed-top navbar-default" role="navigation">
		<div class="container">
		  <!-- Brand and toggle get grouped for better mobile display -->
			<div class="row">
				<div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
				    <a class="navbar-brand hidden-xs" href="#">Pinternship</a>
				    <a class="navbar-brand visible-xs" href="#">P</a>
				</div>
			  	<div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">
			  		<form class="pint-search-form navbar-form navbar-left" role="search">
					    <div class="form-group">
					        <input type="text" class="form-control" ng-model="selectedIndustry" typeahead=" industry as industry.name for industry in industries | filter:{name: $viewValue} | limitTo:8" typeahead-editable="false" placeholder="Search">
					    </div>
					    <button type="submit" class="btn btn-default fa fa-search"></button>
					    <button type="button" class="btn btn-default fa fa-cog" ng-click="viewSkillList()"></button>
				    </form>
			  	</div>
			  	<div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
			  		<div class="navbar-form navbar-left">			    
					    <button type="button" class="btn btn-default fa fa-thumb-tack" ng-click="postJob()"></button>
				    </div>
			  	</div>
			</div>
		</div>
	</nav>
	
	<section class="pint-ui-frame-wrapper">
		<div class="ng-class: {viewingJob : isViewingJob,'pint-ui-frame': true};"  ng-cloak >
			
			<section class="pint-search-result list-group pint-ui-view-left" >
				<div class="container">
					<article ng-repeat="job in getJobs() | orderBy:'date':true" class="pint-job-item list-group-item center-block" >
						<div class="pint-job-item-thumbnail">
							<img data-src="holder.js/100x100" alt="pint-job-item" class="img-responsive {{job.imgHolderClass}}" bs-holder/>
						</div>
						<div class="pint-job-item-content">
							<h1 class="pint-job-item-title"> {{job.title}}</h1>
							<p class="pint-job-item-date" am-time-ago="job.date" am-format="X"> </p>
							<p class="pint-job-item-description">
								{{job.description}}
							</p>
							<p class="pint-job-item-tags">
								<span ng-repeat="tag in job.tags">
									<a class="tag"  ng-class="{'has':hasSkill(tag)}"> {{tag}} </a> 
								</span>
							</p>
						</div>
						<a class="pint-job-item-selector" ng-click="viewJob($index)"><i class="fa fa-chevron-right fa-fw"></i></a>
					</article>
			
				</div>
			</section>
			<section class="pint-ui-view-right pint-item-view">
				<div class="container">
				
					<article class="pint-job-item-view">

						<button class="back-to-list fa fa-chevron-left" pint-float-button ng-click="backToJobList()">
						
						</button>
						<div class="pint-job-item-contact">
							<h2>
								Apply now
							</h2>
							<p>
								Call <a class="phone">{{selectedJob.phone}}</a> or send an email to <a class="email">{{selectedJob.email}}</a>
							</p>
						</div>
						<div class="pint-job-item-logo">
							<img data-src="holder.js/120x120" alt="pint-job-item logo" class="{{selectedJob.imgHolderClass}}"  bs-holder />
						</div>
						<h1 class="pint-job-item-title">
							{{selectedJob.title}}
						</h1>
						<p class="pint-job-item-date"> this job was posted <span am-time-ago="selectedJob.date" am-format="X"></span> </p>
						<p class="pint-job-item-description center-block">
							<div>{{selectedJob.description}}</div>
							<img data-src="holder.js/480x320"  bs-holder class="pint-job-item-media img-responsive"/>
						</p>
						<h2>
							This position requires the following skills 
						</h2>
					
						<p class="pint-job-item-tags">
							<span ng-repeat="tag in selectedJob.tags">
								<a class="tag"  ng-class="{'has':hasSkill(tag)}"> {{tag}} </a> 
							</span>
						</p>
						
						
					</article>
				</div>
			</section>
		</div>
	</section>
   	 <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!--<script src="https://code.jquery.com/jquery.js"></script> -->
    
    <script src="<?php echo asset('js/holder.js')?>"></script>
   
    <script src="http://code.angularjs.org/1.2.0-rc.3/angular.min.js"></script>

    <script src="<?php echo asset('js/ui-bootstrap-tpls-0.6.0.min.js')?>"></script>

    <script src="<?php echo asset('js/moment.min.js')?>"></script>
	
	<script src="<?php echo asset('js/angular-moment.min.js')?>"></script>

	<script src="<?php echo asset('js/ng-tags-input.min.js')?>"></script>

    <script src="<?php echo asset('js/app.js')?>"></script>

    <script src="<?php echo asset('js/controllers.js')?>"></script>

    <script src="<?php echo asset('js/directives.js')?>"></script>


  

</body>
</html>
