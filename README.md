# Sanity color picker plugin v3 &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JKostov/sanity-plugin-color-picker-v3/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/sanity-plugin-color-picker-v3.svg?style=flat)](https://www.npmjs.com/package/sanity-plugin-color-picker-v3) ![Build](https://github.com/JKostov/sanity-plugin-color-picker-v3/actions/workflows/main.yml/badge.svg)


> This is a **Sanity Studio v3** plugin.

Based on the v2 [sanity-plugin-color-picker](https://github.com/edolyne/sanity-plugin-color-picker).

## Installation

```sh
npm install sanity-plugin-color-picker-v3
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {colorPickerPlugin} from 'sanity-plugin-color-picker-v3'

export default defineConfig({
  //...
  plugins: [colorPickerPlugin()],
})
```

## License

[MIT](LICENSE)
