<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('IndustriesTableSeeder');
		$this->command->info('Industries table seeded');
		$this->call('JobsTableSeeder');
		$this->command->info('Jobs table seeded');
		$this->call('SkillsTableSeeder');
		$this->command->info('Skills table seeded');
	}

}

?>