import React, {useCallback, useEffect, useState} from 'react'
import {Button, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Grid} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { useIntl } from 'react-intl'
import { isNull, isEmpty, debounce } from 'lodash'
import { Field, useField } from 'react-final-form'

import M from "../../../messages/constants";
import InputField from '../../../components/Field/Input'
import Select from '../../../components/Field/Select'
import { pluginManagerPreload } from '../../../service/pluginManagerService'
import FieldFormJSON from '../FieldFormJSON'

const required = (value) => isNull(value) || isEmpty(value)

const options = [
  {
    label: 'NPM',
    value: 'npm'
  },
  {
    label: 'GitHub',
    value: 'github'
  },
  {
    label: 'Path',
    value: 'path'
  },
]

const FormModalPluginAdd = ({ handleSubmit, onReset, setOpen, submitting }) => {
  const intl = useIntl()
  const [loadingSchema, setLoadingSchema] = useState(false)
  const [error, setError] = useState(null)
  const [schema, setSchema] = useState(null)
  const typeField = useField('type')
  const pluginField = useField('name')

  const typeFieldValue = typeField?.input?.value
  const pluginFieldValue = pluginField?.input?.value

  useEffect(() => {
    preloadPlugin(typeFieldValue, pluginFieldValue)
  }, [typeFieldValue, pluginFieldValue])

  const preloadPlugin = useCallback(
    debounce((type, name) => {
      if (type && name) {
        setError(null)
        setLoadingSchema(true)
        pluginManagerPreload({ type, name })
        .then((data) => {
          setError(null)
          setSchema(data)
          setLoadingSchema(false)
        }).catch(e => {
          setError(e)
          setSchema(null)
          setLoadingSchema(false)
        })
      }
    }, 800),
    []
  );

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
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Field name="type" label={intl.formatMessage({ id: M.AppTriggerTypeLabel })} component={Select} options={options} />
          </Grid>
          <Grid container item xs={12}>
            <Field
              validate={required}
              name="name"
              label={intl.formatMessage({ id: M.AppSettingsPluginModalAddRepoLabel })}
              component={InputField}
              placeholder={intl.formatMessage({ id: M.AppSettingsPluginModalAddRepoPlaceholder })}
            />
          </Grid>
        </Grid>
        {
          error && (
            <div>
              {error?.message}
            </div>
          )
        }
        {
          loadingSchema && (
            <div>
              Chargement en cours
            </div>
          )
        }
        <Field name='params' required component={FieldFormJSON} schema={schema} />
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
