const canvas = document.getElementById('canvasDraw');
canvas.width = window.innerWidth/2; //document.width is obsolete
    canvas.height = window.innerHeight ;
const ctx = canvas.getContext('2d');
const r = 10;
ctx.lineWidth = r * 0.5;
ctx.lineCap = "round";
ctx.fillStyle = "black";
var canvasobject = [];
var draw = false;
var lineStart = true;
var lastX, lastY;
function yesDraw() { 
  clearCanvas();
  draw = true; 
  lineStart = true;
}

function mouseMove(e) {
   const bounds = canvas.getBoundingClientRect();
   const x = e.pageX - bounds.left - scrollX;
   const y = e.pageY - bounds.top - scrollY;
   if(draw && x > -r && x < canvas.width + r && y > -r && y < canvas.height + r){
      drawing(x,y);
   }
}

function noDraw() {
  draw = false;
 
}

function clearCanvas(){
  canvasobject = [];
  addNewShape(canvasobject);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
document.addEventListener("mousemove",mouseMove);
document.getElementById('canvasDraw').addEventListener("mousedown",yesDraw);
document.addEventListener("mouseup",noDraw);
function drawing(x, y) {
  var a = lastX - x;
  var b = lastY - y;
  var c = Math.sqrt( a*a + b*b );
  
  if(lineStart){
     lastX = x;
     lastY = y;
     lineStart = false;
  }

  ctx.beginPath();
  ctx.lineTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  
  if(c>2){
    lastX = x;
  lastY = y;
//get width of the windows and divide by two
//divide positions by two
//zoom camera 
  var position = {
     x : lastX - 500,
     y : -lastY + 300
  }
  canvasobject.push(position)
  addNewShape(canvasobject)
  
}
}
