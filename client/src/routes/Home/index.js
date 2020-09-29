import React, { useEffect, useState } from 'react'
import { Button, InputGroup } from '@blueprintjs/core'

import { useAppContext } from '../../context'
import Grid from './components/Grid'

import './assets/style.scss'

const App = () => {
  const { setUrl, setPassword, connected, state } = useAppContext()

  const [inputUrl, setInputUrl] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  useEffect(() => {
    window.app.ws.get().then((data) => {
      if (data) {
        if (data.host && data.port) {
          setInputUrl(`http://127.0.0.1:${data.port}`)
        }
        if (data.password) {
          setInputPassword(data.password)
        }
      }
    })
  }, [])

  const onClickConnect = () => {
    setPassword(inputPassword)
    setUrl(inputUrl)
  }

  const onChangeInputUrl = (e) => {
    setInputUrl(e.target.value)
  }

  const onChangeInputPassword = (e) => {
    setInputPassword(e.target.value)
  }

  if (!connected) {
    return (
      <div className='app-content home'>
        <div>
          <InputGroup value={inputUrl} onChange={onChangeInputUrl} />
          <InputGroup value={inputPassword} onChange={onChangeInputPassword} type='password' />
          <Button onClick={onClickConnect}>Connexion</Button>
        </div>
      </div>
    )
  }

  return (
    <div className='app-content home'>
      {state.default_board && <Grid /> }
    </div>
  )
}

export default App
