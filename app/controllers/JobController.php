<?php

class JobController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$inputs = Input::all();


		if(isset($inputs['skip']) && is_numeric($inputs['skip'])) {
			$skip = $inputs['skip'];
		} else
		{
			$skip = 0;
		}
		if(isset($inputs['take']) && is_numeric($inputs['take'])) {
			$take = $inputs['take'];
		} else
		{
			$take = 3;
		}
		
		//
		$jobs = Job::with('skills','industries')->take($take)->skip($skip)->get();
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
		$job->job_title = $inputs['job_title'];
		$job->job_description  = $inputs['job_description'];
		$job->job_logo = $inputs['job_logo'];
		$job->job_email = $inputs['job_email'];
		$job->job_phone = $inputs['job_phone'];
		
		$validator = Validator::make(
			array(
				'title' => $job->job_title,
				'description' => $job->job_description,
				'email' => $job->job_email
			),
			array(
				'title' => 'required',
				'description' => 'required',
				'email' => 'required|email'
			)
		);

		if( $validator->fails()){
			$response = Response::make("some required fields are missing or invalid",'400') ;
		}
		else if(count($inputs['skills'])<=0 || count($inputs['industries'])<=0){
			$response = Response::make("skills tags and industries tags are required",'400') ;
		}
		else if($job->save()){
			
			foreach( $inputs['skills'] as $skill_id ) {
				$job->skills()->attach($skill_id);
			}

			foreach( $inputs['industries'] as $industry_id ) {
				$job->industries()->attach($industry_id);
			}

			$response = Response::make($job->toArray(),'201') ;
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
		$job = Job::with('skills','industries')->find($id);
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