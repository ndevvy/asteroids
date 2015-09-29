function sum() {
  var result = 0;
  var args = [].slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}

// No call time args
//concat bind time and run time args
Function.prototype.myBind = function(ctx) {
  var that = this;
  var thatArgs = [].slice.call(arguments);
  thatArgs.shift();
  return function() {
    return that.apply(ctx, thatArgs.concat([].slice.call(arguments)));
  };
};

function Cat(name) {
  this.name = name;
}

Cat.prototype.says = function (sound) {
  console.log(this.name + " says " + sound + "!");
};

Function.prototype.curry = function(numArgs) {
  var origFunc = this;
  var numbers = [];
  var innerFunc = function(arg) {
    numbers.push(arg);
    if (numbers.length === numArgs) {
      return origFunc.apply(null, numbers);
    }
    else {
        return innerFunc;
    }
  };

  return innerFunc;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

function Cat(name) {
  this.name = name;
}

Cat.prototype.says = function (sound) {
  console.log(this.name + " says " + sound + "!");
};

var markov = new Cat("Markov");
var breakfast = new Cat("Breakfast");

markov.says("meow");
// Markov says meow!

markov.says.myBind(breakfast, "meow")();
// Breakfast says meow!

markov.says.myBind(breakfast)("meow");
// Breakfast says meow!ß
