<?php


class Job extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */

	protected $table = 'jobs';

	public function skills() {
		return $this->belongsToMany('Skill','job_skill');
	}

	public function industries() {
		return $this->belongsToMany('Industry','industry_job');
	}

}