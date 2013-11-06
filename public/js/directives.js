angular.module('pinternshipApp').directive('bsHolder', function() {
    return {
        link: function (scope, element, attrs) {
            Holder.run({images:element.get(0), nocss:true});
        }
    };
});

angular.module('pinternshipApp').directive('pintFloatButton', function($window) {
	return {
		link: function (scope, element, attrs){
			angular.element($window).bind("scroll", function(){
				if($(document).scrollTop()>50){
					element.css('margin-top', $(document).scrollTop() - 50 );
				}else{
					element.css('margin-top', $(document).scrollTop());
				}
			});
		}
	}
});