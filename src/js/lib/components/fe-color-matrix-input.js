/**
 * Handle feColorMatrix hidden texarea updates.
 * @module FeColorMatrixInput
 */
const { round } = Math;

const internals = {
    /**
     * Automatically adds 0, 1 or 2 decimals.
     * @param {number} num
     * @return {number}
     */
    formatDecimals: (num) => round(num * 100) / 100
};

export default class FeColorMatrixInput {
    /**
     * Create FeColorMatrixInput instance.
     * @param {Object} config - override default config.
     * @param {NodeElement} [config.el=null] - Main widget element.
     * @return {this}
     */
    constructor(config = {}) {
        Object.assign(this.config = {}, {
            el: null
        }, config);
    }

    /**
     * @param {Array<number>} arr - An array containing the red, green, blue and alpha values.
     * @param {number} arr.r - red channel
     * @param {number} arr.g - green channel
     * @param {number} arr.b - blue channel
     * @param {number} [arr.a=1] - alpha channel
     * @return {this}
     */
    setValue([r, g, b, a = 1]) {
        this.config.el.value = this._getColorMatrixValue(r, g, b, a).replace(/$\s+/gm, '\n');
        return this;
    }

    /**
     * Format feColorMatrix’s values
     * @param {number} r - red channel
     * @param {number} g - green channel
     * @param {number} b - blue channel
     * @param {number} a - alpha channel
     * @private
     * @return {string} 5x5 matrix identity
     */
    _getColorMatrixValue(...channels) {
        return `${internals.formatDecimals(channels[0])}\t0\t0\t0\t0
            0\t${internals.formatDecimals(channels[1])}\t0\t0\t0
            0\t0\t${internals.formatDecimals(channels[2])}\t0\t0
            0\t0\t0\t${internals.formatDecimals(channels[3])}\t0`;
    }
}
