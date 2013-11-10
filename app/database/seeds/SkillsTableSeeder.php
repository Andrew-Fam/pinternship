<?php 

class SkillsTableSeeder extends Seeder {
	public function run()
	{

		DB::table('skills')->delete();


		$job1 = Job::all()[0]->id;
		$job2 = Job::all()[1]->id;
		$job3 = Job::all()[2]->id;
		$job4 = Job::all()[3]->id;

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Zend'
			)
		);
		$newSkill->jobs()->attach($job1);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job3);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Laravel'
			)
		);
		$newSkill->jobs()->attach($job4);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job3);


		$newSkill = Skill::create(
			array(
				'skill_name' => 'mySQL'
			)
		);

		$newSkill->jobs()->attach($job1);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job3);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'SQL SERVER'
			)
		);

		$newSkill->jobs()->attach($job4);


		$newSkill = Skill::create(
			array(
				'skill_name' => 'CodeIgniter'
			)
		);

		$newSkill->jobs()->attach($job4);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job3);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'javascript'
			)
		);

		$newSkill->jobs()->attach($job1);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job3);
		$newSkill->jobs()->attach($job4);


		$newSkill = Skill::create(
			array(
				'skill_name' => 'jQuery'
			)
		);

		$newSkill->jobs()->attach($job1);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job3);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'jQuery Mobile'
			)
		);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'HTML5'
			)
		);

		$newSkill->jobs()->attach($job1);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job4);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Angularjs'
			)
		);

		$newSkill->jobs()->attach($job1);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job4);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Node.js'
			)
		);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Jekyll'
			)
		);

		$newSkill->jobs()->attach($job1);
		$newSkill->jobs()->attach($job4);
		$newSkill->jobs()->attach($job3);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'WordPress'
			)
		);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Joomla'
			)
		);

		$newSkill->jobs()->attach($job1);
	

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Drupal'
			)
		);

		$newSkill->jobs()->attach($job2);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Magento'
			)
		);

		$newSkill->jobs()->attach($job3);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Bootstrap framework'
			)
		);

		$newSkill->jobs()->attach($job4);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Foundation framework'
			)
		);

		$newSkill->jobs()->attach($job3);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Responsive design'
			)
		);

		$newSkill->jobs()->attach($job1);
		$newSkill->jobs()->attach($job2);
		$newSkill->jobs()->attach($job3);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Mobile-first design'
			)
		);

		$newSkill->jobs()->attach($job4);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Photoshop'
			)
		);

		$newSkill->jobs()->attach($job1);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Adobe Illustrator'
			)
		);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Adobe Indesign'
			)
		);

		$newSkill = Skill::create(
			array(
				'skill_name' => 'Dreamweaver'
			)
		);

	}
}

?>