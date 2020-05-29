import Color from 'color';
import App from './lib/app.js';
import { getRandomHex } from './lib/utils/index.js';

const data = { color: document.location.hash };

try {
  Color(data.color)
}
catch (err) {
  data.color = getRandomHex();
}

const app = new App(data);
app.run();

window.app = app;
