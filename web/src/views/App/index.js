import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Container, Typography } from '@material-ui/core'
import { wsConnect, wsSend } from '../../store/websocket'

const App = () => {
  const dispatch = useDispatch()
  const connected = useSelector(state => state.websocket.connected)
  const loading = useSelector(state => state.websocket.loading)

  useEffect(() => {
    dispatch(wsConnect({ url: 'ws://localhost:5123' }))
  }, [])

  useEffect(() => {
    if (connected && !loading) {
      dispatch(wsSend({ couou: Math.random() }))
    }
  }, [connected, loading])

  return (
    <Container className="App">
      <Typography>azeea</Typography>
    </Container>
  );
}

export default App;
