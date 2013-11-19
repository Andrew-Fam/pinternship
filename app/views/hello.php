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
				<div class="row text-center">
					<div>
						Bitches be like,
					</div>
					<h1>JUST GET A JOB!</h1>
					<div>
						It is hard man! We need a way to end this experience-lacking dilemma!
					</div>
				</div>
				<div class="row text-center">
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
    	<nav class="pint-nav-bar">
    	</nav>
    	<section class="pint-post-job-view">
    		<div class="container">
    			<div class="row">
    				<div class="col-sm-12">
    					 <h3>Post a job: </h3>

    				</div>
    			</div>
		    	<div class="row">
		    		<form name="postJobForm" novalidate ng-submit="submitJob()">
			    		<div class="col-sm-6">
			    			<div class="form-group">
					    		<label for="new-job-title">Title <span class="form-error" ng-show="postJobForm.title.$error.required"> - this field is required</span></label> 
					        	<input id="new-job-title" type="text" name="title" class="form-control" required ng-model="newJob.job_title" placeholder="title"/>
					        </div>

					        <div class="form-group">	
					        	<label for="new-job-industry">Industry <span class="form-error" ng-show="industryIsInvalid()"> - type and select from suggestion</span></label>	
					        	<tags-input id="new-job-skills" 
					        		tags-input-source="getIndustryTagsSource()" 
					        		tags-input-type-ahead="industry as industry.industry_name for industry in source | filter: { industry_name : $viewValue } | limitTo:6" 
					        		class="form-control" 
					        		ng-display-model="newJob.industryTags" 
					        		ng-data-model="newJob.industries"
					        		placeholder="eg. Graphic/Web design"
					        		max-length="140"
					        		min-length="1"
					        		replace-spaces-with-dashes="false"
					        		tags-input-display-field="industry_name"
					        		></tags-input>
					        </div>

					    	

					        <div class="form-group">
					        	<label for="new-job-industry" name="skills" >Skills required <span class="form-error" ng-show="skillsInvalid()"> - type and select from suggestion</span></label>	
					        	<tags-input id="new-job-skills" 
					        		tags-input-source="getSkillTagsSource()" 
					        		tags-input-type-ahead="skill as skill.skill_name for skill in source | filter: { skill_name : $viewValue } | limitTo:6" 
					        		class="form-control" 
					        		ng-display-model="newJob.skillTags" 
					        		ng-data-model="newJob.skills"
					        		placeholder="eg. Photoshop"
					        		max-length="140"
					        		min-length="1"
					        		replace-spaces-with-dashes="false"
					        		tags-input-display-field="skill_name"
					        		></tags-input>
					    	</div>
					    
					         <div class="form-group">	
						    	<label for="new-job-phone">Phone - optional </label>	
						    	<input id="new-job-phone" name="phone" type="text" class="form-control" ng-model="newJob.job_phone"/>
						    </div>
						    <div class="form-group">	
						    	<label for="new-job-email">Email <span class="form-error" ng-show="postJobForm.email.$error.required"> - email is required</span> <span class="form-error" ng-show="postJobForm.email.$error.email"> - please enter valid email address</span> </label>	
						    	<input id="new-job-email" name="email" type="email" class="form-control" ng-model="newJob.job_email" required placeholder="eg. email@sample.com"/>
						    </div>
					       
			        	</div>
						<div class="col-sm-6">
							<div class="form-group">
						    	<label for="new-job-description">Describe the job <span class="form-error" ng-show="postJobForm.description.$error.required"> - type and select from suggestion</span> </label>
						    	<textarea rows="10" id="new-job-description" name="description" class="form-control" ng-model="newJob.job_description" placeholder="description" required></textarea>
						    </div>

						    <div class="form-group">	
						    	<label for="new-job-logo">Logo</label>	
						    	<input id="new-job-logo" name="logo" type="text" class="form-control" ng-model="newJob.job_logo" placeholder="logo"/>
						    </div>
						   
						</div>
					</form>
		        </div>
	        </div>
		</section>
		<section class="pint-action-bar">
			<div class="container">
				<div class="row">
		        	<a class="btn-default col-xs-4" href="<?php echo route('home'); ?>" ng-click="cancel()">Cancel</a>
		        	<a class="btn-primary col-xs-4" href="/#/jobs/post/preview" ng-click="storePreviewJob()">Preview</a>
				    <a class="btn-success col-xs-4" ng-click="postJob()">Post it</a>
		        </div>
		    </div>
		</section>
    </script>
    <script type="text/ng-template" id="jobs.html">
	    <nav class="pint-nav-bar" role="navigation">
			<div class="container" >
				<div class="row">
					<div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
					    <a class="navbar-brand hidden-xs" href="<?php echo route('home'); ?>">Pinternship</a>
					    <a class="navbar-brand visible-xs" href="<?php echo route('home'); ?>">P</a>
					</div>
				  	<div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">
				  		<form class="pint-search-form navbar-form navbar-left" role="search">
						    <div class="form-group">
						        <input type="text" class="form-control" ng-model="cacheService.selectedIndustry" value="{{cacheService.selectedIndustry}}" typeahead=" industry as industry.industry_name for industry in cacheService.industries | filter: { industry_name : $viewValue } | limitTo:8" typeahead-editable="false" typeahead-on-select="refreshJobs()" placeholder="Search">
						    </div>
						    <button type="submit" ng-click="moreJobs()" ng-disabled="isLoadingJob" class="btn btn-default fa fa-search"></button>
					    </form>
				  	</div>
				</div>
			</div>
		</nav>
    	<section class="pint-search-result list-group" ng-cloak>
			<div class="container">
				<article ng-repeat="job in cacheService.jobs  track by job.id" on-finish-render class="pint-job-item list-group-item center-block" >
					<div class="pint-job-item-thumbnail">
						<img ng-src="{{job.job_logo}}" alt="logo" class=" img-rounded" bs-holder/>
					</div>
					<div class="pint-job-item-content">
						<h1 class="pint-job-item-title"> {{job.job_title}} - <span ng-repeat="industry in job.industries"> <a class="tag" title="search for jobs in {{industry.industry_name}}" ng-href="<?php echo route('home'); ?>jobs/?industry={{industry.id}}&industry_name={{industry.industry_name | slugify}}">{{industry.industry_name}}{{$last ? '' : ', '}}</a> </span></h1>
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
				<div>
					<button class="btn center-block btn-primary" ng-disabled="isLoadingJob" ng-click="moreJobs()">more jobs <img alt="loading" ng-show="isLoadingJob" src="<?php echo asset('images/loading.gif')?>" /></button>
				</div>
			</div>
		</section>
   	</script>
	<script type="text/ng-template" id="viewJob.html">
		<nav class="pint-nav-bar">
			<div class="container">
				<div class="row">
					<a class="back-to-list fa fa-chevron-left col-xs-3 text-center" ng-hide="previewing" href="/#/jobs" pint-float-button>
					</a>
				</div>
			</div>
		</nav>
		<section ng-cloak>
			<div class="container">
				<div class="row">
					<article class="pint-job-item-view col-sm-8 col-sm-offset-2">

						
						
						<div class="pint-job-item-logo">
							<img ng-src="{{job.job_logo}}" class="img-responsive center-block"/>
						</div>
						<h1 class="pint-job-item-title">
							{{job.job_title}} - <span ng-repeat="industry in job.industries"> <a class="tag" title="search for jobs in {{industry.industry_name}}" ng-href="<?php echo route('home'); ?>jobs/?industry={{industry.id}}&industry_name={{industry.industry_name | slugify}}">{{industry.industry_name}}{{$last ? '' : ', '}}</a> </span>
						</h1>
						<p class="pint-job-item-date"> this job was posted <span am-time-ago="job.created_at" am-format="YYYY-MM-DD HH:mm:ss"></span> </p>
						<p class="pint-job-item-description center-block">
							{{job.job_description}}
						</p>
						<h1>
							This position requires the following skills 
						</h1>
					
						<p class="pint-job-item-tags">
							<span ng-repeat="skill in job.skills">
								<a class="tag" > {{skill.skill_name}} </a> 
							</span>
						</p>
						
						
						
					</article>
				</div>
			</div>
		</section>
		<section class="pint-action-bar" ng-show="previewing">
			<div class="container">
				<div class="row">
		        	<a class="btn-primary col-xs-6" ng-click="cancel()">Back</a>
				    <a class="btn-success col-xs-6" ng-click="postJob()">Post it</a>
		        </div>
		    </div>
		</section>
		<section class="pint-action-bar" ng-hide="previewing">
			<div class="container">
				<div class="row">
		        	<button class="btn-primary col-xs-12" ng-click="contactIsCollapsed = !contactIsCollapsed">Contact</button>
		        </div>
		        <div class="pint-job-item-contact col-xs-12" ng-class="{ 'collapsed' : contactIsCollapsed}">
						Call <a class="phone">{{job.job_phone}}</a> or send an email to <a class="email">{{job.job_email}}</a>
				</div>
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
   
    <script src="http://code.angularjs.org/1.2.0-rc.3/angular.js"></script>
 	
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
