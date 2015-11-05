/*jshint multistr: true */

var modalOptions = {
  escapeClose: false,
  clickClose: false,
  showClose: false,
  opacity: 0
};

var startModalContent = '<h1>Asteroids.js</h1> \
  <ul> \
    <li> Use left and right arrow keys to rotate </li> \
    <li> Power your ship by pressing up </li> \
    <li> Go backwards by pressing down </li> \
    <li> Fire bullets using the spacebar </li> \
    <li> Have fun! \
  </ul> \
  <button type="button" name="button" onclick="Asteroids.startGame()" rel="modal:close">play</button>';

var endModalContent = function(highScore, score) {
  return '<h1>Game Over</h1>' +
  '<p>your score: ' +
  score +
  '</p> <p>high score: ' +
  highScore +
  '</p>' +
  restartButton;
};

var restartButton = '<button class="asteroids-button" onclick="Asteroids.restartGame()">replay</button>';
