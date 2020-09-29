import React, { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { Icon, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'

import Handler from './Handler'
import { getContrastYIQ } from '../utils'

import text2png from '../../../utils/txtToPng'

export default ({button, grabbing, onMouseDown, onHandlerMouseDown, onClickUpdate, onClickDelete}) => {
  if (!button) {
    return null
  }

  const innerOnClickUpdate = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClickUpdate(button)
  }

  const innerOnClickDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClickDelete(button)
  }

  const url = useMemo(() => {
    if (button.image && !isEmpty(button.image)) {
      return button.image
    }
    return null
  }, [button.image])

  const color = useMemo(() => button.color ? getContrastYIQ(button.color) : 'black', [button.color])

  const textImage = useMemo(() => {
    if (button.text && !isEmpty(button.text)) {
      const border = color === 'white' ? 'black' : 'white'
      return text2png(button.text, { strokeWidth: 2, strokeColor: border, color, padding: 15 })
    }
    return null
  }, [button.text, color])

  return (
    <div
      onMouseDown={onMouseDown}
      className='preview-track'
      style={{
        cursor: grabbing ? 'grabbing' : 'grab',
        gridArea: button.id
      }}
    >
      <div
        className={`preview-track-content ${grabbing ? 'shadow-lg' : 'shadow'}`}
        style={{
          backgroundColor: button.color,
          color: button.color ? getContrastYIQ(button.color) : null
        }}
      >
        <div className='preview-track-content-context'>
          <Popover
            content={(
              <Menu>
                <MenuItem onClick={innerOnClickUpdate} icon="edit" text="Edit" />
                <MenuItem onClick={innerOnClickDelete} icon="trash" text="Trash" />
              </Menu>
            )}
            captureDismiss
            position={Position.RIGHT_TOP}
          >
            <Icon style={{ cursor: "pointer" }} className='mt-4 mr-8' icon="more" />
          </Popover>
        </div>
        { url && <img src={url}  alt='' /> }
        { textImage && <img className='preview-track-content-text' src={textImage} alt='' /> }
      </div>
      <Handler position="top" onMouseDown={onHandlerMouseDown('top')} />
      <Handler position="right" onMouseDown={onHandlerMouseDown('right')} />
      <Handler position="bottom" onMouseDown={onHandlerMouseDown('bottom')} />
      <Handler position="left" onMouseDown={onHandlerMouseDown('left')} />
    </div>
  );
}
