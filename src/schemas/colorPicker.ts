import {ColorPicker} from '../components/ColorPicker'
import {defineType} from 'sanity'

export const colorPicker = defineType({
  name: 'colorPicker',
  type: 'string',
  title: 'Color Picker',
  components: {
    input: ColorPicker,
  },
})
