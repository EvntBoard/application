import React, { useState, useEffect, useMemo } from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty, isString } from 'lodash'
import { Button, Classes } from '@blueprintjs/core'
import intl from 'react-intl-universal'

import TextArea from '../../Field/TextArea'
import ColorPicker from '../../Field/ColorPicker'
import FilePicker from '../../Field/FilePicker'
import Select from '../../Field/Select'
import Input from '../../Field/Input'

const required = (value) => isNull(value) || isEmpty(value)

const acceptedFormat = ["image/apng", "image/bmp", "image/gif", "image/x-icon", "image/jpeg", "image/svg+xml", "image/tiff", "image/webp"]

export default ({ handleSubmit, onReset, setOpen, submitting, pristine, form: { reset } }) => {
  const [triggers, setTriggers] = useState([])
  const [loading, setLoading] = useState(false)

  const idField = useField('id')
  const imageField = useField('image')

  useEffect(() => {
    setLoading(true)
    window.app.trigger.read().then((data) => {
      setTriggers(data)
      setLoading(false)
    })
  },  [])

  const options = useMemo(() => triggers.map(i => ({ label: i.name, value: i.id })), [triggers])

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

  const imageUrl = useMemo(() => {
    if (isString(imageField.input.value) && imageField.input.value.startsWith('http') && imageField.input.value.startsWith('workspace')) {
      return imageField.input.value
    }
    return null
  }, [imageField.input.value])

  if (loading) {
    return null
  }

  return (
    <form onSubmit={innerOnSubmit}>
      <div className={Classes.DIALOG_HEADER} style={{ display: 'flex' }}>
        <h3 style={{ flexGrow: 1 }} className="bp3-heading">{idField.input.value && idField.input.value ? intl.get('app.modal.button.form.title_update') : intl.get('app.modal.button.form.title_create')}</h3>
        <Button icon='cross' minimal onClick={onClickClose} />
      </div>

      <div className={Classes.DIALOG_BODY}>
        { idField.input.value && (<div className='mb-8'>ID : { idField.input.value }</div>) }
        <Field name="text" label={intl.get('app.modal.button.form.text_label')} component={TextArea} placeholder={intl.get('app.modal.button.form.text_placeholder')} />
        <Field validate={required} name="color" label={intl.get('app.modal.button.form.color_label')} component={ColorPicker} />
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexGrow: 1, flexDirection: "column" }}>
            <Field name="image" label={intl.get('app.modal.button.form.image_internal_label')} component={FilePicker} acceptedFormat={acceptedFormat} />
            <Field name="image" label={intl.get('app.modal.button.form.image_external_label')} component={Input} />
          </div>
          <div style={{ flexShrink: 0 }} className='m-8'>
            { imageUrl && (<img src={imageUrl} height={150} alt='button-2' />) }
          </div>
        </div>
        <Field name="id_trigger" label={intl.get('app.modal.button.form.trigger_label')} component={Select} options={options} />
      </div>

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={innerOnReset}>
            {intl.get('app.modal.button.form.button.reset')}
          </Button>
          <Button type="submit" disabled={submitting || pristine}>
            {intl.get('app.modal.button.form.button.submit')}
          </Button>
        </div>
      </div>
    </form>
  )
}
