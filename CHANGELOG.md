# Changelog

## [Unreleased]

(feature/sp)
### Added
- .editorconfig

### Changed
- use snowpack
  - *build:js* `snowpack:plugin-babel` (`.babelrc`)
    - babel/plugin-proposal-class-properties
    - babel/plugin-proposal-private-methods
  - *build:css* `postcss` (`.postcssrc`)
  - *bundle:* `snowpack:plugin-parcel`
    - `parcel-plugin-metaimage`
    - `.htmlnanorc`
- eslint
  - parser: `babel-eslint`
  - `eslint-config-rollup`
- build GitHub Pages from `/docs` folder

(feature/Lighthouse-ci)
### Added
- lighthouse-ci github action
- doc badges
  - lighthouse-ci
  - david’s
  - snyk
  - lgtm
- lgtm.yml

## [0.2.3] - [#7](../../pull/7) - 2020-03-08
### Changed
- eliminate render-blocking resources [`71dd00b`](https://github.com/noeldelgado/yacc/commit/71dd00b77809e03a9586d93015fc5f61a61be630)
  - remove google fonts stylesheet
  - preconnect {ajax,fonts}.googleapis
  - load google font using WebFont api
  - defer main script
- hover style to main buttons [`ba264ef`](https://github.com/noeldelgado/yacc/commit/ba264efbc7b4b0a8b9310428a8500414a57f18a5)

## [0.2.2] - [#6](../../pull/6) - 2020-03-02
### Added
- Focus style for inputs [`7bbbb31`](https://github.com/noeldelgado/yacc/commit/7bbbb315444100164eb1690211343d1b25572290)
- Twitter summary card [`a4d1cda`](https://github.com/noeldelgado/yacc/commit/a4d1cda00b63d7a47ad73f8f033e27388384ce07)

### Fixed
- alpha=0 text constrast [`1388cea`](https://github.com/noeldelgado/yacc/commit/1388cea18a8e51d99431c95847ff24b99356d283)
- aria-hidden for buttons with svg icons and typo [`bdd3ca6`](https://github.com/noeldelgado/yacc/commit/bdd3ca6570b161648952c01e221a23e54936aed7)

## [0.2.1] - 2020-03-01
### Changed
- Add new supported models to page description and default share text for twitter [`8c1c0fd`](https://github.com/noeldelgado/yacc/commit/8c1c0fddce26204dd410a429bc1040979a5e44c8)
### Fixed
- feColorMatrix whitespace [`185a02e`](https://github.com/noeldelgado/yacc/commit/185a02e41a8c3b97454376dd1f3b964c3749e6bc)

## [0.2.0] - [#5](../../pull/5) - 2020-03-01
### Added
- Associated labels to inputs [`90cff5a`](https://github.com/noeldelgado/yacc/commit/90cff5a883c5e73464fc3d6177031d127b608441)
- #RRGGBBAA support [`a80b545`](https://github.com/noeldelgado/yacc/commit/a80b54514882fa478a242707547651fc0a49cc0d)
  - Using Pickr’s [toHEXA](https://github.com/Simonwep/pickr/blob/master/src/js/utils/hsvacolor.js#L39) method
  - Display Pickr’s opacity slider
  - html’s checkerboard pattern to distinguish transparency
- new CSS Variables `--cc-main-solid-color`
- Mobile: apple-mobile-web-app-status-bar-style => black-translucent [`0330ffe`](https://github.com/noeldelgado/yacc/commit/0330ffeb8113aa2a10b20156fcee5ba7fd01a8d7)
- HSV, CMKYK and LAB support [`a4560e6`](https://github.com/noeldelgado/yacc/commit/a4560e6b055b47060c033d98ba4068340c519eb8)
- Initial random color [`b663608`](https://github.com/noeldelgado/yacc/commit/b663608b3d51476c0482b6e647aa258c8384dac8)

### Changed
- Update autoprefixer:browsers 'last 1 version' [`a487a4d`](https://github.com/noeldelgado/yacc/commit/a487a4d95fd0899874149c5ea603320471224ce3)

### Removed
- github-corner [`4e0dd25`](https://github.com/noeldelgado/yacc/commit/4e0dd25a11c4f0585b7b346a26d485bbddf70875)

### Fixed
- Manually changing hash not updating UI [`6e1f71f`](https://github.com/noeldelgado/yacc/commit/6e1f71f168cba2f162780f0a17e6ddb23c6f4b04)
- Firefox 100% width input overflow [`c4c80f0`](https://github.com/noeldelgado/yacc/commit/c4c80f0eb412951ec4efd1e6376ebc156b557261)

## [0.1.3] - [#4](../../pull/4) - 2020-02-18
### Fixed
- Fix site.webmanifest paths

## [0.1.2] - [#3](../../pull/3) - 2020-02-18
### Fixed
- site.webmanifest paths
- History navigation

## [0.1.1] - [#2](../../pull/2) - 2020-02-18
### Fixed
- Fix assets path

## [0.1.0] - [#1](../../pull/1) - 2020-02-18
### Added
- HWB color model
- feColorMatrix’s values
- Default initial `#FFFFFF` color
- History navigation
- Random color button
- [`Simonwep/pickr`](https://github.com/Simonwep/pickr) color picker
- [`sindresorhus/copy-text-to-clipboard`](https://github.com/sindresorhus/copy-text-to-clipboard)
- Copied to clipboard feedback
- CSS Variables to update the UI
- Favicons and site.webmanifest

### Changed
- Start using [`tacoss/tarima`](https://github.com/tacoss/tarima) for pre-processing
	- [`postcss`](https://github.com/postcss/postcss), [`rollup`](https://github.com/rollup/rollup), [`buble`](https://github.com/bublejs/buble)
- Start using [`Qix-/color`](https://github.com/Qix-/color) for color conversion and manipulation
- Overall design

### Removed
- Grunt, bower and [`noeldelgado/values.js`](https://github.com/noeldelgado/values.js)

## 2014-09-16
- [hsl support](https://github.com/noeldelgado/yacc/commit/10daf75e196ef6fb45dc78857a81309d2155cda6)

## [`1c53e9d`](https://github.com/noeldelgado/yacc/commit/1c53e9d2426c8e4fcd5ef9a062fc9baaca8039a5) - 2014-03-04
- hash based url
- disable HSL input

## 2013-10-03
- Initial release

[Unreleased]: https://github.com/noeldelgado/yacc/compare/v0.2.3...HEAD
[0.2.3]: https://github.com/noeldelgado/yacc/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/noeldelgado/yacc/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/noeldelgado/yacc/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/noeldelgado/yacc/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/noeldelgado/yacc/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/noeldelgado/yacc/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/noeldelgado/yacc/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/noeldelgado/yacc/releases/tag/v0.1.0
