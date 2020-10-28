import React from 'react'
import { Field, useField } from 'react-final-form'
import { useIntl } from 'react-intl'
import { isNull, isEmpty } from 'lodash'
import { Button, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import M from '../../../context/lang/messages/constants'
import InputField from '../../Field/Input'
import TextAreaField from '../../Field/TextArea'

const required = (value) => isNull(value) || isEmpty(value)

const requiredNumber = (value) => isNull(value) || value <= 0

const parse = value => (isNaN(parseInt(value, 10)) ? "" : parseInt(value, 10));

export default ({ handleSubmit, onReset, setOpen, submitting, pristine, form: { reset } }) => {
  const intl = useIntl()
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
        { idField.input.value && idField.input.value ? intl.formatMessage({ id: M.ModalBoardSettingsUpdate }) : intl.formatMessage({ id: M.ModalBoardSettingsCreate })}
        <IconButton onClick={onClickClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        { idField.input.value && (<div className='mb-8'>ID : {idField.input.value}</div>) }
        <Field
          validate={required}
          name="name"
          label={intl.formatMessage({ id: M.ModalBoardSettingsNameLabel })}
          component={InputField}
          placeholder={intl.formatMessage({ id: M.ModalBoardSettingsNamePlaceholder })}
        />
        <Field
          maxLength={255}
          name="description"
          label={intl.formatMessage({ id: M.ModalBoardSettingsDescriptionLabel })}
          component={TextAreaField}
          placeholder={intl.formatMessage({ id: M.ModalBoardSettingsDescriptionPlaceholder })}
        />
        <Field
          parse={parse}
          validate={requiredNumber}
          name="width"
          label={intl.formatMessage({ id: M.ModalBoardSettingsWidthLabel })}
          component={InputField}
          placeholder={intl.formatMessage({ id: M.ModalBoardSettingsWidthPlaceholder })}
          type='number'
        />
        <Field
          parse={parse}
          validate={requiredNumber}
          name="height"
          label={intl.formatMessage({ id: M.ModalBoardSettingsHeightLabel })}
          component={InputField}
          placeholder={intl.formatMessage({ id: M.ModalBoardSettingsHeightPlaceholder })}
          type='number'
        />
        <Field
          name="color"
          label={intl.formatMessage({ id: M.ModalBoardSettingsColorLabel })}
          component={InputField}
          placeholder={intl.formatMessage({ id: M.ModalBoardSettingsColorPlaceholder })}
        />
        <Field
          name="image"
          label={intl.formatMessage({ id: M.ModalBoardSettingsImageLabel })}
          component={InputField}
          placeholder={intl.formatMessage({ id: M.ModalBoardSettingsImagePlaceholder })}
        />
      </DialogContent>

      <DialogActions>
          <Button onClick={innerOnReset}>
            {intl.formatMessage({ id: M.ModalBoardSettingsButtonCancel })}
          </Button>
          <Button type="submit" disabled={submitting || pristine}>
            {intl.formatMessage({ id: M.ModalBoardSettingsButtonSave })}
          </Button>
      </DialogActions>
    </form>
  )
}
