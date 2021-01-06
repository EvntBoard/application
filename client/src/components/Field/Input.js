import React from 'react'
import { TextField } from '@material-ui/core';

const FieldInput = ({ disabled, label, helperText, required, placeholder, input, type }) => {
  return (
    <TextField
      variant="filled"
      label={label}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      value={input.value}
      onChange={input.onChange}
      inputProps={{ type }}
      style={{ flexGrow: 1 }}
      helperText={helperText}
    />
  )
}

export default FieldInput
