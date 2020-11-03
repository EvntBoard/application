import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as webserverSaga } from './saga'
export * as selectors from './selector'

const PATH = 'WEBSERVER'

export const webserverGet = createAction(`${PATH}_GET`)
export const webserverGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const webserverGetFailed = createAction(`${PATH}_GET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  connected: false,

  // STATE MANAGEMENT

  // get
  webserverGetLoading: false,
  webserverGetSuccess: false,
  webserverGetFailed: false,
  webserverGetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [webserverGet]: (state) => {
    state.webserverGetLoading = true
    state.webserverGetSuccess = false
    state.webserverGetFailed = false
    state.webserverGetError = {}
  },
  [webserverGetSuccess]: (state, action) => {
    state.webserverGetLoading = false
    state.webserverGetSuccess = true
    state.connected = action.payload
  },
  [webserverGetFailed]: (state, action) => {
    state.webserverGetLoading = false
    state.webserverGetFailed = true
    state.webserverGetError = action.payload
  },
})

export default reducer
