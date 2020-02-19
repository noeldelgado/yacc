const { log } = console;

import Color from 'color';
import Pickr from '@simonwep/pickr/dist/pickr.es5.min';
import Copy from 'copy-text-to-clipboard';
import Input from '~/src/js/lib/components/input.js';
import Toast from '~/src/js/lib/components/toast.js';
import CS from '~/src/js/lib/vendor/character-shuffling.js';
import { $, $$, autoBind, getRandomHex } from '~/src/js/lib/utils'
window.Color = Color;

const internals = {};
/**
 * Checks if a string is a valid color format for `color` library
 * @param {string} color
 * @return {boolean}
 */
internals.validateColor = (color) => {
    try {
        Color(color);
        return true;
    }
    catch (err) {
        return false;
    }
};

/**
 * Application main handler
 */
export default class App {
    /**
     * @return {Object} default class properties
     */
    static get initialtProps() {
        return  {
            config: {},
            /**
             * Color’s instance reference
             * @typeof {Color}
             */
            color: null,
            /**
             * Pickr’s instance reference
             * @typeof {Pickr}
             */
            pickr: null,
            /**
             * Node elements collection reference
             */
            ui: {}
        }
    }

    /**
     * @return {Object} default configuraton values
     */
    static get defaultConfig() {
        return {
            color: '#FFFFFF',
            title: document.title
        }
    }

    /**
     * @param {Object} config override default config
     * @param {string} [config.color='#FFF']
     */
    constructor(config) {
        const app = this;

        Object.assign(app, app.constructor.initialtProps);
        Object.assign(app.config, app.constructor.defaultConfig, config);

        app.ui = {
            randomBtn: $('[data-random]'),
            copyToClipboardButtons: $$('[data-js-copy-to-clipboard-btn]'),
            colorPickerButton: $('[data-js-colorpicker-btn]'),
            fcmInput: $('[data-js-fecolormatrix-input]'),

            hexInput: new Input({
                el: $('[data-js-hex-input]'),
                validate: internals.validateColor
            }),
            rgbInput: new Input({
                el: $('[data-js-rgb-input]'),
                validate: internals.validateColor
            }),
            hslInput: new Input({
                el: $('[data-js-hsl-input]'),
                validate: internals.validateColor
            }),
            hwbInput: new Input({
                el: $('[data-js-hwb-input]'),
                validate: internals.validateColor
            }),

            toast: new Toast({
                el: $('.toast-wrapper')
            })
        };

        app.pickr = new Pickr({
            el: app.ui.colorPickerButton,
            useAsButton: true,
            default: app.config.color,
            theme: 'nano',
            position: 'right',
            components: {
                hue: true
            }
        });
    }

    /**
     * Boot the app:
     *  - enable inputs and buttons
     *  - bind events and update the history entry
     * @public
     * @return {App}
     */
    run() {
        const app = this;
        const color = app.config.color;

        app.ui.hexInput.enable();
        app.ui.rgbInput.enable();
        app.ui.hslInput.enable();
        app.ui.hwbInput.enable();
        app.ui.colorPickerButton.removeAttribute('disabled');
        app.ui.copyToClipboardButtons.forEach(b => b.removeAttribute('disabled'));

        app._bindEvents()._updateUI(color, {
            preventHistoryUpdate: true
        });
        history.replaceState({ color }, null, `${color}`);

        return app;
    }

    /**
     * Register event listeners
     * @private
     * @return {App}
     */
    _bindEvents() {
        const app = this;

        autoBind([
            [ app.ui.randomBtn, 'click', '_randomClickHandler' ],
            [ app.ui.copyToClipboardButtons, 'click', '_copyColorToClipboardHandler' ],
            [ app.ui.hexInput.element, 'isValid', '_isInputValidHandler' ],
            [ app.ui.rgbInput.element, 'isValid', '_isInputValidHandler' ],
            [ app.ui.hslInput.element, 'isValid', '_isInputValidHandler' ],
            [ app.ui.hwbInput.element, 'isValid', '_isInputValidHandler' ],
            [ window, 'popstate', '_popStateHandler' ]
        ], app);

        app.pickr.on('changestop', instance => {
            app._updateUI(instance.getColor().toHEXA().toString());
        });

        return app;
    }

    /**
     * Handles copyToClipboardButtons’ click event
     * @private
     * @return undefined
     */
    _copyColorToClipboardHandler(ev) {
        const [ property, selector ] = ev.currentTarget.dataset.copy.split(':');
        const value = $(selector)[property];

        if (Copy(value)) {
            this.ui.toast.show(`<b>${value}</b> copied`);
        }
    }

    /**
     * Handles app.ui.randomBtn’s click event
     * @private
     * @return undefined
     */
    _randomClickHandler() {
        this._updateUI(getRandomHex());
    }

    /**
     * Handles Input’s isValid custom event
     * @private
     * @return undefined
     */
    _isInputValidHandler(ev) {
        this._updateUI(ev.detail.text(), {
            preventElementUpdate: ev.target
        });
    }

    /**
     * Handles popstate event
     * @private
     * @return undefined
     */
    _popStateHandler(ev) {
        if (!ev.state || !ev.state.color) return;

        this._updateUI(ev.state.color, {
            preventHistoryUpdate: true
        });
    }

    /**
     * Updates the UI with passed color param.
     * Sets new app.color instance with to get color space conversions
     * Creates a new history state if
     * @param {string} [color='#000']
     * @param {Object} [params={}]
     * @property {boolean=} preventHistoryUpdate
     * @property {HTMLInputElement=} preventElementUpdate do not update this element
     * @private
     */
    _updateUI(color = '#000', params = {}) {
        const app = this;
        const { preventHistoryUpdate, preventElementUpdate } = params;

        app.color = Color(color);

        let hex = app.color.hex();
        let rgb = app.color.rgb().string();
        let hsl = app.color.hsl().round().string();
        let hwb = app.color.hwb().round().string();
        let [ r, g, b] = app.color.unitArray();

        let isLight = app.color.isLight();
        let textColor = app.color.mix(Color(isLight ? '#000' : '#fff'), 0.8);
        let borderColor = app.color.mix(Color(isLight ? '#000' : '#fff'), 0.2);

        app.pickr.setColor(hex);

        if (preventElementUpdate !== app.ui.hexInput.element) {
            app.ui.hexInput.setValue(hex);
        }

        if (preventElementUpdate !== app.ui.rgbInput.element) {
            app.ui.rgbInput.setValue(rgb);
        }

        if (preventElementUpdate !== app.ui.hslInput.element) {
            app.ui.hslInput.setValue(hsl);
        }

        if (preventElementUpdate !== app.ui.hwbInput.element) {
            app.ui.hwbInput.setValue(hwb);
        }

        app.ui.fcmInput.value = `${r.toFixed(2)}\t0\t0\t0\t0\n0\t${g.toFixed(2)}\t0\t0\t0\n0\t0\t${b.toFixed(2)}\t0\t0\n0\t0\t0\t1\t0`;

        document.documentElement.style.setProperty('--cc-main-color', hsl);
        document.documentElement.style.setProperty('--cc-text-color', textColor.toString());
        document.documentElement.style.setProperty('--cc-border-color', borderColor.toString());

        if (!preventHistoryUpdate) {
            history.pushState({ color: hex }, null, `${hex}`);
            document.title = `${app.config.title} - ${hex}`;
        }

        return app;
    }
}
