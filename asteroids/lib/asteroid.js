(function (){
  // var Asteroids = window.Asteroids;
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    Asteroids.MovingObject.call(this, {
      color: Asteroid.COLOR,
      pos: options["pos"],
      vel: Asteroids.Util.randomVector((Asteroid.MAX_MAG * Math.random()) + 1),
      game: options["game"],
      radius: options["radius"]
    });
  };
  Asteroid.COLOR = "#909090";
  Asteroid.MAX_MAG = 4.8;
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
