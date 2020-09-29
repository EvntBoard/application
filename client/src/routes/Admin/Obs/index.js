import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import {Button, Tag} from "@blueprintjs/core"

import FormObs from './form'
import { useInterval } from '../../../utils/hooks'
import intl from "react-intl-universal"

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [obs, setObs] = useState([])

  useEffect(() => {
    setIsLoading(true)
    window.app.obs.get().then((data) => {
      setObs(data)
      setIsLoading(false)
    })
  }, [])

  useInterval(() => {
    window.app.obs.get().then((data) => {
      setObs(data)
    })
  }, 5000)

  if (isLoading) {
    return null
  }

  const onSubmit = (data) => {
    setIsLoading(true)
    window.app.obs.set(data).then((data2) => {
      setObs(data2)
      setIsLoading(false)
    })
  }

  return (
    <div>
      <div className='flex'>
        <h1 className='flex-grow'>{intl.get('app.admin.obs.title')}</h1>
        <Button minimal icon='refresh' onClick={() => window.app.obs.reload()} />
      </div>
      <div className='mb-4'>
        <Tag intent={obs && obs.status ? 'success' : 'danger'}>{ obs && obs.status ? intl.get('app.admin.obs.connected') : intl.get('app.admin.obs.disconnected') }</Tag>
      </div>
      <Form
        initialValues={{
          host: '',
          port: '',
          password: '',
          ...obs
        }}
        onSubmit={onSubmit}
        component={FormObs}
      />
    </div>
  )
}
