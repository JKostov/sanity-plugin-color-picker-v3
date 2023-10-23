# sanity-plugin-color-picker-v3

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
