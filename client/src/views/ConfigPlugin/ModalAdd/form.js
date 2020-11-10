import React from 'react'
import { Button, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { useIntl } from 'react-intl'
import { isNull, isEmpty } from 'lodash'
import { Field } from 'react-final-form'

import M from "../../../messages/constants";
import InputField from '../../../components/Field/Input'

const required = (value) => isNull(value) || isEmpty(value)

const FormModalPluginAdd = ({ handleSubmit, onReset, setOpen, submitting }) => {
  const intl = useIntl()

  const onClickClose = () => {
    setOpen(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle style={{ display: 'flex' }}>
        <span style={{ flexGrow: 1 }}>{intl.formatMessage({ id: M.AppSettingsPluginModalAddTitle })}</span>
        <IconButton onClick={onClickClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>
          {intl.formatMessage({ id: M.AppSettingsPluginModalAddInfos })}
        </Typography>
        <Field
          validate={required}
          name="repo"
          label={intl.formatMessage({ id: M.AppSettingsPluginModalAddRepoLabel })}
          component={InputField}
          placeholder={intl.formatMessage({ id: M.AppSettingsPluginModalAddRepoPlaceholder })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onReset}>
          {intl.formatMessage({ id: M.AppSettingsPluginModalAddButtonCancel })}
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={submitting}>
          {intl.formatMessage({ id: M.AppSettingsPluginModalAddButtonSave })}
        </Button>
      </DialogActions>
    </form>
  )
}

export default FormModalPluginAdd
