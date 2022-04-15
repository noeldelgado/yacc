## yet another color converter

![][github-actions-lighthouse-image]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![Total alerts][lgtm-image]][lgtm-url]
[![Language grade: JavaScript][lgtm-grade-image]][lgtm-grade-url]

Convert HEX, RGB, HSL, HWB, HSV, CMKYK, LAB color models plus feColorMatrix’s values.

https://noeldelgado.github.io/yacc/

![screenshot](public/images/screenshot.png)

### Development
Start dev server on port 8080 with livereload watching files on the `src` folder

```sh
npm install
npm start
```

#### SVG sprite
If you need to add a new `.svg` files to the svg sprite located after the `body` tag:

- Place your `.svg`’s files on the `src/assets/svg` folder
- Make sure you have `svg-sprite` installed, e.i.: `npm i -g svg-sprite`
- Run npm script `npm run svg`
  - That should generate a new file at `src/assets/svg-sprite-symbol/svg/sprite.symbol.svg` (ignored by `.gitignore`’s rule)
- Copy the contents of that file and replace the `svg` line after the `body` 🙈

### Build

```sh
npm run build
```

[github-actions-lighthouse-image]: https://github.com/noeldelgado/yacc/workflows/Lighthouse/badge.svg
[snyk-image]: https://snyk.io/test/github/noeldelgado/yacc/badge.svg
[snyk-url]: https://snyk.io/test/github/noeldelgado/yacc
[lgtm-image]: https://img.shields.io/lgtm/alerts/g/noeldelgado/yacc.svg?logo=lgtm&logoWidth=18
[lgtm-url]: https://lgtm.com/projects/g/noeldelgado/yacc/alerts/
[lgtm-grade-image]: https://img.shields.io/lgtm/grade/javascript/g/noeldelgado/yacc.svg?logo=lgtm&logoWidth=18
[lgtm-grade-url]: https://lgtm.com/projects/g/noeldelgado/yacc/context:javascript
