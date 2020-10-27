import React from 'react'
import { Form } from 'react-final-form'
import { Dialog } from '@material-ui/core'

import FormUpdateDelete from './form'

const ModalBoardSettings = ({ open, setOpen, onSubmit, onReset, current }) => {
  if (!open) {
    return null
  }

  const innerOnClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={innerOnClose} disableBackdropClick>
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
