# Changelog

## [Unreleased]
### Added
- Associated labels to inputs [90cff5a](90cff5a)
- #RRGGBBAA support [a80b545](a80b545)
  - Using Pickr’s [toHEXA](https://github.com/Simonwep/pickr/blob/master/src/js/utils/hsvacolor.js#L39) method
  - Display Pickr’s opacity slider
  - html’s checkerboard pattern to distinguish transparency
- new CSS Variables `--cc-main-solid-color`
- Mobile: apple-mobile-web-app-status-bar-style => black-translucent [0330ffe](0330ffe)
- HSV, CMKYK and LAB support [a4560e6](a4560e6)

### Changed
- Fix Firefox 100% width input overflow [c4c80f0](c4c80f0)
- Fix manually changing hash not updating UI [6e1f71f](6e1f71f)
- Update autoprefixer:browsers 'last 1 version' [a487a4d](a487a4d)
- Remove github-corner [4e0dd25](4e0dd25)
- Initial random color b663608

## [0.1.3] - #4 - 2020-02-18
### Changed
- Fix site.webmanifest paths

## [0.1.2] - [#3](#3) - 2020-02-18
### Changed
- Fix site.webmanifest paths
- Fix history navigation

## [0.1.1] - [#2](#2) - 2020-02-18
### Changed
- Fix assets path

## [0.1.0] - [#1](#1) - 2020-02-18
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
- [hsl support](10daf75e196ef6fb45dc78857a81309d2155cda6)

## [1c53e9d](https://github.com/noeldelgado/yacc/commit/1c53e9d2426c8e4fcd5ef9a062fc9baaca8039a5) - 2014-03-04
- hash based url
- disable HSL input

## 2013-10-03
- Initial release

[Unreleased]: https://github.com/noeldelgado/yacc/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/noeldelgado/yacc/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/noeldelgado/yacc/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/noeldelgado/yacc/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/noeldelgado/yacc/releases/tag/v0.1.0
