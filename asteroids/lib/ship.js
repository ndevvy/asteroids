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
    this.rotation = 0;
    this.direction = [0,-1];
    // this.draw = function(ctx) { ctx.drawImage(Ship.IMG, this.pos[0], this.pos[1]); };
  };

  // Ship.COLOR = "#FF6699";
  Ship.RADIUS = 16;
  Ship.MAX_VEL = 2;
  Ship.VEL_MOD = .9;
  Ship.IMG = new Image();
  Ship.IMG.src = "lib/ship.png";
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.rotation);
    ctx.drawImage(Ship.IMG, -(Ship.IMG.width/2), -(Ship.IMG.height/2));
    ctx.restore();
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    var rad = this.rotation;
    var vectorx = Math.cos(rad) * impulse;
    var vectory = Math.sin(rad) * impulse;
    this.vel[0] += (vectorx * Ship.VEL_MOD);
    this.vel[1] += (vectory * Ship.VEL_MOD);
  };


  Ship.prototype.rotate = function(dir) {
    this.rotation += dir * 0.5;
    this.wrapRotate();
  };

  Ship.prototype.wrapRotate = function() {
    if (this.rotation > 2 * Math.PI) {
      this.rotation = 0;
    }

    if (this.rotation < 0) {
      this.rotation = 2 * Math.PI;
    }
  };

  Ship.prototype.fireBullet = function() {
    var rad = this.rotation + 90;
    var vectorx = Math.cos(rad);
    var vectory = Math.sin(rad);
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: [(this.vel[0] + vectorx) * Asteroids.Bullet.SPEED, (this.vel[1] + vectory) * Asteroids.Bullet.SPEED],
      game: this.game});
    this.game.addObject(bullet);
  };

  Ship.prototype.reduceVelocity = function() {
    this.vel[0] *= .997;
    this.vel[1] *= .997;
  };

})();
