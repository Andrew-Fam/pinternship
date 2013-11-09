<?php 

class IndustriesTableSeeder extends Seeder {
	public function run()
	{
		DB::table('industry_job')->delete();
		DB::table('jobs')->delete();
		DB::table('industries')->delete();
		

		$industries = [
			['industry_name' => 'Graphic/Web design'],
			['industry_name' => 'Web Develop'],
			['industry_name' => 'Mobile Application Develop'],
			['industry_name' => 'Accounting'],
			['industry_name' => 'Pharmacy'],
			['industry_name' => 'Software Engineering'],
			['industry_name' => 'Multimedia Engineering'],
			['industry_name' => 'Business Administration'],
			['industry_name' => 'Network Administration'],
			['industry_name' => 'Computer Security'],
			['industry_name' => 'Press Design'],
			['industry_name' => 'Fashion Design'],
			['industry_name' => 'Architecture'],
			['industry_name' => 'Mechanical Engineering'],
			['industry_name' => 'Chemical Engineering'],
			['industry_name' => 'Medical Professional'],
			['industry_name' => 'Biologist']
		];

		DB::table('industries')->insert($industries);
	}
}

?>