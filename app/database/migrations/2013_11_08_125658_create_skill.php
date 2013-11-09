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
			$table->string('skil_name',255);
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