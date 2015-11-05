(function (){
  var Asteroids = window.Asteroids;
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

var gameView;

  Asteroids.bootUp = function() {
    gameView = new Asteroids.GameView(ctx);
    gameView.bindKeys();
    Asteroids.makeCanvas();
  };

  Asteroids.startGame = function() {
    $.modal.close();
    gameView.start();
  };

  Asteroids.restartGame = function(){
    Asteroids.makeCanvas();
    $.modal.close();
    gameView.game.reset();
    gameView.start();
  };

  Asteroids.makeCanvas = function() {
    canvas.width = Asteroids.Game.DIM_X;
    canvas.height = Asteroids.Game.DIM_Y;
    gameView.drawCanvas();
  };

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.stop = function() { clearInterval(setIntID) };

  GameView.prototype.drawCanvas = function() {
    this.game.clearRect(this.ctx);
    this.game.drawObjects(this.ctx);
  };

  GameView.prototype.start = function (){
    var that = this;
    setIntID = setInterval(function() {
      that.game.step();
      that.game.draw(that.ctx);
      if (that.game.checkEndGame() === "lost"){
        that.stop();
        that.game.endGame("lost", that.ctx);
      } else if (that.game.checkEndGame() === "won"){
        that.stop();
        that.game.endGame("won", that.ctx);
      }
    }, 20);
  };

  GameView.prototype.bindKeys = function() {
    var that = this;
    key('up', function(){
      that.game.ship.power(-1);
    });
    key('down', function(){
      that.game.ship.power(1);
    });
    key('left', function(){
      that.game.ship.rotate(-1);
    });
    key('right', function(){
      that.game.ship.rotate(1);
    });
    key('space', function(){
      that.game.ship.fireBullet();
    });
  };
})();
