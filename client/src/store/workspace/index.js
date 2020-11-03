import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as workspaceSaga } from './saga'
export * as selectors from './selector'

const PATH = 'WORKSPACE'

export const workspaceOnChange = createAction(`${PATH}_ON_CHANGE`)

export const workspaceGet = createAction(`${PATH}_GET`)
export const workspaceGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const workspaceGetFailed = createAction(`${PATH}_GET_FAILED`)

export const workspaceSet = createAction(`${PATH}_SET`)
export const workspaceSetSuccess = createAction(`${PATH}_SET_SUCCESS`)
export const workspaceSetFailed = createAction(`${PATH}_SET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  workspace: null,

  // STATE MANAGEMENT

  // get
  workspaceGetLoading: false,
  workspaceGetSuccess: false,
  workspaceGetFailed: false,
  workspaceGetError: {},

  // set
  workspaceSetLoading: false,
  workspaceSetSuccess: false,
  workspaceSetFailed: false,
  workspaceSetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [workspaceGet]: (state) => {
    state.workspaceGetLoading = true
    state.workspaceGetSuccess = false
    state.workspaceGetFailed = false
    state.workspaceGetError = {}
  },
  [workspaceGetSuccess]: (state, action) => {
    state.workspaceGetLoading = false
    state.workspaceGetSuccess = true
    state.workspace = action.payload
  },
  [workspaceGetFailed]: (state, action) => {
    state.workspaceGetLoading = false
    state.workspaceGetFailed = true
    state.workspaceGetError = action.payload
  },

  // SET
  [workspaceSet]: (state) => {
    state.workspaceSetLoading = true
    state.workspaceSetSuccess = false
    state.workspaceSetFailed = false
    state.workspaceSetError = {}
  },
  [workspaceSetSuccess]: (state, action) => {
    state.workspaceSetLoading = false
    state.workspaceSetSuccess = true
    state.workspace = action.payload
  },
  [workspaceSetFailed]: (state, action) => {
    state.workspaceSetLoading = false
    state.workspaceSetFailed = true
    state.workspaceSetError = action.payload
  },
})

export default reducer
