![asteroids](asteroids.png)

# Asteroids.js
Asteroids written in Javascript and rendered on the HTML5 canvas.  Play it [here](http://ndevvy.github.io/asteroids)!

## Code highlights / notes
* **Class Inheritance**: I wrote an `inherits` function using the surrogate technique to handle prototypal class inheritance. The `Surrogate` lets us temporarily assign the `ParentClass` prototype which can then be passed on to the `ChildClass`. This ensures that the `ChildClass`'s methods don't get inherited in the wrong direction by the `ParentClass`.

````javascript
Asteroids.Util.inherits = function(ChildClass, ParentClass) {
  var Surrogate = function () {};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};
````

* **Movement**: The ship stores its direction as a unit vector; powering the ship multiplies the ship's velocity by same:

````javascript
Ship.prototype.power = function(impulse) {
  var impulseVector = [this.direction[0] * impulse * Ship.VEL_MOD, this.direction[1] * impulse * Ship.VEL_MOD];
  this.vel[0] += impulseVector[0];
  this.vel[1] += impulseVector[1];
};
````

* **Rotation**:  Drawing rotated images on the Canvas requires moving the context origin to the position of the image, then rotating the context.  I draw the image at half the ship graphic's width and height so that the rotation is from the center of the ship image.  Once the image is drawn, the original rotation of the context is restored. [This](http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/) blog post has more detail.

````javascript
Ship.prototype.draw = function(ctx) {
  var rad = this.rotation * (Math.PI / 180.0);
  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate(rad);
  ctx.drawImage(Ship.IMG, -(Ship.IMG.width/2), -(Ship.IMG.height/2));
  ctx.restore();
};
````
