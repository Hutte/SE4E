/**
 * 
 */

contactsDirectoryApp.controller('ShowUsersController', ['$scope','$http', '$modal', '$state', function($scope, $http, $modal, $state) {
		
	console.log($state.current);
	var response = $http.get('json/users.json');
	response.success(function(data, status, headers, config) {
		$scope.contacts = data.users;
	});
	response.error(function(data, status, headers, config) {
		console.log( "Exception details: " + JSON.stringify({data: data}));
	});
	
	$scope.itemClicked = [];
	$scope.$watchCollection("itemClicked", function() {
		
		if ($scope.itemClicked.length !== 0) {
			var item = $scope.itemClicked.pop();
			
			var modalInstance = $modal.open({
				templateUrl : 'templates/userDetailsOverlay.html',
				controller : 'ModalInstanceCtrl',
				backdrop : 'static',
				keyboard : true,
				windowClass : 'modal-vertical-centered',
				resolve : {
					items : function() {
						return item;
					}
				}
			});
		}
	});
	
	
	$scope.deleteContact = function(id) {				
		// Search contact with given id and delete it	
		
		for (i in $scope.contacts) {
			if ($scope.contacts[i].id === id) {
				var employeeId = $scope.contacts[i].id;
				var response = $http.get('delete/'+employeeId);
				response.success(function(data, status, headers, config) {
					$scope.deleteResponse = data;
					$scope.contacts.splice(i, 1);
				});
				response.error(function(data, status, headers, config) {
					console.log( "Exception details: " + JSON.stringify({data: data}));
					$scope.errorObject = data;
					$scope.errorsMap = groupElements(data,"field");
					console.log($scope.errorsMap);
				});						
				//$scope.contacts.splice(i, 1);
				//$scope.newContact = {};
			}
		}
	};
	

	/*$scope.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
		$scope.requestedItemsGridOptions = {
			currentPage : currentPage,
			pageItems : pageItems,
			filterBy : filterBy,
			filterByFields : angular.toJson(filterByFields),
			orderBy : orderBy,
			orderByReverse : orderByReverse,
			requestTrapped : true
		};
	};*/
}]);
