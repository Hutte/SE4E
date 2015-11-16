/**
 * 
 */
var graph = new joint.dia.Graph;

// Event handling
// Below line outputs all the events to the console that are triggered by any
// model in the graph
/*
 * graph.on('all', function(eventName, cell) { console.log(arguments); });
 */

var paper = new joint.dia.Paper({
	el : $('#myholder'),
	model : graph,
	width : 600,
	height : 200,
	gridSize : 1
});

var paperSmall = new joint.dia.Paper({
	el : $('#myholder-small'),
	width : 600,
	height : 100,
	model : graph,
	gridSize : 1
});
paperSmall.scale(.5);
// paperSmall.$el.css('pointer-events', 'none');

var rect_conf = {
	position : {
		x : 100,
		y : 30
	},
	size : {
		width : 100,
		height : 30
	},
	attrs : {
		rect : {
			fill : 'white',
			rx : 5,
			ry : 5,
			'stroke-width' : 2,
			stroke : 'black'
		},
		text : {
			text : 'my box',
			fill : 'black'
		}
	}
};

var rect = new joint.shapes.basic.Rect(rect_conf);

/*
 * var rect = new joint.shapes.basic.Rect({ position: { x: 100, y: 30 }, size: {
 * width: 100, height: 30 }, attrs: { rect: { fill: 'white', rx: 5, ry: 5,
 * 'stroke-width': 2, stroke: 'black'}, text: { text: 'my box', fill: 'black' } }
 * });
 */

// Log the event of change in position of the rect
rect.on('change:position', function(element) {
	console.log(element.id, ':', element.get('position'));
})

var rect2 = rect.clone();
rect2.translate(300);

var link = new joint.dia.Link({
	source : {
		id : rect.id
	},
	target : {
		id : rect2.id
	}
});

link.attr({
	'.connection' : {
		stroke : 'green'
	},
	'.marker-target' : {
		fill : 'black',
		d : 'M 10 0 L 0 5 L 10 10 z'
	}
});

// link.set('vertices', [{ x: 300, y: 60 }, { x: 400, y: 60 }, { x: 400, y: 20
// }])

graph.addCells([ rect, rect2, link ]);