(function (){
  var Asteroids = window.Asteroids;
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(options) {
    Asteroids.MovingObject.call(this, {
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      vel: [0,0],
      pos: options["game"].randomPosition(),
      game: options["game"],
    });
    this.line = "0";
    this.rotation = -30;
    this.direction = [0,0];
    this.rotate(1);
    // this.draw = function(ctx) { ctx.drawImage(Ship.IMG, this.pos[0], this.pos[1]); };
  };

  // Ship.COLOR = "#FF6699";
  Ship.RADIUS = 16;
  Ship.MAX_VEL = 2;
  Ship.VEL_MOD = 0.8;
  Ship.IMG = new Image();
  Ship.IMG.src = "lib/ship.png";
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    var rad = this.rotation * (Math.PI / 180.0);
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(rad);
    ctx.drawImage(Ship.IMG, -(Ship.IMG.width/2), -(Ship.IMG.height/2));
    ctx.restore();
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    var impulseVector = [this.direction[0] * impulse * Ship.VEL_MOD, this.direction[1] * impulse * Ship.VEL_MOD];
    this.vel[0] += impulseVector[0];
    this.vel[1] += impulseVector[1];
  };

  Ship.prototype.rotate = function(dir) {
    this.rotation += (dir * 30);
    var rotationRadians = (90 + this.rotation) * (Math.PI / 180);
    this.wrapRotate();
    this.direction[0] = Math.cos(rotationRadians);
    this.direction[1] = Math.sin(rotationRadians);
    console.log(this.direction);
  };

  Ship.prototype.wrapRotate = function() {
    this.rotation %= 360;
  };

  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: [(this.direction[0] * Asteroids.Bullet.SPEED * -1), (this.direction[1] * Asteroids.Bullet.SPEED * -1)],
      game: this.game});
    this.game.addObject(bullet);
  };

  Ship.prototype.reduceVelocity = function() {
    this.vel[0] *= .99;
    this.vel[1] *= .99;
  };

})();
