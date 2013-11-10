var pinternshipDirectives = angular.module('pinternship-directives',[]);

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

pinternshipDirectives.directive('onFinishRender',['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
}]);