import React from 'react'
import TextField from '@material-ui/core/TextField'

export default ({ disabled, required, label, placeholder, input }) => {
  return (
    <TextField
      variant="filled"
      rows={4}
      style={{ flexGrow: 1 }}
      label={label}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      value={input.value}
      onChange={input.onChange}
      multiline
    />
  )
}
