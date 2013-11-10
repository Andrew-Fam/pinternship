<?php

use Illuminate\Database\Migrations\Migration;

class CreateSkill extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('skills', function($table) {
			$table->engine = 'InnoDB';
			$table->increments('id');
			$table->string('skill_name',255);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('skills');
	}

}