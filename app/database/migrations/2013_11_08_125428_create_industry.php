<?php

use Illuminate\Database\Migrations\Migration;

class CreateIndustry extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('industries', function($table) {
			$table->engine = 'InnoDB';
			$table->increments('id');
			$table->string('industry_name', 255);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('industries');
	}

}