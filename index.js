var garden = document.getElementById("garden");
garden.width = window.innerWidth;
garden.height = window.innerHeight;
var c = garden.getContext("2d");

// c.imageSmoothingEnabled = false;

devicePixelRatio = window.devicePixelRatio || 1,
backingStoreRatio = c.webkitBackingStorePixelRatio ||
                    c.mozBackingStorePixelRatio ||
                    c.msBackingStorePixelRatio ||
                    c.oBackingStorePixelRatio ||
                    c.backingStorePixelRatio || 1,

ratio = devicePixelRatio / backingStoreRatio;
if (devicePixelRatio !== backingStoreRatio) {
    var oldWidth = garden.width;
    var oldHeight = garden.height;

    garden.width = oldWidth * ratio;
    garden.height = oldHeight * ratio;

    garden.style.width = oldWidth + 'px';
    garden.style.height = oldHeight + 'px';

    c.scale(ratio, ratio);
}

var numNodes = 2000;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var gradient = c.createLinearGradient(0, 0, 0, screenHeight);
gradient.addColorStop(0, "#659B93");
gradient.addColorStop(1, "#E5F5CD");


var nodes = [];

function initNodes() {
	for (var i = 0; i < numNodes; i++) {
		var node = {
			x: Math.random() * screenWidth,
			y: Math.random() * screenHeight,
			vx: Math.random() * .5+ .2,
			vy: Math.random() * .5 + .2,
			size: Math.pow(Math.random(), 2) * 5 + 1,
			opacity: "rgba(256, 256, 256, " + (Math.random() * .9 + .1) +" )"
		};
		nodes.push(node);
	}	
}

function update(nArray) {
	for (var i = 0; i < numNodes; i++) {
		nArray[i].x += nArray[i].vx;
		nArray[i].y += nArray[i].vy;
		if (nArray[i].x > (screenWidth + nArray[i].size * 3) || nArray[i].y > (screenHeight + nArray[i].size * 3)) {
			if (Math.random() < screenWidth/(screenHeight + screenWidth)) {
				nArray[i].x = Math.random() * screenWidth;
				nArray[i].y = -nArray[i].size * 3;
			}
			else {
				nArray[i].y = Math.random() * screenHeight;
				nArray[i].x = -nArray[i].size * 3;
			}
		}
	}
}

function draw(nArray) {
	c.fillStyle = gradient;
	c.fillRect(0, 0, screenWidth, screenHeight);
	for (var i = 0; i < numNodes; i++) {
		var edge = nArray[i].size;
		var x = nArray[i].x;
		var y = nArray[i].y;
		c.beginPath();
		c.moveTo(x, y);
		c.lineTo(x + edge, y + edge);
		c.lineTo(x, y + 2 * edge);
		c.lineTo(x - edge, y + edge);
		c.lineTo(x, y);
		c.closePath;
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
