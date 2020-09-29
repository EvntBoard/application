import React, { useMemo, useState } from 'react'
import { get, isString } from 'lodash'
import { Card } from '@blueprintjs/core'

import { getContrastYIQ } from '../utils'
import { useAppContext } from '../../../context'
import text2png from '../../../utils/txtToPng'

export default ({ button: buttonP }) => {
  const [clicked, setClicked] = useState(false)
  const { state, emit, url } = useAppContext()

  const button = { ...buttonP, ...get(state , `button-${buttonP.id}`) }

  const textImage = useMemo(() => {
    if (button.text) {
      const color = getContrastYIQ(button.color)
      const border = color === 'white' ? 'black' : 'white'
      return text2png(button.text, { strokeWidth: 2, strokeColor: border, color, padding: 15 })
    }
    return null
  }, [button.text, button.color])

  const onMouseDown = () => {
    setClicked(true)
  }

  const onMouseUp = () => {
    setClicked(false)
  }

  const onClickButton = () => {
    emit('click', { id: button.id })
  }

  const image = useMemo(() => {
    if (isString(button.image) && button.image.startsWith('workspace://')) {
      return button.image.replace('workspace://', `${url}/workspace/`)
    }
    return button.image
  }, [button.image])

  if (!button) {
    return null
  }

  return (
    <div
      className='button'
      style={{ gridArea: button.id, cursor: button.id_trigger ? 'pointer' : null  }}
    >
      <div className='button-wrapper'>
        <Card
          interactive={button.id_trigger}
          elevation={(button.id_trigger && clicked) ? 4 : 0}
          className='button-content'
          style={{
            padding: 0,
            backgroundColor: button.color,
            color: button.color ? getContrastYIQ(button.color) : null
          }}
        >
          { image && <img src={image}  alt='' /> }
          { textImage && <img className='button-content-text' src={textImage} alt='' /> }
          <div className='layer' onClick={onClickButton} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
        </Card>
      </div>
    </div>
  );
}
