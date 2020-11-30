import React, { useMemo, useState } from 'react'
import { isString, size } from 'lodash'
import { Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import CachedIcon from '@material-ui/icons/Cached';

import { selectors as ehSelectors } from "../../../store/eventHistory"
import { getContrastYIQ } from '../../../utils/utils'
import text2png from '../../../utils/txtToPng'

const Button = ({ button: buttonP, onClick }) => {
  const [clicked, setClicked] = useState(false)
  const data = useSelector(ehSelectors.process)

  const processed = useMemo(() => {
    const processedData = []
    console.log(data)
    // data.forEach((value, key) => {
    //   if (key.includes(buttonP.idTrigger) && value.errorDate === null && value.endDate === null) {
    //     processedData.push(value)
    //   }
    // })
    return processedData
  }, [data, buttonP])

  const button = { ...buttonP } // custom state

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
    if (button.idTrigger) {
      onClick(button)
    }
  }

  const image = useMemo(() => {
    if (isString(button.image) && button.image.startsWith('workspace://')) {
      return button.image.replace('workspace://', `/api/workspace/`)
    }
    return button.image
  }, [button.image])

  if (!button) {
    return null
  }

  return (
    <div
      className='button'
      style={{ gridArea: button.id, cursor: button.idTrigger ? 'pointer' : null  }}
    >
      <div className='button-wrapper'>
        <Paper
          interactive={button.idTrigger}
          elevation={(button.idTrigger && clicked) ? 10 : 5}
          className='button-content'
          style={{
            padding: 0,
            backgroundColor: button.color,
            color: button.color ? getContrastYIQ(button.color) : null
          }}
        >
          { size(processed) > 0 ? (
            <Paper className='running'>
              <CachedIcon fontSize='large' />
              {size(processed) > 1 && <span>{size(processed)}</span>}
            </Paper>
          ) : null}
          { image && <img src={image}  alt='' /> }
          { textImage && <img className='button-content-text' src={textImage} alt='' /> }
          <div className='layer' onClick={onClickButton} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
        </Paper>
      </div>
    </div>
  );
}

export default Button
