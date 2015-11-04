(function (){
  var Asteroids = window.Asteroids;
  if (typeof Asteroids.Game === "undefined"){
    window.Asteroids.Game = {};
  }


  var Game = Asteroids.Game = function Game(){
    this.ship = new Asteroids.Ship({game: this});
    this.bullets = [];
    this.numLives = 4;
    this.level = 1;
    this.score = 0;
    this.highScore = 0;
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.DIM_X = window.innerWidth - 50;
  Game.DIM_Y = window.innerHeight - 50;
  Game.NUM_ASTEROIDS = 15;
  Game.ASTEROID_MAX_RAD = 21;
  Game.MAX_BULLETS = 6;


  Game.prototype.loseLife = function() { this.numLives -= 1; };

  Game.prototype.addAsteroids = function() {
    // randomly place asteroids within dimensions

    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos: this.randomPosition(),
        game: this,
        radius: (Game.ASTEROID_MAX_RAD * Math.random()) + 14}));
    }

  };

  Game.prototype.randomPosition = function() {
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  };

  Game.SHIP = new Image();
  Game.SHIP.src = "lib/ship.png";

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].draw(ctx);
    }
    for (var j = 0; j < this.numLives; j++) {
      ctx.drawImage(Game.SHIP, (j * 45), 0);
    }
    ctx.font = "24px Chargen";
    ctx.fillStyle = "white";
    ctx.fillText(Asteroids.Util.padScore(this.score), Game.DIM_X - 135, 20);
  };

  // Game.prototype.drawLives = function(ctx) {
  //   for (var i = 0; i < Game.numLives; i++) {
  //     ctx.drawImage(this.ship.IMG, (i * 45), 0);
  //   }
  // };


  Game.prototype.moveObjects = function(){
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].move();
      this.isOutOfBounds(this.allObjects()[i]);
    }
  };

  Game.prototype.wrap = function(pos) {
    return [(pos[0] + Game.DIM_X) % Game.DIM_X, (pos[1] + Game.DIM_Y) % Game.DIM_Y];
  };

  Game.prototype.addScore = function() {
    this.score += (this.level * 10);
  };

  Game.prototype.checkCollisions = function(){
    for(var i = 0; i < this.allObjects().length; i++){
      for(var j = 0; j < this.allObjects().length; j++){
        if(this.allObjects()[i] === this.allObjects()[j]){
          continue;
        }

        if(this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    this.ship.reduceVelocity();
  };

  Game.prototype.checkEndGame = function() {
    if (this.numLives < 0) {
      return "lost";
    }
  };

  Game.prototype.endGame = function(outcome, ctx) {
    this.updateHighScore();
    ctx.font = "100px Chargen";


    if (outcome === "lost"){
      // ctx.fillStyle = "red";
      // ctx.fillText("game over", (Game.DIM_X / 2) - 300, Game.DIM_Y / 2);
      // ctx.fillStyle="white";
      // ctx.font="50px Chargen";
      // ctx.fillText("your score: " + this.score, Game.DIM_X / 2 - 250, Game.DIM_Y / 2 + 75);
      // ctx.fillText("high score: " + this.highScore, Game.DIM_X / 2 - 255, Game.DIM_Y / 2 + (75 * 2  ));
      $('#modal').html('<p>your score: ' + game.game.score + '</p> <p>high score: ' + game.game.highScore + '</p>');
      $('#modal').modal();
    }
    else {
      ctx.fillStyle = "#FF0099";
      ctx.fillText("you win!!!", Game.DIM_X / 2, Game.DIM_Y / 2);
    }
  };

  Game.prototype.updateHighScore = function() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
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
    else if(object instanceof Asteroids.Bullet && this.bullets.length < Game.MAX_BULLETS){
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

  Game.prototype.checkLevelUp = function(object){
    if (this.asteroids.length < 3 && this.asteroids.length > 0) {
      this.level ++;
      // asteroids will be faster
      Asteroids.Asteroid.MAX_MAG += 0.75;
      this.addAsteroids();
    }
  };


})();
