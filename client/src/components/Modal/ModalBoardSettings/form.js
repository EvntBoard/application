import React from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty } from 'lodash'
import { Button, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import InputField from '../../Field/Input'
import TextAreaField from '../../Field/TextArea'

const required = (value) => isNull(value) || isEmpty(value)

const requiredNumber = (value) => isNull(value) || value <= 0

const parse = value => (isNaN(parseInt(value, 10)) ? "" : parseInt(value, 10));

export default ({ handleSubmit, onReset, setOpen, submitting, pristine, form: { reset } }) => {
  const idField = useField('id')

  const onClickClose = () => {
    setOpen(false)
  }

  const innerOnReset = () => {
    reset()
    onReset()
  }

  const innerOnSubmit = event => {
    handleSubmit(event).then(reset)
  }

  return (
    <form onSubmit={innerOnSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <DialogTitle style={{ display: 'flex' }}>
        { idField.input.value && idField.input.value ? ('app.modal.board.form.title_update') : ('app.modal.board.form.title_create')}
        <IconButton onClick={onClickClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        { idField.input.value && (<div className='mb-8'>ID : {idField.input.value}</div>) }
        <Field validate={required} name="name" label={('app.modal.board.form.input.name_label')} component={InputField} placeholder={('app.modal.board.form.input.name_placeholder')} />
        <Field maxLength={255} name="description" label={('app.modal.board.form.input.description_label')} component={TextAreaField} placeholder={('app.modal.board.form.input.description_placeholder')} />
        <Field parse={parse} validate={requiredNumber} name="width" label={('app.modal.board.form.input.width_label')} component={InputField} placeholder={('app.modal.board.form.input.width_placeholder')} type='number' />
        <Field parse={parse} validate={requiredNumber} name="height" label={('app.modal.board.form.input.height_label')} component={InputField} placeholder={('app.modal.board.form.input.height_placeholder')} type='number' />
      </DialogContent>

      <DialogActions>
          <Button onClick={innerOnReset}>
            {('app.modal.board.form.button.reset')}
          </Button>
          <Button type="submit" disabled={submitting || pristine}>
            {('app.modal.board.form.button.submit')}
          </Button>
      </DialogActions>
    </form>
  )
}
