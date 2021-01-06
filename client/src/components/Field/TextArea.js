import React from 'react'
import TextField from '@material-ui/core/TextField'

const FieldTextArea = ({ disabled, required, label, placeholder, helperText, input }) => {
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
      helperText={helperText}
      multiline
    />
  )
}

export default FieldTextArea
