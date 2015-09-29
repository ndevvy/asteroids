(function (){
  var Asteroids = window.Asteroids;
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function (){
    var that = this;
    setInterval(function() {
      that.game.step();
      that.game.draw(that.ctx);
      that.game.ship.reduceVelocity();
    }, 20);

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
