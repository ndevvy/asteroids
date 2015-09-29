(function (){
  // var Asteroids = window.Asteroids;
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    Asteroids.MovingObject.call(this, {
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      pos: options["pos"],
      vel: Asteroids.Util.randomVector(Asteroid.MAG),
      game: options["game"]
    });
  };
  Asteroid.COLOR = "#909090";
  Asteroid.RADIUS = 30;
  Asteroid.MAG = 5;
  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }

    if(otherObject instanceof Asteroids.Bullet){
      this.game.removeObject(otherObject);
      this.game.removeObject(this);
    }
  };
})();
