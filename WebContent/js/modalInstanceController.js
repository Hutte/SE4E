/**
 * 
 */
contactsDirectoryApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
	/*$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};*/
	
	$scope.message = items;
	
	$scope.ok = function () {
		$modalInstance.close($scope.message);
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});