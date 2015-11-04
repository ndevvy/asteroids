$("#modal").modal({
 escapeClose: false,
 clickClose: false,
 showClose: false,
 opacity: 0
});


/*jshint multistr: true */

var startModalContent = '<h1>Welcome to Asteroids!</h1> \
<ul> \
  <li> Use left and right arrow keys to rotate </li> \
  <li> Power your ship by pressing up.  You can go backwards by pressing down.</li> \
  <li> Fire bullets using the spacebar </li> \
  <li> Have fun! \
</ul> \
<button type="button" name="button" onclick="startGame()" rel="modal:close">start!</button>';
