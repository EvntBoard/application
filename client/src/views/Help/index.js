import React, {useEffect, useState} from 'react'
import { Container } from '@material-ui/core'
import QrCode from 'qrcode.react'

import { webServerOpenApp, webServerGetUrl } from '../../service/webServerService'

const Help = () => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    webServerGetUrl().then(url => setUrl(url))
  }, [])

  const onOpenBoard = () => {
    webServerOpenApp()
  }

  return (
    <Container className="Help">
        <QrCode value={url} />
        <div onClick={onOpenBoard}>Open board app in your default browser</div>
    </Container>
  );
}

export default Help;
