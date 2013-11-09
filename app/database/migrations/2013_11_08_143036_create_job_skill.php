<?php

use Illuminate\Database\Migrations\Migration;

class CreateJobSkill extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('job_skill',function ($table){
			$table->engine = 'InnoDB';
			$table->increments('id');
			$table->integer('job_id')->unsigned();
			$table->integer('skill_id')->unsigned();
			$table->foreign('job_id')->references('id')->on('jobs')->onDelete('CASCADE')->onUpdate('CASCADE');
			$table->foreign('skill_id')->references('id')->on('skills')->onDelete('CASCADE')->onUpdate('CASCADE');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('job_skill');
	}

}