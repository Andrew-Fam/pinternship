var pinternshipDirectives = angular.module('pinternship-directives',[]).directive('bsHolder', function() {
    return {
        link: function (scope, element, attrs) {
            Holder.run({images:element[0], nocss:true});
        }
    };
});

pinternshipDirectives.directive('pintFloatButton', function($window) {
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