'use strict';

PlayerInput.BUTTON_A_KEY = Phaser.Keyboard.D;
PlayerInput.BUTTON_B_KEY = Phaser.Keyboard.F;
PlayerInput.BUTTON_C_KEY = Phaser.Keyboard.SPACEBAR;

PlayerInput.LEFT_KEY = Phaser.Keyboard.LEFT;
PlayerInput.RIGHT_KEY = Phaser.Keyboard.RIGHT;
PlayerInput.UP_KEY = Phaser.Keyboard.UP;
PlayerInput.DOWN_KEY = Phaser.Keyboard.DOWN;

function PlayerInput(game, player, options) {
  var self = this;
  options = options || {};

  if (typeof game !== 'object') {
    throw new Error('Player input expects game context: ' + game);
  }
  self._game = game;

  if (typeof player !== 'object') {
    throw new Error('Player input expects player context: ' + player);
  }
  self._player = player;

  self.buffer = [];

  // self._aButton = null;
  // self._bButton = null;
  // self._cButton = null;

  self._leftButton = null;
  self._rightButton = null;
  self._downButton = null;
  self._upButton = null;
  self.setLeftKey(PlayerInput.LEFT_KEY);
  self.setRightKey(PlayerInput.RIGHT_KEY);
  self.setDownKey(PlayerInput.DOWN_KEY);
  self.setUpKey(PlayerInput.UP_KEY);

}

PlayerInput.prototype.debugMovement = function() {
  var self = this;
  var output = '';
  if (self.leftPressed) output += '◄';
  if (self.downPressed && self.upPressed) {
    output += '♦';
  } else {
    if (self.downPressed) output += '▼';
    if (self.upPressed) output += '▲';
  }
  if (self.rightPressed) output += '►';


  if (output !== '') {
    console.log('movement state: ' + output);
  }
};

PlayerInput.prototype.blur = function() {
  var self = this;

  // clear key states
  self.buffer = [];

  // soft reset on all buttons
  // self._aButton.reset(false);
  // self._bButton.reset(false);
  // self._cButton.reset(false);
  self._leftButton.reset(false);
  self._rightButton.reset(false);
  self._downButton.reset(false);
  self._upButton.reset(false);

};

PlayerInput.prototype.focus = function() {

};

PlayerInput.prototype.setLeftKey = function(keycode) {
  var self = this;

  if (self._leftButton) {
    self._leftButton.reset(true);
  }

  self._leftButton = self._game.input.keyboard.addKey(keycode);

  self._leftButton.onDown.add(function() {
    this._player._keystate |= Player.LEFT_PRESSED;
  }, self);

  self._leftButton.onUp.add(function() {
    this._player._keystate ^= Player.LEFT_PRESSED;
  }, self);

};

PlayerInput.prototype.setRightKey = function(keycode) {
  var self = this;

  if (self._rightButton) {
    self._rightButton.reset(true);
  }

  self._rightButton = self._game.input.keyboard.addKey(keycode);

  self._rightButton.onDown.add(function() {
    this._player._keystate |= Player.RIGHT_PRESSED;
  }, self);

  self._rightButton.onUp.add(function() {
    this._player._keystate ^= Player.RIGHT_PRESSED;
  }, self);

};

PlayerInput.prototype.setDownKey = function(keycode) {
  var self = this;

  if (self._downButton) {
    self._downButton.reset(true);
  }

  self._downButton = self._game.input.keyboard.addKey(keycode);

  self._downButton.onDown.add(function() {
    this._player._keystate |= Player.DOWN_PRESSED;
  }, self);

  self._downButton.onUp.add(function() {
    this._player._keystate ^= Player.DOWN_PRESSED;
  }, self);

};

PlayerInput.prototype.setUpKey = function(keycode) {
  var self = this;

  if (self._upButton) {
    self._upButton.reset(true);
  }

  self._upButton = self._game.input.keyboard.addKey(keycode);

  self._upButton.onDown.add(function() {
    this._player._keystate |= Player.UP_PRESSED;
  }, self);

  self._upButton.onUp.add(function() {
    this._player._keystate ^= Player.UP_PRESSED;
  }, self);

};
