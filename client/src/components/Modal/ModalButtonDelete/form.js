import React from 'react'
import { Button, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { useIntl } from 'react-intl'

import M from "../../../context/lang/messages/constants";

const FormModalButtonDelete = ({ handleSubmit, onReset, setOpen, submitting }) => {
  const intl = useIntl()

  const onClickClose = () => {
    setOpen(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle style={{ display: 'flex' }}>
        {intl.formatMessage({ id: M.ModalButtonDeleteTitle })}
        <IconButton onClick={onClickClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        {intl.formatMessage({ id: M.ModalButtonDeleteInfo })}
      </DialogContent>

      <DialogActions>
        <Button onClick={onReset}>
          {intl.formatMessage({ id: M.ModalButtonDeleteButtonCancel })}
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={submitting}>
          {intl.formatMessage({ id: M.ModalButtonDeleteButtonSave })}
        </Button>
      </DialogActions>
    </form>
  )
}

export default FormModalButtonDelete
