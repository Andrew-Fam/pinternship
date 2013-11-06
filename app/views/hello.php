<!doctype html>
<html lang="en" ng-app="pinternshipApp">
<head>
    <meta charset="UTF-8">
    <title>Pinternship</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo asset('bootstrap/css/bootstrap.css')?>"/>
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo asset('css/bootstrap-tagsinput.css')?>"/>
    <link rel="stylesheet" href="<?php echo asset('css/theme.css')?>"/>
    <link rel="stylesheet" href="<?php echo asset('css/pinternship.css')?>"/>

</head>
<body>
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
					        <input type="text" class="form-control" ng-model="industryQuery" placeholder="Search">
					    </div>
					    <button type="submit" class="btn btn-default fa fa-search"></button>
					    <button type="button" class="btn btn-default fa fa-cog" id="btn-expand-search-options"></button>
				    </form>
			  	</div>
			  	<div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
			  		<div class="navbar-form navbar-left">			    
					    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#post-job-form" id="btn-post-job">post job</button>
				    </div>
			  	</div>
			</div>
		</div>
	</nav>
	<!--<div class="modal fade" id="post-job-form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
		    <div class="modal-content">
		    	<form class="form-horizontal" role="form">
				    <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				        <h4 class="modal-title" id="myModalLabel">Pin a job</h4>
				    </div>
				    <div class="modal-body">
			        
						<div class="form-group">
						    <label for="job-title" class="col-sm-2 control-label">Title</label>
						    <div class="col-sm-10">
						        <input type="text" class="form-control" required id="post-job-title" placeholder="eg. Web designer internship available">
						    </div>
						</div>
						<div class="form-group">
						    <label for="post-email" class="col-sm-2 control-label">Company name</label>
						    <div class="col-sm-10">
						        <input type="email" class="form-control" id="post-email" placeholder="browse file">
						    </div>
					    </div>
						<div class="form-group">
						    <label for="post-email" class="col-sm-2 control-label">Email</label>
						    <div class="col-sm-10">
						        <input type="email" class="form-control" required id="post-email" placeholder="browse file">
						    </div>
					    </div>
					    <div class="form-group">
						    <label for="post-phone" class="col-sm-2 control-label">Phone</label>
						    <div class="col-sm-10">
						        <input type="phone" class="form-control" required id="post-phone" placeholder="browse file">
						    </div>
					    </div>
					    <div class="form-group">
						    <label for="logo" class="col-sm-2 control-label">Logo</label>
						    <div class="col-sm-10">
						        <input type="text" class="form-control" id="post-logo" placeholder="browse file">
						        <button type="button">upload</button>
						    </div>
					    </div>
					    
						<div class="form-group">
						    <label for="post-description" class="col-sm-2 control-label">Description (&lt;=250 characters)</label>
						    <div class="col-sm-10">
						        <textarea id="post-description" class="form-control" required rows="3"></textarea>
						    </div>
						</div>
						<div class="form-group">
						    <label for="post-skills-required" class="col-sm-2 control-label">Skills you look for</label>
						    <div class="col-sm-10">
						       	<select multiple data-role="tagsinput" id="post-skills-required">
									<option value="Photoshop">Photoshop</option> 
									<option value="Responsive design">Responsive design</option> 
									<option value="Mobile first design">Mobile first design</option> 
									<option value="Laravel">Laravel</option> 
									<option value="Composer">Composer</option> 
									<option value="Node.js">Node.js</option>
								</select>
						    </div>
						</div>
						<div class="form-group">
					    	<label for="media" class="col-sm-2 control-label">Additional media (video/photo)</label>
						    <div class="col-sm-10">
						         <input type="text" class="form-control" id="post-logo" placeholder="browse file">
						        <button type="button">upload</button>
						    </div>
					    </div>
					

				    </div>
				    <div class="modal-footer">
				       	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				       	<button type="button" class="btn btn-primary">Pin it</button>
				    </div>
			    </form>
		    </div>
		</div>
	</div>-->

	<section class="pint-ui-frame-wrapper">
		<div class="ng-class: {viewingJob : isViewingJob,'pint-ui-frame': true};" ng-controller="JobListCtrl" ng-cloak >
			<section class="pint-search-options pint-ui-view-top">
				<div class="container">

					<div class="center-block">
						<div class="form-group">
					    	<label for="skills-filter" class="col-sm-2 control-label">Skills you have</label>
						    <div class="col-sm-10">
						       	<select multiple data-role="tagsinput" id="skills-filter">
									<option value="Photoshop">Photoshop</option> 
									<option value="Responsive design">Responsive design</option> 
									<option value="Mobile first design">Mobile first design</option> 
									<option value="Laravel">Laravel</option> 
									<option value="Composer">Composer</option> 
									<option value="Node.js">Node.js</option>
								</select>
						    </div>
					    </div>
						
					</div>
					<div class="center">
						<button type="button" class="btn fa fa-chevron-up" id="btn-collapse-search-options"></button>
					</div>
				</div>
			</section>
			<section class="pint-search-result list-group pint-ui-view-left" >
				<div class="container">
			
					<article ng-repeat="job in jobs" class="pint-job-item list-group-item center-block" >
						<div class="pint-job-item-thumbnail">
							<img data-src="holder.js/100x100" alt="pint-job-item" class="img-responsive {{job.imgHolderClass}}" bs-holder/>
						</div>
						<div class="pint-job-item-content">
							<h1 class="pint-job-item-title"> {{job.title}}</h1>
							<p class="pint-job-item-date"> {{job.date}} </p>
							<p class="pint-job-item-description">
								{{job.description}}
							</p>
							<p class="pint-job-item-tags">
								<a class="tag" ng-repeat="tag in job.tags"> {{tag}} </a> 
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
						<div class="pint-job-item-logo">
							<img data-src="holder.js/120x120" alt="pint-job-item logo" class="{{selectedJob.imgHolderClass}}"  bs-holder />
						</div>
						<h1 class="pint-job-item-title">
							{{selectedJob.title}}
						</h1>
						<p class="pint-job-item-date"> {{selectedJob.date}} </p>
						<p class="pint-job-item-description center-block">
							<img data-src="holder.js/480x320"  bs-holder class="pint-job-item-media img-responsive"/>
							<div>{{selectedJob.description}}</div>
						</p>
						<h2>
							This position requires the following skills 
						</h2>
					
						<p class="pint-job-item-tags">
							<a class="tag" ng-repeat="tag in selectedJob.tags"> {{tag}} </a> 
						</p>
						
						<div class="pint-job-item-contact">
							<h2>
								Apply now by
							</h2>
							<p>
								Calling <a class="phone">+619483950</a> or sending an email to <a class="email">we.got.jobs@enterprise.hire</a>
							</p>
						</div>
					</article>
				</div>
			</section>
		</div>
	</section>
   	 <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <!--<script src="<?php echo asset('bootstrap/js/bootstrap.min.js')?>"></script> -->
    <script src="<?php echo asset('js/holder.js')?>"></script>
    <!--<script src="<?php echo asset('js/bootstrap-tagsinput.min.js')?>"></script> -->
    <script src="http://code.angularjs.org/1.2.0-rc.3/angular.min.js"></script>
    <script src="<?php echo asset('js/ui-bootstrap-tpls-0.6.0.min.js')?>"></script>

    <script src="<?php echo asset('js/app.js')?>"></script>

    <script src="<?php echo asset('js/controllers.js')?>"></script>

    <script src="<?php echo asset('js/directives.js')?>"></script>

  

</body>
</html>
