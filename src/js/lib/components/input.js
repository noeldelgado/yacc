/**
 * Inputs base class.
 * @module Input
 */
import { debounce } from '../utils/index';

export default class Input {
  /**
   * Create Input instance.
   * @param {Object} config - override default config.
   * @param {NodeElement} [config.el=null] - Main widget element.
   * @param {string} [config.model=null] - Input color model supported by the `color` library.
   * @param {number} [config.debounceMilliseconds=300] - Delay in milliseconds for debounced input event.
   * @param {Function} [config.validate=() => true] - Custom function to perform input validations.
   * @return {this}
   */
  constructor(config) {
    const input = this;

    Object.assign(
      (input.config = {}),
      {
        el: null,
        model: null,
        debounceMilliseconds: 300,
        validate: () => true
      },
      config
    );

    input.events = {};
    input.validColorString = null;
    input.validFormat = null;
    input.latestValidValue = null;

    input.#bindEvents();
  }

  get element() {
    return this.config.el;
  }

  /**
   * Removes input’s attribute `disabled`.
   * @return {this}
   */
  enable() {
    this.element.removeAttribute('disabled');
    return this;
  }

  /**
   * Updates the input’s value.
   * @return {this}
   */
  setValue(value) {
    const input = this;

    if (value !== input.latestValidValue) {
      input.element.value = value;
      input.latestValidValue = value;
      input.validFormat = value;
    }

    return input;
  }

  /**
   * Register event listeners.
   * @private
   * @return {this}
   */
  /* eslint-disable-next-line no-undef */
  #bindEvents() {
    const input = this;

    input.events.validChange = new CustomEvent('validChange', {
      detail: {
        color: () => input.validColorString
      }
    });

    input.element.addEventListener(
      'input',
      debounce(input.#inputHandler.bind(this), input.config.debounceMilliseconds)
    );

    input.element.addEventListener('blur', input.#blurHandler.bind(this));

    return input;
  }

  /**
   * Compares the current valid input format with the previously emitted value.
   * @private
   * @return {boolean}
   */
  /* eslint-disable-next-line no-undef */
  #hasChanged() {
    return this.latestValidValue !== this.validFormat;
  }

  /**
   * Input’s input event handler.
   * @private
   * @emits {validChange} if the `config.validate` function resolves with a truthy value and the input’s value is different than the previously emitted value.
   */
  /* eslint-disable-next-line no-undef */
  #inputHandler() {
    const input = this;

    if (!input.config.validate(input)) {
      input.element.setAttribute('aria-invalid', 'true');
      return;
    }

    input.element.setAttribute('aria-invalid', 'false');

    if (input.#hasChanged()) {
      input.latestValidValue = input.validFormat;
      input.element.dispatchEvent(input.events.validChange);
    }
  }

  /**
   * Input’s blur event handler.
   * Restores the latest valid value if needed.
   * @private
   */
  /* eslint-disable-next-line no-undef */
  #blurHandler() {
    const input = this;
    const { validFormat } = input;

    if (validFormat && input.element.value !== validFormat) {
      input.element.value = validFormat;
      input.latestValidValue = validFormat;
      input.element.setAttribute('aria-invalid', 'false');
    }
  }
}
