import { createAction, createReducer } from '@reduxjs/toolkit'

export const wsConnect = createAction('ws:connect')
export const wsDisconnect = createAction('ws:disconnect')
export const wsSend = createAction('ws:send')
export const wsOnOpen = createAction('ws:onopen')
export const wsOnError = createAction('ws:onerror')
export const wsOnClose = createAction('ws:onclose')
export const wsOnMessage = createAction('ws:onmessage')

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
