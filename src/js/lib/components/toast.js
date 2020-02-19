const { log } = console;

export default class Toast {
    static get defaultProps() {
        return  {
            config: {},
            item: null,
            _timeout: null
        }
    }

    static get defaultConfig() {
        return {
            el: null,
            duration: 2500
        }
    }

    constructor(config) {
        const toast = this;

        Object.assign(toast, toast.constructor.defaultProps);
        Object.assign(toast.config, toast.constructor.defaultConfig, config);

        toast.item = toast.config.el.querySelector('.toast');
    }

    show(text) {
        const toast = this;

        toast.item.innerHTML = text;

        toast.config.el.classList.add('show');

        if (toast._timeout) clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            clearTimeout(toast._timeout);
            toast.config.el.classList.remove('show');
        }, toast.config.duration);

        return toast;
    }
}
