/**
 * Handle hex input validations and updates.
 * @module InputHex
 * @extends Input
 */
import Color from 'color';
import Input from '~/src/js/lib/components/input';

const internals = {
    /**
     * Checks if an input value is a valid hex color form for the `color` library.
     * If it does not contains a `#` character it will prepend it before the check.
     * @return {boolean}
    */
    validateHexColorFromInput(input) {
        const el = input.element;
        el.value = el.value.toUpperCase();
        let value = (el.value.includes('#')? el.value : `#${el.value}`);

        try {
            Color(value);
            input.validFormat = value.replace('#', '');
            input.validColorString = value;
            return true;
        }
        catch (err) {
            return false;
        }
    }
}

export default class InputHex extends Input {
    constructor(config) {
        super({
            ...config,
            validate: internals.validateHexColorFromInput
        });
    }
}
