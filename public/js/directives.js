angular.module('pinternshipApp').directive('bsHolder', function() {
    return {
        link: function (scope, element, attrs) {
            Holder.run({images:element[0], nocss:true});
        }
    };
});

angular.module('pinternshipApp').directive('pintFloatButton', function($window) {
	return {
		link: function (scope, element, attrs){
			angular.element($window).bind("scroll", function(){
				if(window.scrollY>50){
					
					element.css('margin-top', ( parseInt(window.scrollY) - 50 )+ "px");
				}else{
					element.css('margin-top', ( parseInt(window.scrollY) )+ "px");
				}
			});
		}
	}
});