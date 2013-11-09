<?php


class Skill extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'skills';

	public function industries()
	{
		return $this->belongsToMany('Industry','industry_skill');
	}
	
	public function jobs()
	{
		return $this->belongsToMany('Job','job_skill');
	}
}