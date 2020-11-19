import React from 'react'
import { Dialog } from '@material-ui/core'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  paperTest: {
    overflow: 'auto'
  }
}))

function replacer(key, value) {
  const originalObject = this[key];
  if(originalObject instanceof Map) {
    const mapObject = {}
    originalObject.forEach((value1, key1) => {
      mapObject[key1] = value1
    });
    return mapObject
  } else {
    return value;
  }
}

const ModalBoardSettings = ({ open, setOpen, current }) => {
  const classes = useStyles()

  if (!open) {
    return null
  }

  const innerOnClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={innerOnClose}
      fullWidth
      maxWidth="sm"
      className='debug-modal'
      classes={{
        paper: classes.paperTest
      }}
    >
      <pre><code>{JSON.stringify(current, replacer, 2)}</code></pre>
    </Dialog>
  )
}

export default ModalBoardSettings
