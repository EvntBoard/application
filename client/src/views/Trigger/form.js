import React from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty } from 'lodash'
import { FieldArray } from 'react-final-form-arrays'
import { Button, ButtonGroup, Card, Grid, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Input from '../../components/Field/Input'
import TextArea from '../../components/Field/TextArea'
import Ide from '../../components/Field/Ide'
import Select from '../../components/Field/Select'

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
    mutators.push('events', { event: 'click', condition: `module.exports = (triggerId, evntData) => triggerId === evntData.id_trigger` })
  }

  return (
    <form onSubmit={innetOnSubmit} className='relative'>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <h2 className='flex-grow'>{idField.input.value && idField.input.value ? 'Mise a jour d\'un Trigger' : 'Creation d\'un Trigger'}</h2>
        </Grid>
        <Grid container item xs={12}>
          <Field validate={required} name="name" label="Nom" component={Input} placeholder='My trigger' />
        </Grid>
        <Grid container item xs={12}>
          <Field parse={parse} validate={requiredNumber} name="type" label="Trigger" component={Select} options={options} />
        </Grid>
        { typeField.input.value === 4 && (
          <Grid container item xs={12}>
            <Field validate={required} name="locker" label="Locker" component={Input} placeholder='locker' />
          </Grid>
        ) }
        <Grid container item xs={12}>
          <Field name="description" label="Description" component={TextArea} placeholder='Do some obs tricks' />
        </Grid>
        <Grid container item xs={12}>
          <Button onClick={onClickAddEvent}>Add an event</Button>
        </Grid>
        <Grid container item xs={12}>
          <FieldArray name="events">
            {({ fields }) =>
              fields.map((name, index) => (
                <Card key={name} className='mt-4 mb-4' style={{ flexGrow: 1 }}>
                  <Grid container item xs={12}>
                    <Grid container item xs={12}>
                      <span className='flex-grow'>Event #{index + 1}</span>
                      <IconButton variant="contained" color="secondary" onClick={() => fields.remove(index)} ><CloseIcon /></IconButton>
                    </Grid>
                    <Grid container item xs={12}>
                      <Field
                        validate={required}
                        name={`${name}.event`}
                        component={Input}
                        placeholder="click"
                        label="Nom de l'événement"
                      />
                    </Grid>
                    <Grid container item xs={12}>
                      <Field
                        validate={required}
                        label='Condition'
                        name={`${name}.condition`}
                        component={Ide}
                        height={'75px'}
                        placeholder="Condition"
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))
            }
          </FieldArray>
        </Grid>
        <Grid container item xs={12}>
          <Field label='Reaction' validate={required} name="reaction" component={Ide} height={'250px'} placeholder='code ...' />
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup className='floating'>
            <Button onClick={innerOnReset}>
              Cancel
            </Button>
            <Button intent='primary' type="submit" disabled={submitting || pristine}>
              Submit
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  )
}

export default TriggerForm
