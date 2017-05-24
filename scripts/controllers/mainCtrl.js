'use strict';

angular.module('ngBasicMath')
.controller('mainCtrl', ['$scope', function($scope){
    $scope.evaluate = function () {
        $scope.results = evaluateExpression($scope.mathInput);  
    }
}]);