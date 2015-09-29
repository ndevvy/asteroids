(function (){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  // var Asteroids = window.Asteroids;
  Asteroids.Util = {};

  Asteroids.Util.inherits = function(ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Asteroids.Util.randomVector = function(length) {
    var angle = Math.random() * Math.PI * 2;
    return [Math.cos(angle) * length, Math.sin(angle) * length];
  };

  Asteroids.Util.distance = function(pos1, pos2) {
    return Math.sqrt(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2));
  };

})();
