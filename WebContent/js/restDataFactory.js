/**
 * 
 */

contactsDirectoryApp.factory('restDataFactory',['$http', function($http) {
	
	var urlBase = '/api';
	var restDataFactory = {};
	
	restDataFactory.getAllEmployees = function() {
		return $http.get(urlBase+'/');
	}
	
}]);