import Color from 'color';

import App from './lib/app';
import { getRandomHex } from './lib/utils/index';

const data = { color: document.location.hash };

try {
  Color(data.color);
} catch (err) {
  data.color = getRandomHex();
}

const app = new App(data);
app.run();

window.app = app;
