var garden = document.getElementById("garden");
var c = garden.getContext("2d");
garden.style.background = 'black';
var nodeSize = 3;
var numNodes = 1500;
var screenWidth = 1500;
var screenHeight = 850;
var nodes = [];

function initNodes() {
	for (var i = 0; i < numNodes; i++) {
		var node = {
			x: Math.random() * screenWidth,
			y: Math.random() * screenHeight,
			vx: Math.random() * .9 + .4,
			vy: Math.random() * .4 + .9,
			size: Math.random() * 5,
			opacity: "rgba(256, 256, 256, " + (Math.random() * .9 + .1) +" )"
		};
		nodes.push(node);
	}	
}

function update(nArray) {
	for (var i = 0; i < numNodes; i++) {
		nArray[i].x += nArray[i].vx;
		nArray[i].y += nArray[i].vy;
		if (nArray[i].x > screenWidth || nArray[i].y > screenHeight) {
			if (Math.random() < screenWidth/(screenHeight + screenWidth)) {
				nArray[i].x = Math.random() * screenWidth;
				nArray[i].y = 0;
			}
			else {
				nArray[i].y = Math.random() * screenHeight;
				nArray[i].x = 0;
			}
		}
	}
}

function draw(nArray) {
	for (var i = 0; i < numNodes; i++) {
		c.beginPath();
		c.arc(nArray[i].x, nArray[i].y, nArray[i].size, 0, Math.PI*2, true);
		c.fillStyle = nArray[i].opacity;
		c.fill();
	}
}

function drawupdate() {
	c.clearRect(0, 0, screenWidth, screenHeight);
	draw(nodes);
	update(nodes);
	requestAnimationFrame(drawupdate);
}

initNodes();
requestAnimationFrame(drawupdate);
