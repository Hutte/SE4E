
var app = angular.module('myApp',[]);

//Just like the main method in Java
app.run(function($rootScope) {
	$rootScope.name = "Manav Bhanot";
});

app.controller('AppCtrl', ['$scope',function($scope) {	
	
	$scope.user = {}; 
	
	$scope.master = {}; 
	
	$scope.save = function() { 
		alert('Hi');
		$scope.master = angular.copy($scope.user); 
	};
	
	$scope.reset = function() { 
		$scope.user = angular.copy($scope.master); 
	};
}]);

