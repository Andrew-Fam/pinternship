<?php

use Illuminate\Database\Migrations\Migration;

class CreateIndustryJob extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('industry_job',function ($table){
			$table->engine = 'InnoDB';
			$table->increments('id');

			$table->integer('job_id')->unsigned();
			$table->integer('industry_id')->unsigned();
			$table->foreign('industry_id')->references('id')->on('industries');
			$table->foreign('job_id')->references('id')->on('jobs');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('industry_job');
	}

}