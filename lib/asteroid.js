(function (){
  // var Asteroids = window.Asteroids;
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    Asteroids.MovingObject.call(this, {
      color: Asteroid.randomgrey(),
      pos: options["pos"],
      vel: Asteroids.Util.randomVector((Asteroid.MAX_MAG * Math.random()) + .2),
      game: options["game"],
      radius: options["radius"],
      points: Asteroid.generatePoints()
    });
  };
  Asteroid.MAX_MAG = 4.3;
  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.randomgrey = function(){
    var random = Math.round((120 * Math.random()) + 80).toString();
    var string = "rgb(" + random + "," + random + "," + random + ")";
    return string;
  };

  // given a radius, generates a rand number of points represented as a random distance from the radius
  Asteroid.generatePoints = function(radius){
    var points = [];
    var num_points = (Math.random() * 4) + 6;
    for (var i = 0; i < num_points; i++) {
      points.push(radius * Math.random() + radius / 2);
    }
    return points;
  };

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
      this.game.loseLife();
    }

    if(otherObject instanceof Asteroids.Bullet){
      this.game.removeObject(otherObject);
      this.game.addScore();
      this.game.checkLevelUp();
      this.game.removeObject(this);
    }
  };

})();
