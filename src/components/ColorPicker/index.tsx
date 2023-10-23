import {useState} from 'react'
import {ChromePicker} from 'react-color'
import {FaEyeDropper} from 'react-icons/fa'
import styled from 'styled-components'
import {EyeDropper} from 'react-eyedrop'
import {StringInputProps, StringSchemaType, set, unset, PatchEvent, FormField} from 'sanity'
import {TextInput} from '@sanity/ui'

import rgb2hex from 'rgb2hex'

const PickerStyles = styled.div`
  position: relative;

  .--mb--color-picker {
    position: relative !important;
    width: 100%;
    box-shadow: none;
    z-index: 1;
  }

  .color-picker-header {
    display: none;
  }

  .color-picker-body {
    padding: 0;
  }

  .colorInput {
    input {
      padding-left: 46px;
    }
  }
`

const ColorPreview = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 28px;
  height: 28px;
  background-color: ${(props: any) => props.color || '#fff'};
  border-radius: 10000px;
  border: 1px solid rgb(189, 198, 212);
  overflow: hidden;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`

const hex2rgb = (hex: string): {red: number; green: number; blue: number} | null => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null
}

const setColor = (color: string): string => {
  const parsedColor = hex2rgb(color)
  if (!parsedColor) {
    return '#fff'
  }

  const {red, green, blue} = parsedColor
  if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
    return '#000'
  }

  return '#fff'
}

const Dropper = styled.button`
  appearance: none;
  position: absolute;
  top: -92px;
  left: 6px;
  z-index: 10;
  background-color: ${(props: any) => (props.color ? props.color : '#fff')};
  color: ${(props: any) => setColor(props.color || '#fff')};
  width: 20px;
  height: 20px;
  border: 1px solid rgb(189, 198, 212);
  border-radius: 1000px;
`

const hexRegex = /^#[0-9A-F]{6}$/i

const DropperButton = ({onClick, customProps: {color}}: any) => (
  <Dropper className="btn" onClick={onClick} color={color}>
    <FaEyeDropper size={'0.65em'} style={{position: 'relative', left: -2, top: -1}} />
  </Dropper>
)

export interface ColorPickerProps {
  type: {title: string}
  level: number
  value: number
  onChange: (input: any) => void
}

export const ColorPicker = (props: StringInputProps<StringSchemaType>) => {
  const [state, setState] = useState({pickColor: false})

  const handlePickerChange = (color: any) => {
    const patch = color.hex === '' ? unset() : set(color.hex)
    props.onChange(PatchEvent.from(patch))
  }

  const handleChange = (event: any) => {
    let color

    if (event.target) {
      color = event.target.value

      if (color.slice(0, 1) !== '#') {
        color = `#${color}`
      }
    } else {
      const rgbValue = event.split(',')

      if (rgbValue.length) {
        color = rgb2hex(event)
        color = color.hex
      } else {
        color = event
      }
    }

    const patch = color === '' ? unset() : set(color)
    props.onChange(PatchEvent.from(patch))
  }

  const handleEyedropper = ({hex}: any) => {
    const patch = set(hex)
    props.onChange(PatchEvent.from(patch))
  }

  // const handleClear = (event: any) => {
  //   event.preventDefault()
  //   props.onChange(PatchEvent.from(unset()))
  //   setState({pickColor: false})
  // }

  // const handleClose = (event: any) => {
  //   event.preventDefault()
  //   setState({pickColor: false})
  // }

  const openPicker = (event: any) => {
    event.preventDefault()
    setState({pickColor: !state.pickColor})
  }

  const {type, value, level} = props as any

  return (
    <PickerStyles>
      <FormField label={type.title} level={level} description={type.description}>
        <div className={'colorInput'} style={{position: 'relative'}}>
          <ColorPreview color={hexRegex.test(value) ? value : '#fff'} onClick={openPicker} />

          <TextInput type="text" value={value === undefined ? '' : value} onChange={handleChange} />
        </div>

        {state.pickColor && (
          <div style={{marginTop: 20, position: 'relative'}}>
            <ChromePicker
              color={value || '#000'}
              onChange={handlePickerChange}
              onChangeComplete={handlePickerChange}
              disableAlpha
            />
            <EyeDropper
              onChange={handleEyedropper}
              cursorActive={'crosshair'}
              customComponent={DropperButton}
              customProps={{color: value || '#000'}}
            />
          </div>
        )}
      </FormField>
    </PickerStyles>
  )
}
