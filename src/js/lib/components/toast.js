/**
 * Provide messages about app processes at the top-left of the screen.
 * @module Toast
 */
export default class Toast {
    /**
     * Create Toast instance.
     * @param {Object} config - override default config.
     * @param {NodeElement} [config.el=null] - Main widget element.
     * @param {number} [config.duration=2500] - Total time to show the message in milliseconds.
     * @return {this}
     */
    constructor(config = {}) {
        const toast = this;

        Object.assign(toast.config = {}, {
            el: null,
            duration: 2500
        }, config);

        toast.item = toast.config.el.querySelector('.toast');
        toast._timeout = null;
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

        if (toast._timeout) {
            clearTimeout(toast._timeout);
        }

        toast._timeout = setTimeout(() => {
            clearTimeout(toast._timeout);
            toast.config.el.classList.remove('show');
        }, toast.config.duration);

        return toast;
    }
}
