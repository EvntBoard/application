import React from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty } from 'lodash'
import { FieldArray } from 'react-final-form-arrays'
import { useIntl } from 'react-intl'
import { Button, ButtonGroup, Card, Grid, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Input from '../../components/Field/Input'
import TextArea from '../../components/Field/TextArea'
import Ide from '../../components/Field/Ide'
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
]

const parse = value => (isNaN(parseInt(value, 10)) ? "" : parseInt(value, 10));

const TriggerForm = ({ handleSubmit, onReset, submitting, pristine, form: { reset, mutators } }) => {
  const intl = useIntl()
  const idField = useField('id')
  const typeField = useField('type')

  const innerOnReset = () => {
      reset()
      onReset()
  }

  const innetOnSubmit = event => {
      handleSubmit(event).then(reset)
  }

  const onClickAddEvent = () => {
    mutators.push('events', { event: 'click', condition: `module.exports = (idTrigger, evntData) => idTrigger === evntData.idTrigger` })
  }

  return (
    <form onSubmit={innetOnSubmit} className='relative'>
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
        { typeField.input.value === 4 && (
          <Grid container item xs={12}>
            <Field validate={required} name="locker" label={intl.formatMessage({ id: M.AppTriggerLockerLabel })} component={Input} placeholder={intl.formatMessage({ id: M.AppTriggerLockerPlaceholder })} />
          </Grid>
        ) }
        <Grid container item xs={12}>
          <Field name="description" label={intl.formatMessage({ id: M.AppTriggerDescriptionLabel })} component={TextArea} placeholder={intl.formatMessage({ id: M.AppTriggerDescriptionPlaceholder })} />
        </Grid>
        <Grid container item xs={12}>
          <Button onClick={onClickAddEvent}>{intl.formatMessage({ id: M.AppTriggerButtonAddEvent })}</Button>
        </Grid>
        <Grid container item xs={12}>
          <FieldArray name="events">
            {({ fields }) =>
              fields.map((name, index) => (
                <Card key={name} className='mt-4 mb-4' style={{ flexGrow: 1 }}>
                  <Grid container item xs={12}>
                    <Grid container item xs={12}>
                      <span className='flex-grow'>{intl.formatMessage({ id: M.AppTriggerEvent })} #{index + 1}</span>
                      <IconButton variant="contained" color="secondary" onClick={() => fields.remove(index)} ><CloseIcon /></IconButton>
                    </Grid>
                    <Grid container item xs={12}>
                      <Field
                        validate={required}
                        name={`${name}.event`}
                        component={Input}
                        placeholder={intl.formatMessage({ id: M.AppTriggerEventPlaceholder })}
                        label={intl.formatMessage({ id: M.AppTriggerEventLabel })}
                      />
                    </Grid>
                    <Grid container item xs={12}>
                      <Field
                        validate={required}
                        label={intl.formatMessage({ id: M.AppTriggerConditionLabel })}
                        name={`${name}.condition`}
                        component={Ide}
                        height={'75px'}
                        placeholder={intl.formatMessage({ id: M.AppTriggerConditionPlaceholder })}
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))
            }
          </FieldArray>
        </Grid>
        <Grid container item xs={12}>
          <Field label={intl.formatMessage({ id: M.AppTriggerReactionLabel })} validate={required} name="reaction" component={Ide} height={'250px'} placeholder={intl.formatMessage({ id: M.AppTriggerReactionPlaceholder })} />
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
