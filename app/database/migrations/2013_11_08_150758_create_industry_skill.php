<?php

use Illuminate\Database\Migrations\Migration;

class CreateIndustrySkill extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('industry_skill',function ($table){

			$table->engine = 'InnoDB';
			$table->increments('id');
			$table->integer('skill_id')->unsigned();
			$table->integer('industry_id')->unsigned();
			$table->foreign('industry_id')->references('id')->on('industries');
			$table->foreign('skill_id')->references('id')->on('skills');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('industry_skill');
	}

}