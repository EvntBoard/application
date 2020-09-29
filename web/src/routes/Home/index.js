import React, { useState } from 'react'
import { Button, InputGroup } from "@blueprintjs/core"

import { useAppContext } from '../../context'
import Grid from './components/Grid'

import './assets/style.scss'

const App = () => {
  const { setUrl, setPassword, connected, state } = useAppContext()

  const [inputUrl, setInputUrl] = useState(window.location.host)
  const [inputPassword, setInputPassword] = useState('')

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
        <div className='waza'>
          <h1>EvntBoard</h1>
          <InputGroup placeholder='IP' className='m-8' value={inputUrl} onChange={onChangeInputUrl} />
          <InputGroup placeholder='password' className='m-8' value={inputPassword} onChange={onChangeInputPassword} type='password' />
          <div className='m-8'>
            <Button fill intent='primary' onClick={onClickConnect}>Connexion</Button>
          </div>
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
