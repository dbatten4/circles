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
  compoundShapes = countCompoundShapes();
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
  c.circlesIdArray.push(c.id);
};

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.id = circles.length;
  this.circlesIdArray = [];
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
  intersectingCircles = circles.filter(function(circle) {
    return doesIntersect(c, circle);
  });
  intersectingCircles.forEach(function(circle) {
    var found = circles.filter(function(circ) {
      if(circ.circlesIdArray != undefined) {
        return circ.circlesIdArray.indexOf(circle.id) > -1;
      };
    })[0];
    found.circlesIdArray.forEach(function(id) {
      c.circlesIdArray.push(id);
    });
    delete found.circlesIdArray;
  });
};

function countCompoundShapes() {
  var compoundShapesArray = [];
  circles.forEach(function(circle) {
    if(circle.circlesIdArray != undefined) {
      compoundShapesArray.push(circle.circlesIdArray);
    };
  });
  return compoundShapesArray.length;
};
