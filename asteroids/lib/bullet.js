(function (){
  // var Asteroids = window.Asteroids;
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options){
    Asteroids.MovingObject.call(this, {
      radius: Bullet.RADIUS,
      color: Bullet.COLOR,
      pos: options["pos"],
      vel: options["vel"],
      game: options["game"],
    });
      this.isWrappable = false;
  };
  Bullet.RADIUS = 5;
  Bullet.COLOR = "#FF0099";
  Bullet.SPEED = 7;
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


})();
