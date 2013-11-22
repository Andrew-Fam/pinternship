<?php

use Guzzle\Http\Client;

class LocationController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
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
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
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


	/*
	* query ausPost api to leverage their postcode search engine
	*/

	public function ausPostQuery()
	{
		$input  = Input::all();

		if(strlen($input['q'])<4) {
			return json_encode([]);
		}

		$auth_key = '4fa3a420-2948-49ee-a620-8d7dc6f5294c';
		

		$client = new Client();

		$request = $client->get('https://auspost.com.au/api/postcode/search.json?q='.$input['q'].'&excludePostBoxFlag=true')->setAuth('auth-token',$auth_key);

		$response = $request->send();

		$string = (string)  $response->getBody();

		$results = json_decode($string);

		if(is_array($results->localities->locality)) {
			$results = array_slice($results->localities->locality, 0, 5);
		}
		else {
			$results = [$results->localities->locality];
		}

		

		return json_encode($results);
	}
}