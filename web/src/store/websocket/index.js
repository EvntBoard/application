import { createAction, createReducer } from '@reduxjs/toolkit'

export * as selectors from './selector'

const PATH = 'WEBSOCKET'

export const wsConnect = createAction(`${PATH}_CONNECT`)
export const wsCreateEvent = createAction(`${PATH}_NEW_EVENT`)
export const wsDisconnect = createAction(`${PATH}_DISCONNECT`)
export const wsOnClose = createAction(`${PATH}_ON_CLOSE`)
export const wsOnError = createAction(`${PATH}_ON_ERROR`)
export const wsOnOpen = createAction(`${PATH}_ON_OPEN`)

const INITIAL_STATE = {
  id: null,
  loading: false,
  connected: false,
  error: {}
}

const reducer = createReducer(INITIAL_STATE, {
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
  [wsOnOpen]: (state, { payload }) => {
    state.id = payload
    state.loading = false
    state.connected = true
    state.error = {}
  },
  [wsOnClose]: (state) => {
    state.id = null
    state.loading = false
    state.connected = false
    state.error = {}
  },
  [wsOnError]: (state, action) => {
    state.id = null
    state.loading = false
    state.connected = false
    state.error = action.payload
  },
})

export default reducer
