import React, { useMemo } from 'react'
import { isEmpty } from 'lodash'

import Handler from './Handler'
import { getContrastYIQ } from '../utils'
import { IconButton, Popover } from '@material-ui/core'
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons'
import text2png from '../../../utils/txtToPng'

export default ({button, grabbing, onMouseDown, onHandlerMouseDown, onClickUpdate, onClickDelete}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!button) {
    return null
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

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
          <IconButton aria-describedby={id} color="primary" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Popover
            id={id}
            open={openPop}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div onClick={innerOnClickUpdate}>Edit</div>
            <div onClick={innerOnClickDelete}>Delete</div>
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
