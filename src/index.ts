import {definePlugin} from 'sanity'
import {colorPicker} from './schemas/colorPicker'

export const colorPickerPlugin = definePlugin({
  name: 'sanity-plugin-color-picker-v3',
  schema: {
    types: [colorPicker],
  },
})

export {colorPicker}
export {ColorPicker} from './components/ColorPicker'
export type {ColorPickerProps} from './components/ColorPicker'
