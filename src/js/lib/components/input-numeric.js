/**
 * Handle numeric input validations and updates.
 * @module InputNumeric
 * @extends Input
 */
import Color from 'color';

import Input from './input';

const internals = {
  /**
   * Match any character that is not a digit (0-9), a dot '.' or a dash '-'.
   * */
  reNonDigit: new RegExp(/[^\d.-]/g),

  /**
   * Remove any character that is not a digit, a dot or a dash.
   * @param {string} str - string to search and replace
   * @return {string} a new string with the specified values removed
   */
  digit: (str) => str.replace(internals.reNonDigit, ''),

  /**
   * Transform a string to a number primitive.
   * @param {string} str
   * @retun {number}
   */
  number: (str) => Number(str),

  /**
   * Checks if an input value is a valid color for the `color` library by passing an array of values and its color model.
   * @return {boolean}
   */
  validateColorFromNumericInput(input) {
    const el = input.element;
    const value = el.value.split(',').map(internals.digit).map(internals.number);

    if (value.length < 3) return false;
    if (value.every((n) => isFinite(n)) === false) return false;

    try {
      const color = Color(value, input.config.model);

      input.validFormat = color.round().array().toString();
      input.validColorString = color.round().string();

      return true;
    } catch (err) {
      return false;
    }
  }
};

export default class InputNumeric extends Input {
  constructor(config) {
    super({
      ...config,
      validate: internals.validateColorFromNumericInput
    });
  }
}
