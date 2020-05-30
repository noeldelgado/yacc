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
 * Limit the amount of times a function is called.
 * @see https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1
 */
export const debounce = (fn, time) => {
  let timeout = null;

  return function debounceFn(...args) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
