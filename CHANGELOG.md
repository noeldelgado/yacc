# Changelog

## [Unreleased]

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

### Changed
- Fix Firefox 100% width input overflow [`c4c80f0`](https://github.com/noeldelgado/yacc/commit/c4c80f0eb412951ec4efd1e6376ebc156b557261)
- Fix manually changing hash not updating UI [`6e1f71f`](https://github.com/noeldelgado/yacc/commit/6e1f71f168cba2f162780f0a17e6ddb23c6f4b04)
- Update autoprefixer:browsers 'last 1 version' [`a487a4d`](https://github.com/noeldelgado/yacc/commit/a487a4d95fd0899874149c5ea603320471224ce3)
- Remove github-corner [`4e0dd25`](https://github.com/noeldelgado/yacc/commit/4e0dd25a11c4f0585b7b346a26d485bbddf70875)
- Initial random color [`b663608`](https://github.com/noeldelgado/yacc/commit/b663608b3d51476c0482b6e647aa258c8384dac8)

## [0.1.3] - [#4](../../pull/4) - 2020-02-18
### Changed
- Fix site.webmanifest paths

## [0.1.2] - [#3](../../pull/3) - 2020-02-18
### Changed
- Fix site.webmanifest paths
- Fix history navigation

## [0.1.1] - [#2](../../pull/2) - 2020-02-18
### Changed
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

[Unreleased]: https://github.com/noeldelgado/yacc/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/noeldelgado/yacc/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/noeldelgado/yacc/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/noeldelgado/yacc/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/noeldelgado/yacc/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/noeldelgado/yacc/releases/tag/v0.1.0
