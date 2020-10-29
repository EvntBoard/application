import React from 'react'
import { Button, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

const FormModalButtonDelete = ({ handleSubmit, onReset, setOpen, submitting }) => {

  const onClickClose = () => {
    setOpen(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle style={{ display: 'flex' }}>
        {('app.modal.button_delete.title')}
        <IconButton onClick={onClickClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        {('app.modal.button_delete.title')}
      </DialogContent>

      <DialogActions>
        <Button onClick={onReset}>
          {('app.modal.button_delete.button_reset')}
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={submitting}>
          {('app.modal.button_delete.button_delete')}
        </Button>
      </DialogActions>
    </form>
  )
}

export default FormModalButtonDelete
