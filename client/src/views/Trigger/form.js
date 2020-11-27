import React from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty } from 'lodash'
import { useIntl } from 'react-intl'
import { Button, ButtonGroup, Grid } from '@material-ui/core'

import Input from '../../components/Field/Input'
import TextArea from '../../components/Field/TextArea'
import Select from '../../components/Field/Select'
import M from '../../messages/constants'

const required = (value) => isNull(value) || isEmpty(value)
const requiredNumber = (value) => isNull(value) || value <= 0

const options = [
  {
    label: 'Classic',
    value: 1
  },
  {
    label: 'Throttle',
    value: 2
  },
  {
    label: 'Queue',
    value: 3
  },
  {
    label: 'Queue Lock',
    value: 4
  },
  {
    label: 'Throttle Lock',
    value: 5
  },
]

const parse = value => (isNaN(parseInt(value, 10)) ? "" : parseInt(value, 10));

const TriggerForm = ({ handleSubmit, onReset, onEditFile, submitting, pristine, form: { reset } }) => {
  const intl = useIntl()
  const idField = useField('id')
  const typeField = useField('type')

  const innerOnReset = () => {
      reset()
      onReset()
  }

  const innerOnSubmit = event => {
      handleSubmit(event).then(reset)
  }

  const innerOnEditFile = () => {
    onEditFile({ id: idField.input.value })
  }

  return (
    <form onSubmit={innerOnSubmit} className='relative'>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <h2 className='flex-grow'>{idField.input.value && idField.input.value ? intl.formatMessage({ id: M.AppTriggerUpdate }) : intl.formatMessage({ id: M.AppTriggerCreate })}</h2>
        </Grid>
        <Grid container item xs={12}>
          <Field validate={required} name="name" label={intl.formatMessage({ id: M.AppTriggerNameLabel })} component={Input} placeholder={intl.formatMessage({ id: M.AppTriggerNamePlaceholder })} />
        </Grid>
        <Grid container item xs={12}>
          <Field parse={parse} validate={requiredNumber} name="type" label={intl.formatMessage({ id: M.AppTriggerTypeLabel })} component={Select} options={options} />
        </Grid>
        { typeField.input.value >= 4 && (
          <Grid container item xs={12}>
            <Field validate={required} name="locker" label={intl.formatMessage({ id: M.AppTriggerLockerLabel })} component={Input} placeholder={intl.formatMessage({ id: M.AppTriggerLockerPlaceholder })} />
          </Grid>
        ) }
        <Grid container item xs={12}>
          <Field name="description" label={intl.formatMessage({ id: M.AppTriggerDescriptionLabel })} component={TextArea} placeholder={intl.formatMessage({ id: M.AppTriggerDescriptionPlaceholder })} />
        </Grid>
        <Grid container item xs={12}>
          <Button variant='contained' onClick={innerOnEditFile}>{intl.formatMessage({ id: M.AppTriggerButtonEditFile })}</Button>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup className='floating'>
            <Button onClick={innerOnReset}>
              {intl.formatMessage({ id: M.AppTriggerButtonCancel })}
            </Button>
            <Button intent='primary' type="submit" disabled={submitting || pristine}>
              {intl.formatMessage({ id: M.AppTriggerButtonSave })}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  )
}

export default TriggerForm
