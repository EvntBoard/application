import React from 'react'
import { Form } from 'react-final-form'
import { Dialog } from '@material-ui/core'

import FormName from './form'

const ModalAddPLugin = ({ open, setOpen, onSubmit, onReset, current }) => {
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
    >
      <Form
        initialValues={current}
        onReset={onReset}
        onSubmit={onSubmit}
        open={open}
        setOpen={setOpen}
        component={FormName}
      />
    </Dialog>
  )
}

export default ModalAddPLugin
