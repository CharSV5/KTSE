(function(exports)
  {function Script() {
    this._all_scripts =
      {
        dana: [{m: "Hello there."}, {m: "Do you want to meditate?"}],
        coach: [{m: "Hello there."}, {m: "Do you need help?"}]
      }
  }

  Script.prototype.container = function(id) {
    return this._all_scripts[id];
  }
})(this);
