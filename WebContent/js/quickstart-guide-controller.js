se4sToolkitApp.controller('QuickStartGuideCtrl', ['$scope',function ($scope) {
	
	$scope.oneAtATime = true;

	$scope.sustainability_steps = [ 
		{
			title_one : 'Dynamic Title 1',
			content_one : 'Dynamic Content 1'
		}, {
			title_two : 'Dynamic Title 2',
			content_two : 'Dynamic Content 2'
		}, {
			title_three : 'Dynamic Title 3',
			content_three : 'Dynamic Content 3'
		}, {
			title_four : 'Dynamic Title 4',
			content_four : 'Dynamic Content 4'
		} 
	];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
}]);