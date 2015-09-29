(function (){
  var Asteroids = window.Asteroids;
  if (typeof Asteroids.Game === "undefined"){
    window.Asteroids.Game = {};
  }


  var Game = Asteroids.Game = function Game(){
    this.addAsteroids();
    this.ship = new Asteroids.Ship({game: this});
    this.bullets = [];
  };

  Game.DIM_X = window.innerWidth - 50;
  Game.DIM_Y = window.innerHeight - 50;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.addAsteroids = function() {
    // randomly place asteroids within dimensions
    this.asteroids = [];
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos: this.randomPosition(), game: this}));
    }

  };

  Game.prototype.randomPosition = function() {
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function(){
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].move();
      this.isOutOfBounds(this.allObjects()[i]);
    }
  };

  Game.prototype.wrap = function(pos) {
    return [pos[0] % Game.DIM_X, pos[1] % Game.DIM_Y];
  };

  Game.prototype.checkCollisions = function(){
    for(var i = 0; i < this.allObjects().length; i++){
      for(var j = 0; j < this.allObjects().length; j++){
        if(this.allObjects()[i] === this.allObjects()[j]){
          continue;
        }

        if(this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
          //alert("COLLISION");
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    // this.ship.reduceVelocity();
  };

  Game.prototype.remove = function(object){
    var index = this.asteroids.indexOf(object);
    this.asteroids.splice(index, 1);
  };

  Game.prototype.allObjects = function(object){
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  Game.prototype.addObject = function(object){
    if(object instanceof Asteroids.Asteroid){
      this.asteroids.push(object);
    }
    else if(object instanceof Asteroids.Bullet){
      this.bullets.push(object);
    }
  };

  Game.prototype.removeObject = function(object){
    if(object instanceof Asteroids.Asteroid){
      var index = this.asteroids.indexOf(object);
      this.asteroids.splice(index, 1);
    }
    else if(object instanceof Asteroids.Bullet){
      var bIndex = this.bullets.indexOf(object);
      this.bullets.splice(bIndex, 1);
    }
  };

  Game.prototype.isOutOfBounds = function(object){
    if (object.pos[0] > Game.DIM_X || object.pos[1] > Game.DIM_Y || object.pos[0] < 0 || object.pos[1] < 0) {
      if (object instanceof Asteroids.Bullet) {
        this.removeObject(object);
      }
    }
  };

})();
