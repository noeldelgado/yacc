export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

/**
 * Returns a random hexadecimal color code without the hash.
 * @property getRandomHexColor {Function}
 * @return 000000 {String}
 */
export function getRandomHex() {
    return `#${Math.random().toString(16).slice(2, 8)}`;
}

/**
 * @usage
 * autoBind([
 *  [ <NodeElement>, <'eventname'>, <context-method-handler>
 * ], <context>)
 */
export function autoBind(arr, ctx) {
    const listen = (node, ev, handler) => node.addEventListener(ev, handler, false);
    arr.forEach(rule => {
        ctx[rule[2]] = ctx[rule[2]].bind(ctx);
        if (rule[0].length) {
            return rule[0].forEach(ev => listen(ev, rule[1], ctx[rule[2]]));
        }
        return listen(rule[0], rule[1], ctx[rule[2]]);
    });
}
