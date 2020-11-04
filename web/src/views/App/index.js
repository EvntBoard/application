import React, {useEffect} from 'react'
import { Container } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { wsConnect } from '../../store/websocket'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsConnect({ url: 'ws://localhost:5123/ws' }))
  }, [dispatch])

  return (
    <Container className="App">
      aze
    </Container>
  );
}

export default App;
