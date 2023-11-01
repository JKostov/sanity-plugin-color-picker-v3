import {useState} from 'react'
import {ChromePicker} from 'react-color'
import styled from 'styled-components'
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
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  .chrome-picker {
    input {
      background-color: white;
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
  z-index: 10;

  &:hover {
    cursor: pointer;
  }
`

const hexRegex = /^#[0-9A-F]{6}$/i

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

  const openPicker = (event: any) => {
    event.preventDefault()
    setState((prev) => ({pickColor: !prev.pickColor}))
  }

  const {value, level} = props

  return (
    <PickerStyles>
      <FormField level={level}>
        <div className={'colorInput'} style={{position: 'relative'}}>
          <ColorPreview onClick={openPicker} color={hexRegex.test(value ?? '') ? value : '#fff'} />

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
          </div>
        )}
      </FormField>
    </PickerStyles>
  )
}
