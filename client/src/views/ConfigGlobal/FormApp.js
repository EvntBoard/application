import React from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import { isNull, isEmpty } from 'lodash'
import { Button, Grid } from '@material-ui/core'

import M from '../../messages/constants'
import InputField from '../../components/Field/Input'

const required = (value) => isNull(value) || isEmpty(value)

const requiredNumber = (value) => isNull(value) || value <= 0

const parse = value => (isNaN(parseInt(value, 10)) ? "" : parseInt(value, 10));

const FormApp = ({ handleSubmit, submitting, pristine, form: { reset } }) => {
  const intl = useIntl()

  const innerOnReset = () => {
    reset()
  }

  const innerOnSubmit = event => {
    handleSubmit(event).then(reset)
  }

  return (
    <form onSubmit={innerOnSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <Field
            validate={required}
            name="host"
            label={intl.formatMessage({ id: M.AppSettingsGlobalHost })}
            component={InputField}
          />
        </Grid>
        <Grid container item xs={12}>
          <Field
            parse={parse}
            validate={requiredNumber}
            name="port"
            label={intl.formatMessage({ id: M.AppSettingsGlobalPort })}
            component={InputField}
            type='number'
          />
        </Grid>
        <Grid container item xs={12}>
          <Field
            name="password"
            label={intl.formatMessage({ id: M.AppSettingsGlobalPassword })}
            component={InputField}
            type='password'
            disabled
          />
        </Grid>
        <Grid container item xs={12} sm={6}>
          <Button style={{ flexGrow: 1 }} onClick={innerOnReset}>
            {intl.formatMessage({ id: M.AppSettingsGlobalButtonCancel })}
          </Button>
        </Grid>
        <Grid container item xs={12} sm={6}>
          <Button style={{ flexGrow: 1 }} variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
            {intl.formatMessage({ id: M.AppSettingsGlobalButtonSave })}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default FormApp
