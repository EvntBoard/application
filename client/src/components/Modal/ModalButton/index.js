import React from 'react'
import { Form } from 'react-final-form'
import { Dialog } from '@material-ui/core'

import FormName from './form'

const ModalButton = ({ open, setOpen, onSubmit, onReset, current, triggers }) => {
  if (!open) {
    return null
  }
  const innerOnClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={innerOnClose} disableBackdropClick>
      <Form
        initialValues={current}
        onReset={onReset}
        onSubmit={onSubmit}
        open={open}
        setOpen={setOpen}
        component={FormName}
        triggers={triggers}
      />
    </Dialog>
  )
}

export default ModalButton
