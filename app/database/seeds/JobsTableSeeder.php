<?php 

class JobsTableSeeder extends Seeder {
	public function run()
	{

		DB::table('jobs')->delete();

		$web_dev_id = Industry::where('industry_name','=','Web Develop')->first()->id;
		$med_pro_id = Industry::where('industry_name','=','Medical Professional')->first()->id;
		$graphic_id = Industry::where('industry_name','=','Graphic/Web design')->first()->id;
		$newJob = Job::create(
			array(
				'job_title' => 'Web developer internship at Laravel',
				'job_description' => ' Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.',
				'job_phone' => '+61402358934',
				'job_email' => 'it.manager@web.lorem.ipsum',
				'job_postcode' => '2213',
				'job_suburb' => 'PANANIA',
				'job_state' => 'NSW',
				'job_logo' => 'http://yysource.com/wp-content/uploads/2013/08/ab8dfcd13b2beafc230b830228913a33.png?9d7bd4'
			
			)
		);
		$newJob->industries()->attach($web_dev_id);

		$newJob = Job::create(
			array(
				'job_title' => 'Django web developer internship at CenturionS',
				'job_description' => 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
',
				'job_phone' => '+61401236932',
				'job_email' => 'web.manager@centurions.ipsum',
				'job_postcode' => '2213',
				'job_suburb' => 'PANANIA',
				'job_state' => 'NSW',
				'job_logo' => 'http://t2.gstatic.com/images?q=tbn:ANd9GcTmULk9_XbYyhZlHga3MmZOj-TLE9zRUOgMh3LyPKojnHnUPQg3'
			)
		);
		$newJob->industries()->attach($web_dev_id);

		$newJob = Job::create(
			array(
				'job_title' => 'Opportunity for full-time position at YeoWoman',
				'job_description' => 'Yeoman 1.0 is more than just a tool. It &lsquo;s a workflow; a collection of tools and best practices working in harmony to make developing for the web even better.

Our workflow is comprised of three tools for improving your productivity and satisfaction when building a web app: yo (the scaffolding tool), grunt (the build tool) and bower (for package management).',
				'job_phone' => '+61406256865',
				'job_email' => 'yo.woman@yw.com',
				'job_postcode' => '2213',
				'job_suburb' => 'PANANIA',
				'job_state' => 'NSW',
				'job_logo' => 'http://yeoman.io/assets/img/yeoman-logo.png'
			)
		);
		$newJob->industries()->attach($web_dev_id);

		$newJob = Job::create(
			array(
				'job_title' => 'Learn how to use Bower in our 4 weeks internship at Holdrz',
				'job_description' => 'Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack. There are no system wide dependencies, no dependencies are shared between different apps, and the dependency tree is flat.

Bower runs over Git, and is package-agnostic. A packaged component can be made up of any type of asset, and use any type of transport (e.g., AMD, CommonJS, etc.).',
				'job_phone' => '+61404930584',
				'job_email' => 'jobs.Opportunity@bower.io',
				'job_postcode' => '2213',
				'job_suburb' => 'PANANIA',
				'job_state' => 'NSW',
				'job_logo' => 'http://bower.io/img/bower-logo.png'
			)
		);
		$newJob->industries()->attach($web_dev_id);

		$newJob = Job::create(
			array(
				'job_title' => 'Nursing interns needed at Royal Hospital',
				'job_description' => 'Each year the Hospital delivers more than 4,200 babies; cares for more than 600 premature babies; treats more than 400 women for gynaecological cancer; provides surgery for more than 80 women with breast cancer; attends to over 450 women requiring acute care services; helps more than 600 women through endo-gynaecological procedures. 
				',
				'job_phone' => '02 9382 6111',
				'job_email' => 'maxine.hamilton@sesiahs.health.nsw.gov.au',
				'job_postcode' => '3056',
				'job_suburb' => 'BRUNSWICK',
				'job_state' => 'VIC',
				'job_logo' => 'http://www.sesiahs.health.nsw.gov.au/rhw/RHW_logo.jpg'
			)
		);
		$newJob->industries()->attach($med_pro_id);


		$newJob = Job::create(
			array(
				'job_title' => 'Graphics design intern @ Glover Garage',
				'job_description' => "Glover's garage Find more detailed information about this photograph: acms.sl.nsw.gov.au/item/itemdetailpaged.aspx?itemid=391713

From the collection of the State Library of New South Wales www.sl.nsw.gov.au ",
				'job_phone' => '02 9382 6111',
				'job_email' => 'glover@garage.com.au',
				'job_postcode' => '2213',
				'job_suburb' => 'PANANIA',
				'job_state' => 'NSW',
				'job_logo' => 'http://images.fromupnorth.com/471/5108c4f8b0902.jpg'
			)
		);
		$newJob->industries()->attach($graphic_id);

		$newJob = Job::create(
			array(
				'job_title' => 'Bison publish design apprenticeship',
				'job_description' => "Thank everyone for all the feedback, I'm really happy to have joined such an active community.
Regarding the design, overall I'm happiest with the B and N, ultimately I decided to stop editing it as we needed to print T shirts. I did at one point try to use the 'I' for the front leg, but thought it took away from the over all shape of the bisons frame. I guess its a square peg that almost made it into a round hole ; )",
				'job_phone' => '3141',
				'job_email' => 'bison@band.com.au',
				'job_postcode' => '3056',
				'job_suburb' => 'BRUNSWICK',
				'job_state' => 'VIC',
				'job_logo' => 'http://logopond.com/logos/1c7f79c1188bb0b6b1ccdcbada974e62.png'
			)
		);
		$newJob->industries()->attach($graphic_id);

		$newJob = Job::create(
			array(
				'job_title' => 'internship at Alight Creative Design Agency',
				'job_description' => "Thank everyone for all the feedback, I'm really happy to have joined such an active community.
Regarding the design, overall I'm happiest with the B and N, ultimately I decided to stop editing it as we needed to print T shirts. I did at one point try to use the 'I' for the front leg, but thought it took away from the over all shape of the bisons frame. I guess its a square peg that almost made it into a round hole ; )",
				'job_phone' => '3141',
				'job_email' => 'bison@band.com.au',
				'job_postcode' => '3056',
				'job_suburb' => 'BRUNSWICK',
				'job_state' => 'VIC',
				'job_logo' => 'http://d1r5i20o8cadcu.cloudfront.net/designs/images/107860/original/design-agency.jpg'
			)
		);
		$newJob->industries()->attach($graphic_id);

		$newJob = Job::create(
			array(
				'job_title' => 'Soft facade jobs available',
				'job_description' => "Thank everyone for all the feedback, I'm really happy to have joined such an active community.
Regarding the design, overall I'm happiest with the B and N, ultimately I decided to stop editing it as we needed to print T shirts. I did at one point try to use the 'I' for the front leg, but thought it took away from the over all shape of the bisons frame. I guess its a square peg that almost made it into a round hole ; )",
				'job_phone' => '3141',
				'job_email' => 'bison@band.com.au',
				'job_postcode' => '3056',
				'job_suburb' => 'BRUNSWICK',
				'job_state' => 'VIC',
				'job_logo' => 'http://d1r5i20o8cadcu.cloudfront.net/designs/images/108356/original/fu-sfacade-fvjtvo.png'
			)
		);
		$newJob->industries()->attach($graphic_id);
		$newJob->industries()->attach($web_dev_id);
		

		$newJob = Job::create(
			array(
				'job_title' => 'The multi tasker internship',
				'job_description' => "Thank everyone for all the feedback, I'm really happy to have joined such an active community.
Regarding the design, overall I'm happiest with the B and N, ultimately I decided to stop editing it as we needed to print T shirts. I did at one point try to use the 'I' for the front leg, but thought it took away from the over all shape of the bisons frame. I guess its a square peg that almost made it into a round hole ; )",
				'job_phone' => '3141',
				'job_email' => 'bison@band.com.au',
				'job_postcode' => '3056',
				'job_suburb' => 'BRUNSWICK',
				'job_state' => 'VIC',
				'job_logo' => 'http://www.thelogomix.com/files/imagecache/v3-logo-detail/SkillGuy.png'
			)
		);
		$newJob->industries()->attach($graphic_id);
		$newJob->industries()->attach($web_dev_id);
	}
}

?>