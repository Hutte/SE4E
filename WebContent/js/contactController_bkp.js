/**
 * 
 */

var uid = 0;

var contactsDirectoryApp = angular.module('contactsDirectoryApp', []);

contactsDirectoryApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/DisplayContacts', {
			templateUrl: 'templates/showDetails.html',
			controller: 'ShowUsersController'
		}).
		when('/AddNewContact', {
			templateUrl: 'templates/addNewContact.html',
			controller: 'AddNewContactsController'
		}).
		when('/AddNewContact/:id', {
			templateUrl: 'templates/addNewContact.html',
			controller: 'AddNewContactsController'
		}).
		otherwise({
			templateUrl: 'templates/addNewContact.html',
			controller: 'AddNewContactsController'
		});
}]);

contactsDirectoryApp.controller('ShowUsersController', ['$scope',function($scope) {
	
$scope.deleteContact = function(id) {
		
		// Search contact with given id and delete it		
		for (i in $scope.contacts) {
			if ($scope.contacts[i].id === id) {
				$scope.contacts.splice(i, 1);
				$scope.newContact = {};
			}
		}
	};
	
	/*$scope.edit = function(id) {
		
		// Edit the corresponding contact
		
		for (i in $scope.contacts) {
			if ($scope.contacts[i].id === id) {
				
				// Manually copying the values
				//$scope.newContact.name = $scope.contacts[i].name;
				//$scope.newContact.email = $scope.contacts[i].email;
				//$scope.newContact.phone = $scope.contacts[i].phone;
				
				$scope.newContact = angular.copy($scope.contacts[i]);
			}
		}
	};*/
}]);

contactsDirectoryApp.controller('AddNewContactsController', function($scope, $routeParams) {
	
	if ($routeParams.id != null) {
		$scope.newContact = angular.copy($scope.contacts[$routeParams.id]);
	}
	
	$scope.saveContact = function() {
		if ($scope.newContact.id == null) {
			
			//if this is a new contact, then add it in the contacts array
			$scope.newContact.id = uid;
			uid++;
			$scope.contacts.push($scope.newContact);
			
		} else {
			
			// For existing contacts, find this contact and update it			
			for (i in $scope.contacts) {
				if ($scope.contacts[i].id === $scope.newContact.id) {
					$scope.contacts[i] = $scope.newContact;
				}
			}
		}
		
		//Clear the add contacts form
		$scope.newContact = {};
	};
	
});

contactsDirectoryApp.controller('ContactController', ['$scope',function($scope) {

								
	$scope.contacts = new Array();

	var url = "http://localhost:8080/FirstAngularSpringHibernateWebProject/response.json";

	$http.get(url).success(function(response) {
		console.log(response);
		$scope.contact = response;
		console.log($scope.contact);
	});
	
	// $scope.contacts.push({'id':'1', 'name':'Manav Bhanot',
	// 'email':'manav.876@hsc.com', 'phone':'9999273513'});
	
	/*$scope.saveContact = function() {
		if ($scope.newContact.id == null || $scope.newContact.id == 0) {
			
			//if this is a new contact, then add it in the contacts array
			$scope.newContact.id = uid++;			
			$scope.contacts.push($scope.newContact);
			
		} else {
			
			// For existing contacts, find this contact and update it			
			for (i in $scope.contacts) {
				if ($scope.contacts[i].id === $scope.newContact.id) {
					$scope.contacts[i] = $scope.newContact;
				}
			}
		}
		
		//Clear the add contacts form
		$scope.newContact = {};
	};*/
	
	/*$scope.deleteContact = function(id) {
		
		// Search contact with given id and delete it		
		for (i in $scope.contacts) {
			if ($scope.contacts[i].id === id) {
				$scope.contacts.splice(i, 1);
				$scope.newContact = {};
			}
		}
	};*/
	
	/*$scope.edit = function(id) {
		
		// Edit the corresponding contact
		
		for (i in $scope.contacts) {
			if ($scope.contacts[i].id === id) {
				
				// Manually copying the values
				//$scope.newContact.name = $scope.contacts[i].name;
				//$scope.newContact.email = $scope.contacts[i].email;
				//$scope.newContact.phone = $scope.contacts[i].phone;
				
				$scope.newContact = angular.copy($scope.contacts[i]);
			}
		}
	};*/
	
}]);