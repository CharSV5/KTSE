(function(exports) {
  function StatsBar(x, y, width, height, colour = "rgba(255, 255, 255, 1)", game, type) {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.game = game;
    this._x = x;
    this._y = y;
    this.type = type
    this._colour = colour;
    this._spriteWidth = width;
    this._spriteHeight = height;
    this._colour = colour;
  }

  StatsBar.prototype.drawCollisionBox = function() {
    this.ctx.beginPath();
    this.ctx.rect(this._x, this._y, this.calculateRemaining(), this._spriteHeight);
    this.ctx.fillStyle = this._colour;
    this.ctx.fill();
    this.ctx.closePath();
  }

  StatsBar.prototype.calculateRemaining = function() {
    if (this.type === 'A') {
      return this.game.actionPoints.points * 10
    } else if (this.type === 'E') {
      return this.game.energyLevel.points
    }
  }

  StatsBar.prototype.reposition = function() {
    this.drawCollisionBox();
  }

  exports.StatsBar = StatsBar;
})(this);