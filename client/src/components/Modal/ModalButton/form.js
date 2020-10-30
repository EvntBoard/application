import React, { useState, useEffect, useMemo } from 'react'
import { Field, useField } from 'react-final-form'
import { isNull, isEmpty, isString } from 'lodash'
import { useIntl } from 'react-intl'
import {Button, DialogTitle, DialogContent, DialogActions, IconButton, Grid, Typography} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import M from '../../../context/lang/messages/constants'
import { triggerFindAll } from '../../../service/triggerService'
import TextArea from '../../Field/TextArea'
import ColorPicker from '../../Field/ColorPicker'
import FilePicker from '../../Field/FilePicker'
import Select from '../../Field/Select'
import Input from '../../Field/Input'

const required = (value) => isNull(value) || isEmpty(value)

const acceptedFormat = ["image/apng", "image/bmp", "image/gif", "image/x-icon", "image/jpeg", "image/svg+xml", "image/tiff", "image/webp"]

const FormModalButton = ({ handleSubmit, onReset, setOpen, submitting, pristine, form: { reset } }) => {
  const intl = useIntl()
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
    if (isString(imageField.input.value) && (imageField.input.value.startsWith('http') || imageField.input.value.startsWith('workspace'))) {
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
        {idField.input.value && idField.input.value ? intl.formatMessage({ id: M.ModalButtonUpdate }) : intl.formatMessage({ id: M.ModalButtonCreate })}
        <IconButton onClick={onClickClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        { idField.input.value && (<Typography>ID : { idField.input.value }</Typography>) }
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Field
              name="text"
              label={intl.formatMessage({ id: M.ModalButtonTextLabel })}
              component={TextArea}
              placeholder={intl.formatMessage({ id: M.ModalButtonTextPlaceholder })}
            />
          </Grid>
          <Grid container item xs={12}>
            <Field
              validate={required}
              name="color"
              label={intl.formatMessage({ id: M.ModalButtonColorLabel })}
              component={ColorPicker}
            />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={6}>
              <Field
                name="image"
                label={intl.formatMessage({ id: M.ModalButtonImageInternalLabel })}
                component={FilePicker}
                acceptedFormat={acceptedFormat}
              />
            </Grid>
            <Grid item container xs={12} sm={6}>
              <Field
                name="image"
                label={intl.formatMessage({ id: M.ModalButtonImageExternalLabel })}
                component={Input}
              />
            </Grid>
            <Grid item xs={12}>
              { imageUrl && (<img src={imageUrl} height={150} alt='button-2' />) }
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Field
              name="idTrigger"
              label={intl.formatMessage({ id: M.ModalButtonTriggerLabel })}
              component={Select}
              options={options}
            />
          </Grid>
        </Grid>
        </DialogContent>

      <DialogActions>
        <Button onClick={innerOnReset}>
          {intl.formatMessage({ id: M.ModalButtonButtonCancel })}
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={submitting || pristine}>
          {intl.formatMessage({ id: M.ModalButtonButtonSave })}
        </Button>
      </DialogActions>
    </form>
  )
}

export default FormModalButton
