import React from 'react'
import { Form } from 'react-final-form'
import { Dialog } from '@material-ui/core'

import FormUpdateDelete from './form'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paperTest: {
    overflow: 'inherit'
  }
}))

const ModalBoardSettings = ({ open, setOpen, onSubmit, onReset, current }) => {
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
      disableBackdropClick
      fullWidth
      maxWidth="sm"
      classes={{
        paper: classes.paperTest
      }}
    >
      <Form
        setOpen={setOpen}
        initialValues={current}
        onReset={onReset}
        onSubmit={onSubmit}
        component={FormUpdateDelete}
      />
    </Dialog>
  )
}

export default ModalBoardSettings
