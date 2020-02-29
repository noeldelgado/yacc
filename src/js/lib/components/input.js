const { log } = console;

import { autoBind } from '~/src/js/lib/utils';

const internals = {
    rs: (string) => string.replace(/\s/g,'')
};

export default class Input {
    static get defaultProps() {
        return  {
            config: {},
            latestValidValue: ''
        }
    }

    static get defaultConfig() {
        return {
            el: null,
            validate: () => true
        }
    }

    constructor(config) {
        const input = this;

        Object.assign(input, input.constructor.defaultProps);
        Object.assign(input.config, input.constructor.defaultConfig, config);

        input._bindEvents();
    }

    enable() {
        this.config.el.removeAttribute('disabled');
        return this;
    }

    get element() {
        return this.config.el;
    }

    get value() {
        return this.element.value;
    }

    set value(value) {
        this.config.element.value = value;
    }

    setValue(value) {
        const input = this;

        input.element.value = value;
        input.latestValidValue = value;

        return input;
    }

    _bindEvents() {
        const input = this;

        input.events = {};
        input.events.isValid = new CustomEvent('isValid', {
            bubbles: true,
            testData: 100,
            detail: {
                el: input.element,
                text: () => input.element.value
            }
        });

        autoBind([
            [ input.config.el, 'input', '_inputHandler' ]
        ], input);

        return input;
    }

    _inputHandler(ev) {
        const input = this;

        if (input.config.validate) {
            if (input.config.validate(input.element.value)) {
                input.element.setAttribute('aria-invalid', 'false');
                if (internals.rs(input.latestValidValue) !== internals.rs(input.element.value)) {
                    input.latestValidValue = input.element.value;
                    input.element.dispatchEvent(input.events.isValid);
                }
                return input;
            }

            input.element.setAttribute('aria-invalid', 'true');

            return input;
        }

        // if (this.el.validity.valid) {
        //     if (rs(this.latestValidValue) !== rs(this.el.value)) {
        //         this.latestValidValue = this.el.value;
        //         this.el.dispatchEvent(this.events.isValid);
        //     }
        // }
    }
}
