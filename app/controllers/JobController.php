<?php

class JobController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
		$jobs = Job::with('skills')->get();
		return $jobs->toArray();
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$inputs = Input::all();


		$job = new Job;
		$job->job_title = $inputs['title'];
		$job->job_description  = $inputs['description'];
		$job->job_logo = $inputs['logo'];

		
		
		if($job->save()){
			
			foreach( $inputs['skills'] as $skill_id ) {
				$job->skills()->attach($skill_id);
			}

			foreach( $inputs['industries'] as $industry_id ) {
				$job->industries()->attach($industry_id);
			}
			
			$response = Response::make($job->toArray(),'200') ;
		}else
		{
			$response = Response::make('Could not save','500') ;
		}

		return $response;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$job = Job::with('skills')->find($id);
		return $job->toJson();
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}