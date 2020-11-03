import { createAction, createReducer } from '@reduxjs/toolkit'

const PATH = 'WEBSOCKET'

export const wsConnect = createAction(`${PATH}_CONNECT`)
export const wsDisconnect = createAction(`${PATH}_DISCONNECT`)
export const wsSend = createAction(`${PATH}_SEND`)
export const wsOnOpen = createAction(`${PATH}_ON_OPEN`)
export const wsOnError = createAction(`${PATH}_ON_ERROR`)
export const wsOnClose = createAction(`${PATH}_ON_CLOSE`)
export const wsOnMessage = createAction(`${PATH}_ON_MESSAGE`)

const INITIAL_STATE = {
  connected: false,
  loading: false
}

const websocketReducer = createReducer(INITIAL_STATE, {
  [wsConnect]: state => {
    return {
      ...state,
      connected: false,
      loading: true
    }
  },
  [wsDisconnect]: state => {
    return {
      ...state,
      connected: false
    }
  },
  [wsOnError]: state => {
    return {
      ...state,
      connected: false
    }
  },
  [wsSend]: state => {
    return {
      ...state
    }
  },
  [wsOnOpen]: state => {
    return {
      ...state,
      connected: true,
      loading: false
    }
  },
  [wsOnClose]: state => {
    return {
      ...state,
      connected: false
    }
  },
  [wsOnMessage]: state => {
    return {
      ...state
    }
  },
})

export default websocketReducer
