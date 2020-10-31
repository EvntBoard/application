import React, {useEffect, useState} from 'react'
import { Container } from '@material-ui/core'
import QrCode from 'qrcode.react'

import {webServerOpenApp, webServerGetUrl} from '../../service/webServerService'

const App = () => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    webServerGetUrl().then(url => setUrl(url))
  }, [])

  const onOpenBoard = () => {
    webServerOpenApp()
  }

  return (
    <Container className="App">
      <div>
        <QrCode value={url} />
      </div>
      <a target='_blank' href={url}>Open board app there</a>
      <div onClick={onOpenBoard}>Open board app in your default browser</div>
    </Container>
  );
}

export default App;
