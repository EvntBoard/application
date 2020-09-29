import React, { createContext, useEffect, useRef, useState } from 'react'
import { filter } from 'lodash'
import socketIo from 'socket.io-client'

const AppContext = createContext(undefined)

const Provider = ({children}) => {
  const [state, setState] = useState({})
  const stateRef = useRef();
  const [url, setUrl] = useState(null)
  const [password, setPassword] = useState(null)
  const [io, setIO] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    stateRef.current = state

    const body = document.body
    if (state.dark) {
      body.classList.add('bp3-dark')
    } else {
      body.classList.remove('bp3-dark')
    }
  }, [state])

  useEffect(() => {
    if (url) {
      if (io) io.disconnect()
      const socket = socketIo(url)

      socket.on('connect', () => {
        setConnected(true)
        console.log(`connect socket...`)
      })

      socket.on('connect_error', () => {
        setConnected(false)
        setUrl(null)
        socket.disconnect()
        setIO(null)
        setState({})
        console.log(`connect_error socket...`)
      })

      socket.on('connect_timeout', () => {
        setConnected(false)
        setUrl(null)
        socket.disconnect()
        setIO(null)
        setState({})
        console.log(`connect_timeout socket...`)
      })

      socket.on('error', () => {
        setConnected(false)
        setUrl(null)
        socket.disconnect()
        setIO(null)
        setState({})
        console.log(`Error Connecting socket...`)
      })

      socket.on('disconnect', () => {
        setConnected(false)
        setUrl(null)
        socket.disconnect()
        setIO(null)
        setState({})
        console.log(`Error Connecting socket...`)
      })

      socket.on('init', (data) => {
        setState(data)
      })

      socket.on('sync', (data, type) => {
        let newState = {...stateRef.current}
        switch (type) {
          case 'delete-board':
            newState.boards = filter(newState.boards, (i) => i.id !== data.id)
            newState.buttons = filter(newState.buttons, (i) => i.id_board !== data.id)
            break
          case 'delete-button':
            newState.buttons = filter(newState.buttons, (i) => i.id !== data.id)
            break
          default:
            newState = {
              ...newState,
              ...data,
            }
            break
        }
        setState(newState)
      })

      socket.on('reset', () => {
        setState({})
        setIO(null)
      })

      setIO(socket)
    }
  }, [url])

  useEffect(() => {
    if (connected) {
      emit('init', password)
    }
  }, [connected])

  const emit = (channel, data) => {
    if (!io) return true
    io.emit(channel, data)
  }

  return (
    <AppContext.Provider value={{
      connected,
      url,
      setUrl,
      password,
      setPassword,
      emit,
      state
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a DispatchContext')
  }
  return context
}

export default Provider

