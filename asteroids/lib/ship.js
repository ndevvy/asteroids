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
      game: options["game"]
    });
    this.line = "0";
    // this.draw = function(ctx) { ctx.drawImage(Ship.IMG, this.pos[0], this.pos[1]); };
  };


  Ship.COLOR = "#FF6699";
  Ship.RADIUS = 16;
  Ship.MAX_VEL = 2;
  Ship.VEL_MOD = .8;
  Ship.IMG = new Image();
  Ship.IMG.src = "lib/ship.png";
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    ctx.drawImage(Ship.IMG, this.pos[0], this.pos[1]);
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += (impulse[0] * Ship.VEL_MOD);
    this.vel[1] += (impulse[1] * Ship.VEL_MOD);
  };

  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: [this.vel[0] * Asteroids.Bullet.SPEED, this.vel[1] * Asteroids.Bullet.SPEED],
      game: this.game});
    debugger;
    this.game.addObject(bullet);
  };

  Ship.prototype.reduceVelocity = function() {
    this.vel[0] *= .99;
    this.vel[1] *= .99;
  };

})();
