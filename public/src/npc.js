(function(exports) {
  function Npc(id, npc_x, npc_y, npc_w, npc_h, script, game, sprite) {
    this._canvas = document.getElementById("myCanvas");
    this._ctx = this._canvas.getContext("2d");
    this.game = game;

    this._id = id;
    this._x = npc_x;
    this._y = npc_y;
    this._spriteWidth = npc_w;
    this._spriteHeight = npc_h;
    this._script = script;

    this._sprite = new Image();
    this._sprite.src = sprite['src'];
    this._sprite_x = sprite['x'];
    this._sprite_y = sprite['y'];
    this._sprite_w = sprite['w'];
    this._sprite_h = sprite['h'];
  }

  Npc.prototype.drawNpc = function() {
    this._ctx.beginPath();
    this._ctx.drawImage(this._sprite, this._sprite_x, this._sprite_y, this._sprite_w,
                        this._sprite_h, this._x, this._y, this._sprite_w, this._sprite_h);
    this._ctx.fill();
    this._ctx.closePath();
  }

  Npc.prototype.reposition = function(npc) {
    this.drawNpc();
  }

  Npc.prototype.getScript = function() {
    return this._script.container(this._id);
  }

  Npc.prototype.action = function() {
    if (this.validAction() !== true) {
      switch(this._id) {
        case 'computer':
          game.actionPoints.consumeAP(25);
          game.projectScore.increaseProjectScore();
          break;
        case 'lana':
          game.actionPoints.consumeAP(25);
          game.actionPoints.meditate();
          break;
        case 'ned':
          game.actionPoints.consumeAP(25);
          game.projectScore.scoreMultiplier(2);
          break;
      }
    }
  }

  Npc.prototype.validAction = function() {
    return (game.actionPoints._points < 25)
  }

  exports.Npc = Npc;
})(this);
