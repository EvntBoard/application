import { createAction, createReducer } from '@reduxjs/toolkit'

export * as selectors from './selector'

const PATH = 'WEBSOCKET'

export const wsConnect = createAction(`${PATH}_CONNECT`)
export const wsSend = createAction(`${PATH}_SEND`)
export const wsDisconnect = createAction(`${PATH}_DISCONNECT`)
export const wsOnClose = createAction(`${PATH}_ON_CLOSE`)
export const wsOnError = createAction(`${PATH}_ON_ERROR`)
export const wsOnOpen = createAction(`${PATH}_ON_OPEN`)

const INITIAL_STATE = {
  loading: false,
  connected: false,
  error: {}
}

const reducer = createReducer(INITIAL_STATE, {
  [wsSend]: (state) => {
    state.loading = true
    state.connected = false
    state.error = {}
  },
  [wsConnect]: (state) => {
    state.loading = false
    state.connected = true
    state.error = {}
  },
  [wsDisconnect]: (state) => {
    state.loading = false
    state.connected = false
    state.error = {}
  },
  [wsOnOpen]: (state) => {
    state.loading = false
    state.connected = true
    state.error = {}
  },
  [wsOnClose]: (state) => {
    state.loading = false
    state.connected = false
    state.error = {}
  },
  [wsOnError]: (state, action) => {
    state.loading = false
    state.connected = false
    state.error = action.payload
  },
})

export default reducer
