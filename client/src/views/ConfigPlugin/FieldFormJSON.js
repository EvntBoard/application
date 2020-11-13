import Form from '@rjsf/material-ui'
import React from 'react'

export default ({ input, schema }) => {
  if (!schema) return null

  return (
    <Form
      formData={input.value}
      onChange={({ formData }) => { input.onChange(formData) }}
      tagName='div'
      schema={schema.schema}
    >
      &nbsp;
    </Form>
  )
}
