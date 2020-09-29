import React from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty } from 'lodash'
import { Button, Classes } from '@blueprintjs/core'
import intl from 'react-intl-universal'

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
    <form onSubmit={innerOnSubmit}>
      <div className={Classes.DIALOG_HEADER} style={{ display: 'flex' }}>
        <h3 style={{ flexGrow: 1 }} className="bp3-heading">{ idField.input.value && idField.input.value ? intl.get('app.modal.board.form.title_update') : intl.get('app.modal.board.form.title_create')}</h3>
        <Button icon='cross' minimal onClick={onClickClose} />
      </div>

      <div className={Classes.DIALOG_BODY}>
        { idField.input.value && (<div className='mb-8'>ID : {idField.input.value}</div>) }
        <Field validate={required} name="name" label={intl.get('app.modal.board.form.input.name_label')} component={InputField} placeholder={intl.get('app.modal.board.form.input.name_placeholder')} />
        <Field maxLength={255} name="description" label={intl.get('app.modal.board.form.input.description_label')} component={TextAreaField} placeholder={intl.get('app.modal.board.form.input.description_placeholder')} />
        <Field parse={parse} validate={requiredNumber} name="width" label={intl.get('app.modal.board.form.input.width_label')} component={InputField} placeholder={intl.get('app.modal.board.form.input.width_placeholder')} type='number' />
        <Field parse={parse} validate={requiredNumber} name="height" label={intl.get('app.modal.board.form.input.height_label')} component={InputField} placeholder={intl.get('app.modal.board.form.input.height_placeholder')} type='number' />
      </div>

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={innerOnReset}>
            {intl.get('app.modal.board.form.button.reset')}
          </Button>
          <Button type="submit" disabled={submitting || pristine}>
            {intl.get('app.modal.board.form.button.submit')}
          </Button>
        </div>
      </div>
    </form>
  )
}
