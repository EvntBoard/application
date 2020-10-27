import React from 'react'
import TextField from '@material-ui/core/TextField';

export default ({ disabled, label, required, placeholder, input }) => {
  return (
    <TextField label={label} disabled={disabled} required={required} placeholder={placeholder} value={input.value} onChange={input.onChange} />
  )
}
