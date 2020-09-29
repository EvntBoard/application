import React from 'react'
import { Field } from 'react-final-form'
import { isNull, isEmpty } from 'lodash'
import { Button, ButtonGroup } from '@blueprintjs/core'
import intl from 'react-intl-universal'

import InputField from '../../../components/Field/Input'

const required = (value) => isNull(value) || isEmpty(value)

export default ({ handleSubmit, submitting, pristine, form }) => {
  const onReset = () => {
    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <Field validate={required} name="host" label={intl.get('app.admin.obs.form.host_label')} component={InputField} placeholder={intl.get('app.admin.obs.form.host_placeholder')} />
      <Field validate={required} name="port" label={intl.get('app.admin.obs.form.port_label')} component={InputField} placeholder={intl.get('app.admin.obs.form.port_placeholder')} type='number' />
      <Field name="password" label={intl.get('app.admin.obs.form.password_label')} component={InputField} placeholder={intl.get('app.admin.obs.form.password_placeholder')} type='password' />
      <ButtonGroup>
        <Button onClick={onReset} disabled={pristine}>
          {intl.get('app.admin.server.form.button.reset')}
        </Button>
        <Button intent='primary' type="submit" disabled={submitting || pristine}>
          {intl.get('app.admin.server.form.button.submit')}
        </Button>
      </ButtonGroup>
    </form>
  )
}
