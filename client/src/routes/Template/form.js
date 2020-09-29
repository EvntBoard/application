import React from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty } from 'lodash'
import { Button, ButtonGroup } from '@blueprintjs/core'

import Input from '../../components/Field/Input'
import TextArea from '../../components/Field/TextArea'
import Ide from '../../components/Field/Ide'
import intl from "react-intl-universal"

const required = (value) => isNull(value) || isEmpty(value)

export default ({ handleSubmit, form: { reset }, onReset, onDelete, submitting, pristine }) => {
  const idField = useField('id')

  const innerOnDelete = () => {
    onDelete({ id: idField.input.value })
  }

  const innerOnReset = () => {
    reset()
    onReset()
  }

  const innetOnSubmit = event => {
    handleSubmit(event).then(reset)
  }

  return (
    <form onSubmit={innetOnSubmit} className='relative'>
      <h2>{idField.input.value && idField.input.value ? intl.get('app.template.form.title_update') : intl.get('app.template.form.title_create')}</h2>
      <Field validate={required} name="name" label={intl.get('app.template.form.input.name_label')} component={Input} placeholder={intl.get('app.template.form.input.name_placeholder')} />
      <Field name="description" label={intl.get('app.template.form.input.description_label')} component={TextArea} placeholder={intl.get('app.template.form.input.description_placeholder')} />
      <Field
        name='event'
        component={Input}
        placeholder={intl.get('app.template.form.input.event_placeholder')}
        label={intl.get('app.template.form.input.event_label')}
      />
      <Field
        label={intl.get('app.template.form.input.condition_label')}
        name='condition'
        component={Ide}
        height={'150px'}
        placeholder={intl.get('app.template.form.input.condition_placeholder')}
      />
      <ButtonGroup className='floating'>
        {idField.input.value && idField.input.value ? (
          <Button intent='danger' onClick={innerOnDelete}>
            {intl.get('app.template.form.button.delete')}
          </Button>
        ) : null}
        <Button onClick={innerOnReset}>
          {intl.get('app.template.form.button.reset')}
        </Button>
        <Button intent='primary' type="submit" disabled={submitting || pristine}>
          {intl.get('app.template.form.button.submit')}
        </Button>
      </ButtonGroup>
    </form>
  )
}
