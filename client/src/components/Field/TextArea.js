import React from 'react'
import {FormGroup, TextArea} from '@blueprintjs/core'

export default ({ disabled, required, helper, intent, label, placeholder, input, meta: { touched, error }, maxLength }) => {
  return (
    <FormGroup
      disabled={disabled}
      helperText={helper}
      intent={intent}
      label={label}
      labelFor="text-input"
      labelInfo={required && "(required)"}
    >
      <TextArea
        fill
        label={label}
        // isInvalid={touched && error}
        // validationMessage={touched && error ? 'Required' : null}
        placeholder={placeholder}
        maxLength={maxLength}
        {...input}
      />
    </FormGroup>
  )
}
