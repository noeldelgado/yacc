/* character-shuffling
 * https://github.com/noeldelgado/character-shuffling
 * MIT License
 */
(function(root, factory) { 'use strict';
 if (typeof exports === 'object') {
   module.exports = factory();
 } else {
   root.CharacterShuffling = factory(root);
 }
}(this, function factory() { 'use strict';
  CharacterShuffling.version = '1.0.0';

  /* @constructor CharacterShuffling [Function]
   * @param element <required> [NodeElement] Node to shuffle its text contents.
   * @param config <optional> [Object] Options to be merged with the defaults.
   *   config.chars [String] The characters you want to be used for the random selection on every update.
   *   config.times [Number] How many times should the letters be changed. (10)
   *   config.text [String] Text to transition to. (this.element.textContent)
   *   config.callback [Function] Function to be call once the shuffling is complete.
   */
  function CharacterShuffling(element, config) {
    if (typeof element === 'undefined') {
      throw new Error('CharacterShuffling [constructor]: "element" param is required');
    }

    this.element = element;

    var defaults = {
      chars : "abcdefghijklmnopqrstuvwxyz" +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "0123456789" +
        ",.?/\\(^)![]{}*&^%$#'\"",
      times : 10,
      text : this.element.textContent,
      callback : null
    };
    this.options = _merge(defaults, config);
  }

  /* Starts the shuffle animation.
   * @method shuffle <public> [Function]
   * @argument options <optional> [Object] (same options as constructor.config)
   */
  CharacterShuffling.prototype.shuffle = function shuffle(options) {
    if (options) {
      _merge(this.options, options);
    }

    this._start = -this.get('times');
    this._charsLen = this.get('chars').length;
    this._textLen = this.get('text').length;

    requestAnimationFrame(this._shuffle.bind(this));
    return this;
  };

  /* Returns the current value of an option if matched with the argument passed.
   * @method get <public> [Function]
   * @return this.options[propertyName] || undefined
   */
  CharacterShuffling.prototype.get = function get(propertyName) {
    return this.options[propertyName];
  };

  CharacterShuffling.prototype.set = function set(propertyName, value) {
    this.options[propertyName] = value;
  };

  /* Updates element.textContent value with new a random generated string.
   * @method _shuffle <private> [Function]
   */
  CharacterShuffling.prototype._shuffle = function _shuffle() {
    var i, arr = this.get('text').split('');

    if (this._start > this._textLen) {
      if (typeof this.get('callback') === 'function') {
        this.get('callback').call(this);
      }
      return;
    }

    for (i = Math.max(this._start,0); i < this._textLen; i++) {
      if (i < (this._start + this.get('times'))) {
        if (arr[i] !== ' ') {
          arr[i] = this.get('chars')[Math.floor(Math.random() * this._charsLen)];
        }
        continue;
      }
      arr[i] = '';
    }

    this._start++;
      this.element.value = arr.join('');
    // this.element.textContent = arr.join("");
    requestAnimationFrame(this._shuffle.bind(this));
  };

  function _merge(a, b) {
    for (var propertyName in b) {
      a[propertyName] = b[propertyName];
    }
    return a;
  }

  return CharacterShuffling;
}));
