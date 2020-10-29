import React, { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { Menu, MenuItem } from '@material-ui/core'

import Handler from './Handler'
import text2png from '../../../utils/txtToPng'
import { getContrastYIQ } from '../utils'

const initialState = {
  mouseX: null,
  mouseY: null,
};

const Track = ({button, grabbing, onMouseDown, onHandlerMouseDown, onClickUpdate, onClickDelete}) => {
  const [state, setState] = React.useState(initialState);

  const url = useMemo(() => {
    if (button.image && !isEmpty(button.image)) {
      return button.image
    }
    return null
  }, [button?.image])

  const color = useMemo(() => button.color ? getContrastYIQ(button.color) : 'black', [button?.color])

  const textImage = useMemo(() => {
    if (button.text && !isEmpty(button.text)) {
      const border = color === 'white' ? 'black' : 'white'
      return text2png(button.text, { strokeWidth: 2, strokeColor: border, color, padding: 15 })
    }
    return null
  }, [button?.text, color])

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

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

  if (!button) {
    return null
  }

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
        <div onContextMenu={handleClick} className='preview-track-content-context'>
          <Menu
            keepMounted
            open={state.mouseY !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              state.mouseY !== null && state.mouseX !== null
                ? { top: state.mouseY, left: state.mouseX }
                : undefined
            }
          >
            <MenuItem onClick={innerOnClickUpdate}>Edit</MenuItem>
            <MenuItem onClick={innerOnClickDelete}>Delete</MenuItem>
          </Menu>
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

export default Track
