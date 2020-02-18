/**
---
$bundle: true
---
*/
import Color from 'color';
import App from '~/src/js/lib/app.js';

const data = { color: document.location.hash };

try {
    Color(data.color)
}
catch (err) {
    data.color = '#FFFFFF';
}

const app = new App(data);
app.run();

// window.app = app;
