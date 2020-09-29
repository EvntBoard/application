import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { Tag } from '@blueprintjs/core'
import intl from 'react-intl-universal'

import FormObs from './form'
import { useInterval } from '../../../utils/hooks'

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [ws, setWs] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    window.app.ws.get().then((data) => {
      setWs(data)
      setIsLoading(false)
    })
  }, [])

  useInterval(() => {
    window.app.ws.get().then((data) => {
      setWs(data)
    })
  }, 5000)

  if (isLoading) {
    return null
  }

  const onSubmit = (data) => {
    setIsLoading(true)
    window.app.ws.set(data).then((data2) => {
      setWs(data2)
      setIsLoading(false)
    })
  }

  return (
    <div>
      <h1>{intl.get('app.admin.server.title')}</h1>
      <div className='mb-4'>
        <Tag intent={ws && ws.status ? 'success' : 'danger'}>{ ws && ws.status ? intl.get('app.admin.server.connected') : intl.get('app.admin.server.disconnected') }</Tag>
      </div>
      <Form
        initialValues={{
          host: '',
          port: '',
          password: '',
          ...ws
        }}
        onSubmit={onSubmit}
        component={FormObs}
      />
    </div>
  )
}
