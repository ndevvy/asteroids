(function (){
  var Asteroids = window.Asteroids;
  if(typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options["pos"];
    this.vel = options["vel"];
    this.radius = options["radius"];
    this.color = options["color"];
    this.game = options["game"];
    this.isWrappable = true;
    this.line = 1;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.lineWidth= this.line;
    ctx.strokeStyle="black";

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    if (this.line != "0") {
      ctx.stroke();
    }
  };

  MovingObject.prototype.move = function() {
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    }
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    // check if distance between ctr points < sum of radii
    if (Asteroids.Util.distance(this.pos, otherObject.pos) < this.radius + otherObject.radius) {
      return true;
    } else { return false; }
  };

  MovingObject.prototype.collideWith = function(otherObject){
    // this.game.remove(otherObject);
    // this.game.remove(this);
  };

})();
