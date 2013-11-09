<?php


class Industry extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'industries';

	public function jobs(){
		return $this->belongsToMany('Job','industry_job');
	}

	public function skills(){
		return $this->belongsToMany('Skill','industry_skill');
	}
}