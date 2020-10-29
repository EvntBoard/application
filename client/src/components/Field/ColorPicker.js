import React, { useState } from 'react'
import { SketchPicker } from 'react-color'

const FieldColorPicker = ({ label, input, meta: { touched, error } }) => {
  const [displayColorPicker, setdisplayColorPicker] = useState(false)

  const onChange = (color) => {
    input.onChange(color.hex)
  }

  const handleClose = () => {
    setdisplayColorPicker(false)
  }

  const handleClick = () => {
    setdisplayColorPicker(!displayColorPicker)
  }

  return (
    <div>
      <label className='block mb-1' htmlFor="color-picker">
        { label }
      </label>
      <div>
        <div
          style={{
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          }}
          onClick={ handleClick }
        >
          <div
            style={{
              width: '36px',
              height: '14px',
              borderRadius: '2px',
              background: input.value,
            }}
          />
        </div>
        { displayColorPicker ? (
          <div style={{ position: 'absolute', zIndex: '2' }}>
            <div
              style={{
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
              }}
              onClick={ handleClose }
            />
            <SketchPicker disableAlpha color={ input.value } onChange={ onChange } />
          </div>
        ) : null
        }
      </div>
    </div>
  )
}

export default FieldColorPicker
