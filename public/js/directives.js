var pinternshipDirectives = angular.module('pinternship-directives',[]);

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