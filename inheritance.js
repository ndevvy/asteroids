Function.prototype.inherits = function(parent) {
  function Surrogate() {}
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject () {}
MovingObject.prototype.move = function() {
  console.log("Moving");
};

function Ship () {}
Ship.inherits(MovingObject);
Ship.prototype.float = function() {
  console.log("float float");
};

function Asteroid () {}
Asteroid.inherits(MovingObject);
Asteroid.prototype.crash = function() {
  console.log("ccrrrrrash");
};

var nicoleship = new Ship();
var asteroid = new Asteroid();
var turtle = new MovingObject();
