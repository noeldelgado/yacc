/** @module utils */

/** querySelector alias */
export const $ = document.querySelector.bind(document);
/** queryAllSelector alias */
export const $$ = document.querySelectorAll.bind(document);

/**
 * Returns a random hexadecimal color code without the hash.
 * @returns 000000 {String}
 */
export const getRandomHex = () => `#${Math.random().toString(16).slice(2, 8)}`;

/**
 * @usage
 * autoBind([
 *  [ <NodeElement>, <'eventname'>, <context-method-handler>
 * ], <context>)
 */
export const autoBind = (arr, ctx) => {
    const listen = (node, ev, handler) => node.addEventListener(ev, handler, false);
    arr.forEach(rule => {
        ctx[rule[2]] = ctx[rule[2]].bind(ctx);
        if (rule[0].length) {
            return rule[0].forEach(ev => listen(ev, rule[1], ctx[rule[2]]));
        }
        return listen(rule[0], rule[1], ctx[rule[2]]);
    });
}

/**
 * Limit the amount of times a function is called.
 * @see https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1
 */
export const debounce = (fn, time) => {
    let timeout = null;

    return function debounceFn() {
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}
