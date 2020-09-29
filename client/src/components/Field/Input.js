import React from 'react'
import { InputGroup, FormGroup } from '@blueprintjs/core'

export default ({ intent, disabled, label, required, placeholder, input, type, helper, meta: { touched, error } }) => {
  return (
    <FormGroup
      disabled={disabled}
      helperText={helper}
      intent={intent}
      label={label}
      labelFor="text-input"
      labelInfo={required && "(required)"}
    >
      <InputGroup
        type={type}
        label={label}
        placeholder={placeholder}
        // isInvalid={touched && error}
        // validationMessage={touched && error ? 'Required' : null}
        {...input}
      />
    </FormGroup>

  )
}
