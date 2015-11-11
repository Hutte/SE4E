se4sToolkitApp.controller('OnlineEditorCtrl', [ '$scope', function($scope) {

	$scope.businessGoals = [];
	$scope.systemGoals = [];
	$scope.usageGoals = [];

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
	
	$scope.displayGoalModel = function() {
		
	}

	/*
	 * se4sToolkitApp.directive('jointDiagram', [function () {
	 * 
	 * var directive = { link: link, restrict: 'E', scope: { height: '=', width:
	 * '=', gridSize: '=', graph: '=', } };
	 * 
	 * return directive;
	 * 
	 * function link(scope, element, attrs) {
	 * 
	 * var graph = new joint.dia.Graph; var paper = new joint.dia.Paper({ el :
	 * $('#myholder'), model : graph, gridSize : 1 });
	 * 
	 * var rect = new joint.shapes.basic.Rect({ position : { x : 100, y : 30 },
	 * size : { width : 100, height : 30 }, attrs : { rect : { fill : 'blue' },
	 * text : { text : 'my box', fill : 'white' } } }); var rect2 =
	 * rect.clone(); rect2.translate(300);
	 * 
	 * var link = new joint.dia.Link({ source : { id : rect.id }, target : { id :
	 * rect2.id } });
	 * 
	 * graph.addCells([ rect, rect2, link ]);
	 * 
	 * var diagram = newDiagram(scope.height, scope.width, scope.gridSize,
	 * scope.graph, element[0]); // add event handlers to interact with the
	 * diagram diagram.on('cell:pointerclick', function (cellView, evt, x, y) { //
	 * your logic here e.g. select the element
	 * 
	 * });
	 * 
	 * diagram.on('blank:pointerclick', function (evt, x, y) { // your logic
	 * here e.g. unselect the element by clicking on a // blank part of the
	 * diagram });
	 * 
	 * diagram.on('link:options', function (evt, cellView, x, y) { // your logic
	 * here: e.g. select a link by its options tool }); }
	 * 
	 * function newDiagram(height, width, gridSize, graph, targetElement) {
	 * 
	 * var paper = new joint.dia.Paper({ el: targetElement, width: width,
	 * height: height, gridSize: gridSize, model: graph, });
	 * 
	 * return paper; }
	 * 
	 * }]);
	 */
} ]);