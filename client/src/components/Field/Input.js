import React from 'react'
import { TextField } from '@material-ui/core';

export default ({ disabled, label, required, placeholder, input, type }) => {
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
    />
  )
}
