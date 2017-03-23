window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          }
})()

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var w = canvas.offsetWidth
var h = canvas.offsetHeight

canvas.width = w
canvas.height = h

function Point(x, y) {
	this.x = x
	this.y = y
	this.r = 1 + Math.random() * 2
	this.sx = Math.random() * 2 - 1
	this.sy = Math.random() * 2 - 1
}

Point.prototype.draw = function(ctx) {
	ctx.beginPath()
	ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
	ctx.closePath()
	ctx.fillStyle = '#aaa'
	ctx.fill()
}

Point.prototype.move = function() {
	this.x += this.sx
	this.y += this.sy
	if(this.x > w) this.sx = -Math.abs(this.sx)
	else if(this.x < 0) this.sx = Math.abs(this.sx)
	if(this.y > h) this.sy = -Math.abs(this.sy)
	else if(this.y < 0) this.sy = Math.abs(this.sy)
}

Point.prototype.drawLine = function(ctx, p) {
	var dx = this.x - p.x 
	var dy = this.y - p.y
	var d = Math.sqrt(dx * dx + dy * dy)
	if(d < 100) {
		var alpha = (100 - d) / 100 * 1 
		ctx.beginPath()
		ctx.moveTo(this.x, this.y)
		ctx.lineTo(p.x, p.y)
		ctx.closePath()
		ctx.strokeStyle = 'rgba(170, 170, 170, ' + alpha + ')'
		ctx.strokeWidth = 1
		ctx.stroke()
	}
}

var points = []

for(var i = 0; i < 40; i++) {
	points.push(new Point(Math.random() * w, Math.random() * h))
}

function paint() {
	ctx.clearRect(0, 0, w, h)
	for(var i = 0; i < points.length; i++) {
		points[i].move()
		points[i].draw(ctx)
		for(var j = i + 1; j < points.length; j++) {
			points[i].drawLine(ctx, points[j])
		}
	}
}

function loop() {
	requestAnimFrame(loop)
	paint()
}

window.addEventListener('load', loop())
window.addEventListener('resize', function() {
	w = canvas.width = canvas.offsetWidth
	h = canvas.height = canvas.offsetHeight
})
