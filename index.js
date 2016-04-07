var garden = document.getElementById("garden");
garden.width = window.innerWidth;
garden.height = window.innerHeight;
var c = garden.getContext("2d");
garden.style.background = '#000000';

// c.imageSmoothingEnabled = false;

var numNodes = 3000;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var nodes = [];

function initNodes() {
	for (var i = 0; i < numNodes; i++) {
		var node = {
			x: Math.random() * screenWidth,
			y: Math.random() * screenHeight,
			vx: Math.random() * .5+ .2,
			vy: Math.random() * .5 + .2,
			size: Math.pow(Math.random(), 2) * 4 + 1,
			opacity: "rgba(256, 256, 256, " + (Math.random() * .9 + .1) +" )"
		};
		nodes.push(node);
	}	
}

function update(nArray) {
	for (var i = 0; i < numNodes; i++) {
		nArray[i].x += nArray[i].vx;
		nArray[i].y += nArray[i].vy;
		if (nArray[i].x > (screenWidth + nArray[i].size) || nArray[i].y > (screenHeight + nArray[i].size)) {
			if (Math.random() < screenWidth/(screenHeight + screenWidth)) {
				nArray[i].x = Math.random() * screenWidth;
				nArray[i].y = -nArray[i].size;
			}
			else {
				nArray[i].y = Math.random() * screenHeight;
				nArray[i].x = -nArray[i].size;
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
	setTimeout(function(){
		c.clearRect(0, 0, screenWidth, screenHeight);
		draw(nodes);
		update(nodes);
		requestAnimationFrame(drawupdate);
	}, 1000/120);
}
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
	garden.width = window.innerWidth;
	garden.height = window.innerHeight;
}

initNodes();
requestAnimationFrame(drawupdate);
