(function (){
  var Asteroids = window.Asteroids;
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.stop = function() { clearInterval(setIntID) };

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

    // var stop = function() { clearInterval(setIntID) };

    // define short of 'a'
    key('up', function(){
      that.game.ship.power([0,-1]);
    });
    key('down', function(){
      that.game.ship.power([0,1]);
    });
    key('left', function(){
      that.game.ship.power([-1,0]);
    });
    key('right', function(){
      that.game.ship.power([1,0]);
    });
    key('space', function(){
      that.game.ship.fireBullet();
    });
  };

  GameView.prototype.bindKeyHandlers = function(){

  };
})();
