// Init canvas
var c = document.createElement("canvas")
var ctx = c.getContext("2d")
var map = []
var projection = []

c.width = window.innerWidth
c.height = window.innerHeight
document.body.appendChild(c)

var ax = c.width / 2
var ay = c.height / 2
var ewidth
var eheight
var size = 60
var mx
var my
var velocity = 20
var point = 0
var water = new Image()
var wood = new Image()
var leaf = new Image()
var blank = new Image()
var grass = new Image()
var stone = new Image()
blank.src = "assets/blank.png"
stone.src = "assets/stone.jpg"
grass.src = "assets/grass.jpg"
water.src = "assets/water.jpg"
wood.src = "assets/wood.jpg"
leaf.src = "assets/leaf.jpg"


document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
	document.querySelector("div").style.display = "none"
	ewidth = parseInt(document.getElementById('width').value)
	eheight = parseInt(document.getElementById('height').value)

	for(var i = 0; i < eheight * ewidth; i++){
	    projection.push(0)
	}

	base.init()

	setInterval(loop, 1000/25)
    }

    switch (e.key){
	case "ArrowUp":
	    base.vy = velocity
	    break
	case "ArrowDown":
	    base.vy = -velocity
	    break
	case "ArrowLeft":
	    base.vx = velocity
	    break
	case "ArrowRight":
	    base.vx = -velocity
	    break
    }
})

document.addEventListener("keyup", function(e){
    if(e.key === "ArrowUp" || e.key === "ArrowDown"){
	base.vy = 0
    }else if(e.key === "ArrowLeft" || e.key === "ArrowRight"){
	base.vx = 0
    }
})



function clear(){
    map = []
    ctx.clearRect(0, 0, c.width, c.height)
}

class Square{
	constructor(x, y, w, h, i, index){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.i = i
		this.index = index
	}
	update(){
		ctx.drawImage(this.i, this.x, this.y, this.w, this.h)
	}
}

class Base{
    constructor(){
	this.vx = 0
	this.vy = 0
	this.ax = ax
	this.ay = ay
    }
    init(){
	for(var i = 0; i < eheight; i++){
		for(var o = 0; o < ewidth; o++){
			switch (projection[ewidth * i + o]){
				case 0:
				    map.push(new Square(this.ax, this.ay, size, size, blank, (ewidth * i + o)))
				    break
				case 1:
				    map.push(new Square(this.ax, this.ay, size, size, grass, (ewidth * i + o)))
				    break
				case 2:
				    map.push(new Square(this.ax, this.ay, size, size, stone, (ewidth * i + o)))
				    break
				case 3:
				    map.push(new Square(this.ax, this.ay, size, size, water, (ewidth * i + o)))
				    break
				case 4:
				    map.push(new Square(this.ax, this.ay, size, size, wood, (ewidth * i + o)))
				    break
				case 5:
				    map.push(new Square(this.ax, this.ay, size, size, leaf, (ewidth * i + o)))
				    break
			}
			
			map[ewidth * i + o].update()
			this.ax += size + 2
		}
		this.ay += size + 2
		this.ax = ax
	}
        this.ax = ax
	this.ay = ay
    }
}

class Mouse{
    constructor(){
	this.x
	this.y
	this.target
    }
}

var base = new Base()
var mouse = new Mouse()


function loop(){
    clear()
    base.init()
    ay += base.vy
    ax += base.vx
    
    for(var i = 0; i < map.length; i++){
	checkCollision(mouse, map[i], "player", i)
    }
}


document.addEventListener("mousemove", function(e){
    mouse.x = e.clientX
    mouse.y = e.clientY
})

document.addEventListener("click", function(){
    if(projection.length > 0 && typeof mouse.target == 'number'){
	projection[mouse.target] = point
    }
})