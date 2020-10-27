import React, { useState, useEffect, useMemo } from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty, isString } from 'lodash'
import { Button, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import { triggerFindAll } from '../../../service/triggerService'
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
    triggerFindAll().then((data) => {
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
      <DialogTitle style={{ display: 'flex' }}>
        {idField.input.value && idField.input.value ? ('app.modal.button.form.title_update') : ('app.modal.button.form.title_create')}
        <IconButton onClick={onClickClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        { idField.input.value && (<div className='mb-8'>ID : { idField.input.value }</div>) }
        <Field name="text" label={('app.modal.button.form.text_label')} component={TextArea} placeholder={('app.modal.button.form.text_placeholder')} />
        <Field validate={required} name="color" label={('app.modal.button.form.color_label')} component={ColorPicker} />
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexGrow: 1, flexDirection: "column" }}>
            <Field name="image" label={('app.modal.button.form.image_internal_label')} component={FilePicker} acceptedFormat={acceptedFormat} />
            <Field name="image" label={('app.modal.button.form.image_external_label')} component={Input} />
          </div>
          <div style={{ flexShrink: 0 }} className='m-8'>
            { imageUrl && (<img src={imageUrl} height={150} alt='button-2' />) }
          </div>
        </div>
        <Field name="id_trigger" label={('app.modal.button.form.trigger_label')} component={Select} options={options} />
      </DialogContent>

      <DialogActions>
        <Button onClick={innerOnReset}>
          {('app.modal.button.form.button.reset')}
        </Button>
        <Button type="submit" disabled={submitting || pristine}>
          {('app.modal.button.form.button.submit')}
        </Button>
      </DialogActions>
    </form>
  )
}
