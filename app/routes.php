<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});



Route::group(array('prefix' => 'jobs'), function(){

	Route::model('job','Job');

	Route::get('/', function(){
		return View::make('hello');
	});
	Route::get('{job}/{slug?}', array('as'=>'job.view', function(Job $job, $slug = null) {
		
		if($slug==null || Str::slug($job->job_title)!=$slug) {
			
			
			return Redirect::route('job.view', array( $job->id , Str::slug($job->job_title) ), 301 );

		} else {
			return View::make('hello');
		}
		
	}));

});

Route::group(array('prefix' => 'api/v0.1'), function(){
	
	Route::resource('industries','IndustryController');

	Route::resource('jobs','JobController');

	Route::get('industries/{id}/jobs','IndustryController@jobs');
});
