var RADIUS = 67; // 67px ~ 2cm

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var circles = [];
var compoundShapes = 0;

function panRight() {
  window.scrollBy(20,0);
};

function panLeft() {
  window.scrollBy(-20,0);
};

function addCircle(e) {
  var position = getMousePosition(canvas, e);
  var x = position.x;
  var y = position.y;
  var circle = new Circle(x, y);
  draw(circle);
  circles.push(circle);
  updateCompoundShapes(circle);
  document.getElementById("compound").innerHTML = compoundShapes;
};

function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

function draw(c) {
  context.beginPath();
  context.arc(c.x, c.y, RADIUS, 0, 2*Math.PI);
  context.stroke();
};

function Circle(x, y) {
  this.x = x;
  this.y = y;
};

function distanceBetweenTwoCentres(x1, y1, x2, y2) {
  var diffx = Math.abs(x2 - x1);
  var diffy = Math.abs(y2 - y1);
  return distance = Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffy, 2));
};

function doesIntersect(c1, c2) {
  var x1 = c1.x;
  var y1 = c1.y;
  var x2 = c2.x;
  var y2 = c2.y;
  var d = distanceBetweenTwoCentres(x1, y1, x2, y2);
  return d > 0 && d < RADIUS * 2;
};

function updateCompoundShapes(c) {
  intersectingCircles = [];
  for(var i = 0; i < circles.length; i++) {
    if(doesIntersect(c, circles[i])) {
      intersectingCircles.push(circles[i]);
    };
  };
  var n = intersectingCircles.length;
  if(n === 0) {
    return compoundShapes ++;
  };
  var numberOfIntersections = 0;
  for(var i = n - 1; i >= 0; i--) {
    for(var j = 0; j < n; j++) {
      if(doesIntersect(intersectingCircles[i], intersectingCircles[j])) {
        numberOfIntersections ++;
      };
    };
  };
  numberOfIntersections = numberOfIntersections / 2;
  var toDecrease = n - numberOfIntersections - 1;
  if(toDecrease < 0) {
    toDecrease = 0;
  };
  compoundShapes -= toDecrease;
  console.log(compoundShapes);
};
