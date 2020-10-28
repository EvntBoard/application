import React from 'react'
import { Input } from '@material-ui/core';

export default ({ disabled, label, required, placeholder, input, type }) => {
  return (
    <Input label={label} disabled={disabled} required={required} placeholder={placeholder} value={input.value} onChange={input.onChange} type={type} />
  )
}
