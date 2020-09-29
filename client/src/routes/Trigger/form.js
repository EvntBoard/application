import React, { useState } from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty } from 'lodash'
import { FieldArray } from 'react-final-form-arrays'
import {Button, ButtonGroup, Card, Classes, Dialog, Tabs, Tab} from '@blueprintjs/core'

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

export default ({ handleSubmit, onReset, submitting, pristine, form: { reset, mutators } }) => {
  const [open, setOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState('reaction')
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

  const onClickFullMode = () => {
    setOpen(true)
  }

  const onClickCloseFullMode = () => {
    setOpen(false)
  }

  return (
    <form onSubmit={innetOnSubmit} className='relative'>
      <Dialog isOpen={open} onClose={onClickCloseFullMode} style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
        <div className='flex' >
          <div className='flex' style={{ alignItems: 'center', flexGrow: 1 }}>
            <div style={{ cursor: 'pointer'}} className='p-8' onClick={() => setCurrentTab('reaction')}>Reaction</div>
            <FieldArray name="events">
              {({ fields }) => fields.map((name, index) => (
                <div style={{ cursor: 'pointer'}} className='p-8' key={name} onClick={() => setCurrentTab(name)}>{`Condition ${index + 1}`}</div>
              ))}
            </FieldArray>
          </div>
          <Button icon='cross' minimal intent='danger' onClick={onClickCloseFullMode} />
        </div>
        {currentTab === 'reaction' && <Field validate={required} name="reaction" component={Ide} height='calc(100vh - 34px)' placeholder='code ...' />}
        {currentTab && currentTab.startsWith('events') && (
          <>
            <Field
              validate={required}
              name={`${currentTab}.event`}
              component={Input}
              placeholder="click"
              label="Nom de l'événement"
            />
            <Field
              validate={required}
              name={`${currentTab}.condition`}
              component={Ide}
              height='calc(100vh - 102px)'
              placeholder="Condition"
            />
          </>
        )}
      </Dialog>
      <div className='flex'>
        <h2 className='flex-grow'>{idField.input.value && idField.input.value ? 'Mise a jour d\'un Trigger' : 'Creation d\'un Trigger'}</h2>
        <Button minimal icon='export' onClick={onClickFullMode} />
      </div>
      <Field validate={required} name="name" label="Nom" component={Input} placeholder='My trigger' />
      <Field parse={parse} validate={requiredNumber} name="type" label="Trigger" component={Select} options={options} />
      { typeField.input.value === 4 && <Field validate={required} name="locker" label="Locker" component={Input} placeholder='locker' /> }
      <Field name="description" label="Description" component={TextArea} placeholder='Do some obs tricks' />
      <div><Button onClick={onClickAddEvent}>Add an event</Button></div>
      <FieldArray name="events">
        {({ fields }) =>
          fields.map((name, index) => (
            <Card key={name} className='mt-4 mb-4'>
              <div className='flex'>
                <span className='flex-grow'>Event #{index + 1}</span>
                <Button minimal intent='danger' icon='cross' onClick={() => fields.remove(index)} />
              </div>
              <Field
                validate={required}
                name={`${name}.event`}
                component={Input}
                placeholder="click"
                label="Nom de l'événement"
              />
              <Field
                validate={required}
                label='Condition'
                name={`${name}.condition`}
                component={Ide}
                height={'75px'}
                placeholder="Condition"
              />
            </Card>
          ))
        }
      </FieldArray>
      <div className='flex'>
        <div className='flex-grow'>Reaction</div>
      </div>
      <Field validate={required} name="reaction" label="" component={Ide} height={'250px'} placeholder='code ...' />
      <ButtonGroup className='floating'>
        <Button onClick={innerOnReset}>
          Cancel
        </Button>
        <Button intent='primary' type="submit" disabled={submitting || pristine}>
          Submit
        </Button>
      </ButtonGroup>
    </form>
  )
}
