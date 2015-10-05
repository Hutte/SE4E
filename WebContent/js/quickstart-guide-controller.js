se4sToolkitApp.controller('QuickStartGuideCtrl', [ '$scope', function($scope) {

	$scope.oneAtATime = true;

	$scope.templates = [ {
		name : 'stepOneDetails.html',
		url : 'html/stepOneDetails.html'
	}, {
		name : 'stepTwoDetails.html',
		url : 'html/stepTwoDetails.html'
	}, {
		name : 'stepThreeDetails.html',
		url : 'html/stepThreeDetails.html'
	}, {
		name : 'stepFourDetails.html',
		url : 'html/stepFourDetails.html'
	} ];
	$scope.template = $scope.templates[0];
	
	$scope.loadDataAndTemplate = function(step) {
		console.log("An accordion is clicked on the RE4S quick start guide");
		if (step === 'stepOneDetails') {
			$scope.template = $scope.templates[0];
		} else if (step === 'stepTwoDetails') {
			$scope.template = $scope.templates[1];
		} else if (step === 'stepThreeDetails') {
			$scope.template = $scope.templates[2];
		} else if (step === 'stepFourDetails') {
			$scope.template = $scope.templates[3];
		}
	}

	/*
	 * $scope.sustainability_steps = [ { title_one : 'Dynamic Title 1',
	 * content_one : 'Dynamic Content 1' }, { title_two : 'Dynamic Title 2',
	 * content_two : 'Dynamic Content 2' }, { title_three : 'Dynamic Title 3',
	 * content_three : 'Dynamic Content 3' }, { title_four : 'Dynamic Title 4',
	 * content_four : 'Dynamic Content 4' } ];
	 */

	$scope.items = [ 'Item 1', 'Item 2', 'Item 3' ];

	$scope.addItem = function() {
		var newItemNo = $scope.items.length + 1;
		$scope.items.push('Item ' + newItemNo);
	};

	$scope.status = {
		isFirstOpen : true,
		isFirstDisabled : false
	};
} ]);