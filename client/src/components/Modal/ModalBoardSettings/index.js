import React from 'react'
import { Form } from 'react-final-form'
import { Dialog } from '@blueprintjs/core'

import FormUpdateDelete from './form'

const ModalBoardSettings = ({ open, setOpen, onSubmit, onReset, current }) => {
  if (!open) {
    return null
  }

  const innerOnClose = () => {
    setOpen(false)
  }

  return (
    <Dialog isOpen={open} onClose={innerOnClose}>
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
