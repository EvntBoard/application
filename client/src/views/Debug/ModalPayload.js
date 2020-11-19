import React from 'react'
import { Dialog } from '@material-ui/core'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paperTest: {
    overflow: 'auto'
  }
}))

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
      <pre><code>{JSON.stringify(current, null, 2)}</code></pre>
    </Dialog>
  )
}

export default ModalBoardSettings
