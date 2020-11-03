import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as configSaga } from './saga'
export * as selectors from './selector'

const PATH = 'CONFIG'

export const configGet = createAction(`${PATH}_GET`)
export const configGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const configGetFailed = createAction(`${PATH}_GET_FAILED`)

export const configSet = createAction(`${PATH}_SET`)
export const configSetSuccess = createAction(`${PATH}_SET_SUCCESS`)
export const configSetFailed = createAction(`${PATH}_SET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  config: {
    host: "",
    port: 0,
    password: "",
  },

  // STATE MANAGEMENT

  // get
  configGetLoading: false,
  configGetSuccess: false,
  configGetFailed: false,
  configGetError: {},

  // set
  configSetLoading: false,
  configSetSuccess: false,
  configSetFailed: false,
  configSetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [configGet]: (state) => {
    state.configGetLoading = true
    state.configGetSuccess = false
    state.configGetFailed = false
    state.configGetError = {}
  },
  [configGetSuccess]: (state, action) => {
    state.configGetLoading = false
    state.configGetSuccess = true
    state.config = action.payload
  },
  [configGetFailed]: (state, action) => {
    state.configGetLoading = false
    state.configGetFailed = true
    state.configGetError = action.payload
  },

  // SET
  [configSet]: (state) => {
    state.configSetLoading = true
    state.configSetSuccess = false
    state.configSetFailed = false
    state.configSetError = {}
  },
  [configSetSuccess]: (state, action) => {
    state.configSetLoading = false
    state.configSetSuccess = true
    state.config = action.payload
  },
  [configSetFailed]: (state, action) => {
    state.configSetLoading = false
    state.configSetFailed = true
    state.configSetError = action.payload
  },
})

export default reducer
