/**
 * Application main handler
 * @module App
 */
import Color from 'color';
import Copy from 'copy-text-to-clipboard';
import Pickr from '@simonwep/pickr';

import InputHex from './components/input-hex';
import InputNumeric from './components/input-numeric';
import FeColorMatrixInput from './components/fe-color-matrix-input';
import Toast from './components/toast';
import { $, $$, getRandomHex } from './utils/index';

window.Color = Color;

const internals = {
  /**
   * Checks if a string is a valid color input for the `color` library.
   * @param {string} str
   * @return {boolean}
   */
  validateColor(str) {
    try {
      Color(str);
      return true;
    } catch (err) {
      return false;
    }
  }
};

export default class App {
  /**
   * Create App instance.
   * @param {Object} config - override default config
   * @param {string} [config.color='#FFFFFF'] - Initial app color
   * @param {string} [config.title=document.title] - Prefix for document.title when history changes
   * @return {this}
   */
  constructor(config) {
    const app = this;

    Object.assign(
      (app.config = {}),
      {
        color: '#FFFFFF',
        title: document.title
      },
      config
    );

    app.color = null;
    app.pickr = null;
    app.ui = {};

    app.ui = {
      randomButton: $('[data-js-random-btn]'),
      colorPickerButton: $('[data-js-colorpicker-btn]'),
      copyToClipboardButtons: $$('[data-js-copy-to-clipboard-btn]'),
      hexInput: new InputHex({ el: $('[data-js-hex-input]') }),
      rgbInput: new InputNumeric({
        el: $('[data-js-rgb-input]'),
        model: 'rgb'
      }),
      hslInput: new InputNumeric({
        el: $('[data-js-hsl-input]'),
        model: 'hsl'
      }),
      hwbInput: new InputNumeric({
        el: $('[data-js-hwb-input]'),
        model: 'hwb'
      }),
      hsvInput: new InputNumeric({
        el: $('[data-js-hsv-input]'),
        model: 'hsv'
      }),
      cmykInput: new InputNumeric({
        el: $('[data-js-cmyk-input]'),
        model: 'cmyk'
      }),
      labInput: new InputNumeric({
        el: $('[data-js-lab-input]'),
        model: 'lab'
      }),
      fcmInput: new FeColorMatrixInput({ el: $('[data-js-fecolormatrix-input]') }),
      toast: new Toast({ el: $('.toast-wrapper') })
    };

    app.pickr = new Pickr({
      el: app.ui.colorPickerButton,
      useAsButton: true,
      default: app.config.color,
      theme: 'nano',
      position: 'right',
      components: {
        hue: true,
        opacity: true
      }
    });
  }

  /**
   * Boot the app.
   * @return {this}
   */
  run() {
    const app = this;
    const { color } = app.config;

    app.ui.hexInput.enable();
    app.ui.rgbInput.enable();
    app.ui.hslInput.enable();
    app.ui.hwbInput.enable();
    app.ui.hsvInput.enable();
    app.ui.cmykInput.enable();
    app.ui.labInput.enable();
    app.ui.randomButton.removeAttribute('disabled');
    app.ui.colorPickerButton.removeAttribute('disabled');
    app.ui.copyToClipboardButtons.forEach((b) => b.removeAttribute('disabled'));

    app.#bindEvents().#updateUI(color, {
      preventHistoryUpdate: true
    });
    history.replaceState({ color }, null, `${color}`);

    return app;
  }

  /**
   * Register event listeners and its handlers.
   * @private
   * @return {this}
   */
  #bindEvents() {
    const app = this;

    app.ui.randomButton.addEventListener('click', app.#randomClickHandler);

    Array.from(app.ui.copyToClipboardButtons, (el) => {
      el.addEventListener('click', app.#copyColorToClipboardHandler.bind(this));
    });

    [
      app.ui.hexInput,
      app.ui.rgbInput,
      app.ui.hslInput,
      app.ui.hwbInput,
      app.ui.hsvInput,
      app.ui.cmykInput,
      app.ui.labInput
    ].forEach((i) => {
      i.element.addEventListener('validChange', app.#isInputValidHandler.bind(this));
    });

    window.addEventListener('popstate', app.#popStateHandler.bind(this));
    app.pickr.on('changestop', (instance) =>
      app.#updateUI(instance.getColor().toHEXA().toString())
    );

    return app;
  }

  /**
   * Handles app.ui.copyToClipboardButtons’ click event.
   * Gets the reference to the text to be copied from the Element.dataset.
   * If the copy was successful a message is displayed to the user.
   * @private
   */
  #copyColorToClipboardHandler(ev) {
    const [property, selector] = ev.currentTarget.dataset.copy.split(':');
    const value = $(selector)[property];

    if (Copy(value)) {
      this.ui.toast.show(`“${value}” copied to clipboard`);
    }
  }

  /**
   * Handles app.ui.randomButton’s click event.
   * Calls app.#updateUI passing a random hex string as param.
   * @private
   */
  #randomClickHandler() {
    this.#updateUI(getRandomHex());
  }

  /**
   * Handles Input’s validChange custom event.
   * Calls app.#updateUI passing the color received on the events’s detail and the referece to the input as params.preventElementUpdate for the input itself to not be updated.
   * @private
   */
  #isInputValidHandler(ev) {
    this.#updateUI(ev.detail.color(), {
      preventElementUpdate: ev.target
    });
  }

  /**
   * Handles popstate event.
   * Gets the color data from the event state. If no color in state it defaults to location.hash.
   * Returns if the color data is not valid.
   * Updates the UI with the passed color and preventHistoryUpdate otherwise.
   * @private
   */
  #popStateHandler(ev) {
    let color = (ev.state && ev.state.color) || location.hash;

    if (internals.validateColor(color) === false) {
      return;
    }

    this.#updateUI(color, {
      preventHistoryUpdate: true
    });
  }

  /**
   * Updates the main UI color.
   * @param {string} [color='#000'] - String color to update the whole UI with.
   * @param {Object} [params={}]
   * @param {boolean} [params.preventHistoryUpdate=false] - Do not add a state to the browser’s session history stack.
   * @param {HTMLInputElement=} params.preventElementUpdate - This input element will not be updated.
   * @private
   */
  #updateUI(color = '#000000', params = {}) {
    const { preventHistoryUpdate = false, preventElementUpdate } = params;
    const app = this;

    app.color = Color(color);
    app.pickr.setColor(color);

    const hex = app.color.hex();
    const hexa = app.pickr.getColor().toHEXA().toString();
    const rgba = app.color.rgb().round().array().toString();
    const hsla = app.color.hsl().round().array().toString();
    const hwb = app.color.hwb().round().array().toString();
    const hsv = app.color.hsv().round().array().toString();
    const cmyk = app.color.cmyk().round().array().toString();
    const lab = app.color.lab().round().array().toString();

    const mix = app.color.isDark() && app.color.alpha() > 0.5 ? '#fff' : '#000';
    const textColor = app.color.mix(Color(mix), 0.8);
    const borderColor = app.color.mix(Color(mix), 0.2);

    if (preventElementUpdate !== app.ui.hexInput.element)
      app.ui.hexInput.setValue(hexa.replace('#', ''));
    if (preventElementUpdate !== app.ui.rgbInput.element) app.ui.rgbInput.setValue(rgba);
    if (preventElementUpdate !== app.ui.hslInput.element) app.ui.hslInput.setValue(hsla);
    if (preventElementUpdate !== app.ui.hwbInput.element) app.ui.hwbInput.setValue(hwb);
    if (preventElementUpdate !== app.ui.hsvInput.element) app.ui.hsvInput.setValue(hsv);
    if (preventElementUpdate !== app.ui.cmykInput.element) app.ui.cmykInput.setValue(cmyk);
    if (preventElementUpdate !== app.ui.labInput.element) app.ui.labInput.setValue(lab);

    app.ui.fcmInput.setValue(app.color.unitArray());

    document.documentElement.style.setProperty('--cc-main-color', app.color.hsl());
    document.documentElement.style.setProperty('--cc-main-solid-color', hex);
    document.documentElement.style.setProperty('--cc-text-color', textColor.toString());
    document.documentElement.style.setProperty('--cc-border-color', borderColor.toString());

    if (preventHistoryUpdate === false) {
      history.pushState({ color: hexa }, null, `${hexa}`);
      document.title = `${app.config.title} - ${hexa}`;
    }

    return app;
  }
}
