import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as debugConfigSaga } from './saga'
export * as selectors from './selector'

const PATH = 'DEBUG_CONFIG'

export const debugConfigGet = createAction(`${PATH}_GET`)
export const debugConfigGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const debugConfigGetFailed = createAction(`${PATH}_GET_FAILED`)

export const debugConfigSet = createAction(`${PATH}_SET`)
export const debugConfigSetSuccess = createAction(`${PATH}_SET_SUCCESS`)
export const debugConfigSetFailed = createAction(`${PATH}_SET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  config: {
    keepEventTime: 300,
  },

  // STATE MANAGEMENT

  // get
  debugConfigGetLoading: false,
  debugConfigGetSuccess: false,
  debugConfigGetFailed: false,
  debugConfigGetError: {},

  // set
  debugConfigSetLoading: false,
  debugConfigSetSuccess: false,
  debugConfigSetFailed: false,
  debugConfigSetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [debugConfigGet]: (state) => {
    state.debugConfigGetLoading = true
    state.debugConfigGetSuccess = false
    state.debugConfigGetFailed = false
    state.debugConfigGetError = {}
  },
  [debugConfigGetSuccess]: (state, action) => {
    state.debugConfigGetLoading = false
    state.debugConfigGetSuccess = true
    state.config = action.payload
  },
  [debugConfigGetFailed]: (state, action) => {
    state.debugConfigGetLoading = false
    state.debugConfigGetFailed = true
    state.debugConfigGetError = action.payload
  },

  // SET
  [debugConfigSet]: (state) => {
    state.debugConfigSetLoading = true
    state.debugConfigSetSuccess = false
    state.debugConfigSetFailed = false
    state.debugConfigSetError = {}
  },
  [debugConfigSetSuccess]: (state, action) => {
    state.debugConfigSetLoading = false
    state.debugConfigSetSuccess = true
    state.config = action.payload
  },
  [debugConfigSetFailed]: (state, action) => {
    state.debugConfigSetLoading = false
    state.debugConfigSetFailed = true
    state.debugConfigSetError = action.payload
  },
})

export default reducer
