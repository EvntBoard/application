import React from 'react'
import { TextField, MenuItem } from '@material-ui/core'

export default ({ label, placeholder, input, disabled, required, options }) => {
  return (
    <TextField style={{ flexGrow: 1 }} variant="filled" label={label} disabled={disabled} required={required} placeholder={placeholder} value={input.value} onChange={input.onChange} select>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}
