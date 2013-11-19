<?php

class IndustryController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
		$industries = Industry::all();

		return $industries->toArray();
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
		echo 'Industry Controller create';
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
		echo 'Industry Controller store';
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		echo 'Industry Controller show';
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		echo 'Industry Controller edit';
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		echo 'Industry Controller update';
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		echo 'Industry Controller destroy';
	}

	/* custom functions */

	public function jobs($id)
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
		
		$industry = Industry::with('Jobs.Skills')->find($id);
		return $industry->jobs()->with('skills','industries')->orderBy('created_at', 'desc')->take($take)->skip($skip)->get()->toArray();
	}

}