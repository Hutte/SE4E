/**
 * 
 */
contactsDirectoryApp.controller('ForgotPasswordController', ['$scope','$http', '$modal', function($scope, $http, $modal) {	
	
	$scope.forgotPassword = function() {
		var modalInstance = $modal.open({
			templateUrl : 'templates/forgotpassword.html',
			controller : 'ForgotPasswordFormSubmissionCtrl',
			backdrop : 'static',
			keyboard : true,
			windowClass : 'modal-vertical-centered',
			resolve : {
				items : function() {
					return 'a';
				}
			}
		});
	};
}]);

contactsDirectoryApp.controller('ForgotPasswordFormSubmissionCtrl', ['$scope','$modalInstance', function($scope, $modalInstance, items) {
	
	$scope.submitForm = function(items) {
		console.log('Submitted');
		$modalInstance.close($scope.message);
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
}]);

