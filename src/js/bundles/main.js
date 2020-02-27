/**
---
$bundle: true
---
*/
import Color from 'color';
import App from '~/src/js/lib/app.js';
import { getRandomHex } from '~/src/js/lib/utils';

const data = { color: document.location.hash };

try {
    Color(data.color)
}
catch (err) {
    data.color = getRandomHex();
}

const app = new App(data);
app.run();

// window.app = app;
