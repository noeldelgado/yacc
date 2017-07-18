# Syringe
[![npm-image](https://img.shields.io/npm/v/syringe.js.svg?style=flat-square)](https://www.npmjs.com/package/syringe.js)
![bower-image](https://img.shields.io/bower/v/syringe.js.svg?style=flat-square)

* Injects CSS at runtime
* Remove CSS added via Syringe
* Supports:
    * @keyframes (auto-prefixed)
    * @media at-rule - Media Queries
    * @font-face at-rule
    * @import at-rule
    * Pseudo-elements and pseudo-classes
    * Prefixed properties (explicit declaration)
    * JSON format

**Tested on:** IE8+, Chrome, Firefox, Safari and Opera.


## Installation

**NPM**

`npm install syringe.js --save`

**Bower**

`bower install syringe.js --save`

**Browser**

Just download [syringe.js](https://raw.githubusercontent.com/noeldelgado/Syringe.js/master/syringe.js) and add it to your env.

## Usage
### Syringe.inject()
```js
var Syringe = require('syringe.js')

var props = {
    body: {
        background: '#222',
        color: 'rgba(255,255,255,0.9)'
    },
    '.demo p': {
        'font-size': "6px",
        fontFamily: "sans-serif"
    }
};

Syringe.inject(props);
```

### Syringe.remove()
```js
Syringe.remove("header");               // single selector
Syringe.remove(["header", "body"]);     // multiple selectors at once
```

### Syringe.removeAll()
```js
Syringe.removeAll()                     // remove all styles injected via Syringe
```

## More Examples

### @keyframes
No need to declare the prefixed versions for `@keyframes`. Syringe will check which one is suported by the browser and inject that.

If you want to prefix any other property, you need to specify which ones and which prefixes you want to be applied, more on how to do this below.
```js
var props = {
    '@keyframes anim-test': {
        from: {
            color: 'red',
            boxShadow: "0 0 20px red",
            transform: 'translate3d(0, -20px, 0)'
        },
        to: {
            color: 'lime',
            boxShadow: "0 0 20px lime",
            transform: 'translate3d(0, 20px, -100px)'
        }
    },
    'h1': {
        animation: 'anim-test 2s ease 0s infinite alternate forwards'
    }
};

Syringe.inject(props);
```

#### @keyframes (remove)
```js
Syringe.remove(["@keyframes anim-test"]);
```

### Prefixed Properties

Non-support by default, however you can define what properties and which prefixes to apply, just extend `Syringe.config.prefixedProperties` before injection.

Example:

```js
Syringe.config.prefixedProperties = {
    'perspective'    : ['webkit'],
    'transform-style': ['webkit', 'ms'],
    'animation'      : ['webkit'],
    'transform'      : ['webkit', 'moz', 'ms', 'o']
};
```

```js
var props = {
    'body': {
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        animation: 'animation-test 2s ease 0 0'
    },
    'h1': {
        transform: 'translate3d(0, 0, -1000px)'
    }
};

Syringe.inject(props);
```

That will inject:

```css
body {
    -webkit-perspective: 1000px;
    perspective: 1000px;
    -webkit-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-animation: animation-test 2s ease 0 0;
    animation: animation-test 2s ease 0 0;
}
h1{
    -webkit-transform: translate3d(0, 0, -1000px);
    -moz-transform: translate3d(0, 0, -1000px);
    -ms-transform: translate3d(0, 0, -1000px);
    -o-transform: translate3d(0, 0, -1000px);
    transform: translate3d(0, 0, -1000px);
}
 ```

### @media (Media Queries)
```js
var props = {
    "@media screen" : {
        "*" : {
            fontFamily: "sans-serif"
        }
    },
    "@media all and (min-width: 500px)": {
        "body": {
            "background": "lime"
        }
    }
};
Syringe.inject(props);
```

#### Media Queries (remove)
```js
Syringe.remove("@media screen");
```

### @font-face
```js
var props = {
    '@font-face' : {
        'font-family': '"Bitstream Vera Serif Bold"',
        'src': 'url("VeraSeBd.ttf")'
    },
    'body' : {
        'font-family': '"Bitstream Vera Serif Bold", serif'
    }
};
Syringe.inject(props);

#### @font-face (remove)
```js
Syringe.remove("@font-face");
```

### Pseudo-elements, pseudo-classes
```js
var props = {
    'a': {
        color: "lime",
        transition: 'color 400ms'
    },
    'a:hover': {
        color: "red"
    },
    'a:after': {
        display: 'inline-block',
        content: '"[/]"',
        marginLeft: "5px"
    }
};

/* Strings support:
    Note that on the pseudo-element example,
    any expected 'String' should be double quoted
*/
```

### @import
As the [spec](http://www.w3.org/TR/CSS2/cascade.html#at-import) says:
> ...any @import rules must precede all other rules (except the @charset rule, if present)...

```js
var props = {
    "@import": "url(style.css)"
};
Syringe.inject(props);
```

#### @import (remove)
```js
Syringe.remove("@import url(style.css)");
```
