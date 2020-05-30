/**
 * Provide messages about app processes at the top-left of the screen.
 * @module Toast
 */
export default class Toast {
  #timeout = null;
  /**
   * Create Toast instance.
   * @param {Object} config - override default config.
   * @param {NodeElement} [config.el=null] - Main widget element.
   * @param {number} [config.duration=2500] - Total time to show the message in milliseconds.
   * @return {this}
   */
  constructor(config = {}) {
    const toast = this;

    Object.assign(
      (toast.config = {}),
      {
        el: null,
        duration: 2500
      },
      config
    );

    toast.item = toast.config.el.querySelector('.toast');
  }

  /**
   * Show app message for "config.duration" time.
   * @param {string} text - message to be displayed.
   * @return {this}
   */
  show(text) {
    const toast = this;

    toast.item.innerHTML = text;

    toast.config.el.classList.add('show');

    if (toast.#timeout) {
      clearTimeout(toast.#timeout);
    }

    toast.#timeout = setTimeout(() => {
      clearTimeout(toast.#timeout); /* eslint-disable-line */
      toast.config.el.classList.remove('show');
    }, toast.config.duration);

    return toast;
  }
}
