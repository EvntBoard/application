import React from 'react'
import { useIntl } from 'react-intl'
import { Button, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import M from '../../../messages/constants'

const FormModalBoardDelete = ({ handleSubmit, onReset, setOpen, submitting }) => {
  const intl = useIntl()

  const onClickClose = () => {
    setOpen(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle style={{ display: 'flex' }}>
        {intl.formatMessage({ id: M.AppSettingsPluginModalDeleteTitle })}
        <IconButton onClick={onClickClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        {intl.formatMessage({ id: M.AppSettingsPluginModalDeleteInfo })}
      </DialogContent>

      <DialogActions>
        <Button onClick={onReset}>
          {intl.formatMessage({ id: M.AppSettingsPluginModalDeleteButtonCancel })}
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={submitting}>
          {intl.formatMessage({ id: M.AppSettingsPluginModalDeleteButtonSave })}
        </Button>
      </DialogActions>
    </form>
  )
}

export default FormModalBoardDelete
