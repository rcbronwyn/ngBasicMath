angular.module('ngBasicMath')
.directive('mathInput', function(){
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl: './scripts/templates/input.html'
    }
});