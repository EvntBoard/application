import Form from '@rjsf/material-ui'
import React, {useEffect, useState} from 'react'

export default ({ input, schema }) => {
  const [state, setState] = useState({})

  useEffect(() => {
    input.onChange(state)
  }, [state])

  if (!schema) return null

  return (
    <Form
      formData={state}
      onChange={({ formData }) => { setState(formData) }}
      tagName='div'
      schema={schema.schema}
    >
      &nbsp;
    </Form>
  )
}
