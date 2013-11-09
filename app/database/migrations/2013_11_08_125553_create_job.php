<?php

use Illuminate\Database\Migrations\Migration;

class CreateJob extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('jobs',function($table){
			$table->engine = 'InnoDB';
			$table->increments('id');
			$table->string('job_title', 255);
			$table->text('job_description');
			$table->string('job_phone',15);
			$table->string('job_email',255);
			$table->string('job_logo');
			$table->timestamps();
			$table->softDeletes();
		});


	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('jobs');
	}

}