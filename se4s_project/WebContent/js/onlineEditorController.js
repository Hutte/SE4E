se4sToolkitApp.controller('OnlineEditorCtrl', [ '$scope', function($scope) {

	$scope.businessGoals = [];
	$scope.systemGoals = [];
	$scope.usageGoals = [];
	
	var goals = JSON.parse(localStorage.getItem("goals"));
	if (goals !== null && goals !== undefined) {
		if (goals.businessGoals) {
			$scope.businessGoals = goals.businessGoals;
		}
		if (goals.systemGoals) {
			$scope.systemGoals = goals.systemGoals;
		}
		if (goals.usageGoals) {
			$scope.usageGoals = goals.usageGoals;
		}
	}

	$scope.addBusinessGoal = function() {
		var newItemNo = $scope.businessGoals.length + 1;
		$scope.businessGoals.push({
			'id' : 'bg' + newItemNo
		});
	};

	$scope.removeBusinessGoal = function(index) {
		$scope.businessGoals.splice(index, 1);
	};
	
	$scope.addSystemGoal = function() {
		var newItemNo = $scope.systemGoals.length + 1;
		$scope.systemGoals.push({
			'id' : 'sg' + newItemNo
		});
	};

	$scope.removeSystemGoal = function(index) {
		$scope.systemGoals.splice(index, 1);
	};
	
	$scope.addUsageGoal = function() {
		var newItemNo = $scope.usageGoals.length + 1;
		$scope.usageGoals.push({
			'id' : 'ug' + newItemNo
		});
	};

	$scope.removeUsageGoal = function(index) {
		$scope.usageGoals.splice(index, 1);
	};	

	$scope.saveToPc = function(data, filename) {

		if (!data) {
			console.error('No data');
			return;
		}
	
		if (!filename) {
			filename = 'download.json';
		}
	
		if (typeof data === 'object') {
			data = JSON.stringify(data, undefined, 2);
		}
	
		var blob = new Blob([ data ], {
			type : 'text/json'
		}), e = document.createEvent('MouseEvents'), a = document
				.createElement('a');
	
		a.download = filename;
		a.href = window.URL.createObjectURL(blob);
		a.dataset.downloadurl = [ 'text/json', a.download, a.href ]
				.join(':');
		e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0,
				false, false, false, false, 0, null);
		a.dispatchEvent(e);
	};
	
	$scope.displayGoalModel = function() {
		
		$scope.goals = {
			businessGoals : $scope.businessGoals,
			systemGoals : $scope.systemGoals,
			usageGoals : $scope.usageGoals			
		}
		console.log($scope.goals);
		
		// Checking if browser supports local storage
		if (typeof(Storage) !== "undefined") {
			// Store the json in browser's local storage
			localStorage.setItem("goals", JSON.stringify($scope.goals));
		} else {
			console.log("Sorry, No Web Storage Support Available on the browser!");
		}
		
		var path = "tool.html";
		window.location.href = path;		
	}
}]);