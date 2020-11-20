import React from 'react'
import {Dialog, Divider, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import TriggerForEvent from './TriggerForEvent'

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
    return { MAP: mapObject }
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
      maxWidth="lg"
      className='debug-modal'
      classes={{
        paper: classes.paperTest
      }}
    >
      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12}>
          <TriggerForEvent id={current?.id} />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 4, paddingBottom: 4 }}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <div style={{ maxHeight: 500, overflow: 'auto'}}>
            <pre><code>{JSON.stringify(current, replacer, 2)}</code></pre>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default ModalBoardSettings
