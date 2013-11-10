<!doctype html>
<html lang="en" ng-app="pinternshipApp" >
<head>
    <meta charset="UTF-8">
    <title>Pinternship</title>
    <meta name="fragment" content="!">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo asset('bootstrap/css/bootstrap.css')?>"/>
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo asset('css/ng-tags-input.min.css')?>"/>
    <link rel="stylesheet" href="<?php echo asset('css/pinternship.css')?>"/>
    <link rel="stylesheet" href="<?php echo asset('css/theme.css')?>"/>
    <link rel="stylesheet" href="<?php echo asset('css/pinternship.css')?>"/>

</head>
<body >
	<script type="text/ng-template" id="home.html">
		<section class="pint-home-view">
			<div class="container">
				<div class="row center">
					<div>
						Bitches be like,
					</div>
					<h1>FIND A JOB!</h1>
					<div>
						Its been tiring maaan! Aint easy, this job searching thing. We need a way to end this experience-lacking shit!
					</div>
				</div>
				<div class="row center">
					<a class="btn-primary cta col-sm-6" href="/#/jobs">Browse internships</a>
					<a class="btn-primary cta col-sm-6" href="/#/jobs/post">Post internship</a>
				</div>
			</div>
		</section>
    </script>
    <script type="text/ng-template" id="skills.html">
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
    	<section class="pint-post-job-view">
    		<div class="container">
		    	<div class="row">
		    		<div class="col-sm-3">
		    		</div>
		    		<div class="col-xs-12 col-sm-6">
		    			 <h3>Post a job: </h3>

				        <div class="form-group">	
				        	<label for="new-job-industry">Industry</label>	
				        	<input type="text" id="new-job-industry" class="form-control" ng-model="newJob.industry"  typeahead=" industry as industry.industry_name for industry in cacheService.industries | filter: { industry_name : $viewValue } | limitTo:8" typeahead-editable="false" placeholder="eg. Web Develop">
				        </div>

				    	<div class="form-group">
				    		<label for="new-job-title">Title</label>
				        	<input id="new-job-title" type="text" class="form-control" ng-model="newJob.title" placeholder="title"/>
				        </div>

				        <div class="form-group">
				        	<label for="new-job-description">Describe the job</label>
				        	<textarea rows="10" id="new-job-description" class="form-control" ng-model="newJob.description" placeholder="description"></textarea>
				        </div>

				        <div class="form-group">	
				        	<label for="new-job-logo">Logo</label>	
				        	<input id="new-job-logo" type="text" class="form-control" ng-model="newJob.logo" placeholder="logo"/>
				        </div>

				        <div class="form-group">	
				        	<label for="new-job-industry">Skills required</label>	
				        	<tags-input id="new-job-skills" class="form-control" ng-model="newJob.tags" placeholder="eg. Photoshop"></tags-input>
				    	</div>
		        	</div>
		        </div>
	        </div>
		</section>
		<section class="pint-action-bar">
			<div class="row">
	        	<button class="btn-default col-xs-6" ng-click="cancel()">Cancel</button>

			    <button class="btn-primary col-xs-6" ng-click="ok()">OK</button>
	        </div>
		</section>
    </script>
    <script type="text/ng-template" id="jobs.html">
	    <nav class="pint-navbar navbar navbar-fixed-top navbar-default" role="navigation">
			<div class="container" >
			  <!-- Brand and toggle get grouped for better mobile display -->
				<div class="row">
					<div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
					    <a class="navbar-brand hidden-xs" href="<?php echo route('home'); ?>">Pinternship</a>
					    <a class="navbar-brand visible-xs" href="<?php echo route('home'); ?>">P</a>
					</div>
				  	<div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">
				  		<form class="pint-search-form navbar-form navbar-left" role="search">
						    <div class="form-group">
						        <input type="text" class="form-control" ng-model="cacheService.selectedIndustry" value="{{cacheService.selectedIndustry}}" typeahead=" industry as industry.industry_name for industry in cacheService.industries | filter: { industry_name : $viewValue } | limitTo:8" typeahead-editable="false" typeahead-on-select="getJobs()" placeholder="Search">
						    </div>
						    <button type="submit" ng-click="getJobs()" class="btn btn-default fa fa-search"></button>
						   
					    </form>
				  	</div>
				</div>
			</div>
		</nav>
    	<section class="pint-search-result list-group" ng-cloak>
			<div class="container">
				<article ng-repeat="job in jobs | orderBy:'date':true" on-finish-render class="pint-job-item list-group-item center-block" >
					<div class="pint-job-item-thumbnail">
						<img ng-src="{{job.job_logo}}" alt="logo" class=" img-rounded" bs-holder/>
					</div>
					<div class="pint-job-item-content">
						<h1 class="pint-job-item-title"> {{job.job_title}}</h1>
						<p class="pint-job-item-date" am-time-ago="job.created_at" am-format="YYYY-MM-DD HH:mm:ss"> </p>
						<p class="pint-job-item-description">
							{{job.job_description | truncate:140}}
						</p>
						<p class="pint-job-item-tags">
							<span ng-repeat="skill in job.skills">
								<a class="tag" > {{skill.skill_name}} </a> 
							</span>
						</p>
					</div>
					<a class="pint-job-item-selector" ng-href="/#/jobs/{{job.id}}/{{job.job_title | slugify}}" ng-click="switchToJobView(job)"><i class="fa fa-chevron-right fa-fw"></i></a>
				</article>
		
			</div>
		</section>
   	</script>
	<script type="text/ng-template" id="viewJob.html">
		<section ng-cloak>
			<div class="container">
			
				<article class="pint-job-item-view">

					<a class="back-to-list fa fa-chevron-left" href="/#/jobs" pint-float-button>
					
					</a>
					
					<div class="pint-job-item-logo">
						<img ng-src="{{job.job_logo}}" class="img-responsive center-block"/>
					</div>
					<h1 class="pint-job-item-title">
						{{job.job_title}}
					</h1>
					<p class="pint-job-item-date"> this job was posted <span am-time-ago="job.created_at" am-format="YYYY-MM-DD HH:mm:ss"></span> </p>
					<p class="pint-job-item-description center-block">
						<div>{{job.job_description}}</div>
					</p>
					<h1>
						This position requires the following skills 
					</h1>
				
					<p class="pint-job-item-tags">
						<span ng-repeat="skill in job.skills">
							<a class="tag" > {{skill.skill_name}} </a> 
						</span>
					</p>
					
					<div class="pint-job-item-contact">
						<h1>
							Apply now
						</h1>
						<p>
							Call <a class="phone">{{job.job_phone}}</a> or send an email to <a class="email">{{job.job_email}}</a>
						</p>
					</div>
					
				</article>
			</div>
		</section>
	</script>
	<section class="view-animate-container">
		<div ng-view class="view-animate" ng-cloak>

		</div>
	</section>
   	 <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!--<script src="https://code.jquery.com/jquery.js"></script> -->
    
    <script src="<?php echo asset('js/holder.js')?>"></script>
   
    <script src="http://code.angularjs.org/1.2.0-rc.3/angular.min.js"></script>
 	
 	<script src="http://code.angularjs.org/1.2.0-rc.3/angular-animate.min.js"></script>
	
	<script src="http://code.angularjs.org/1.2.0-rc.3/angular-route.min.js"></script>
    
    <script src="<?php echo asset('js/ui-bootstrap-tpls-0.6.0.min.js')?>"></script>

    <script src="<?php echo asset('js/moment.min.js')?>"></script>
	
	<script src="<?php echo asset('js/angular-moment.min.js')?>"></script>

	<script src="<?php echo asset('js/ng-tags-input.min.js')?>"></script>

	<script src="<?php echo asset('js/lodash.min.js')?>"></script>

	<script src="<?php echo asset('js/restangular.min.js')?>"></script>

	<script src="<?php echo asset('js/igTruncate.js')?>"></script>

	<script src="<?php echo asset('js/angular-slugify.js')?>"></script>

   	<script src="<?php echo asset('js/app.js')?>"></script>

    <script src="<?php echo asset('js/controllers.js')?>"></script>

    <script src="<?php echo asset('js/directives.js')?>"></script>


  	

</body>
</html>
