import { createAction, createReducer } from '@reduxjs/toolkit'
import { filter } from 'lodash'

export { saga as pluginSaga } from './saga'
export * as selectors from './selector'

const PATH = 'PLUGIN'

export const pluginGet = createAction(`${PATH}_GET`)
export const pluginGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const pluginGetFailed = createAction(`${PATH}_GET_FAILED`)

export const pluginAdd = createAction(`${PATH}_ADD`)
export const pluginAddSuccess = createAction(`${PATH}_ADD_SUCCESS`)
export const pluginAddFailed = createAction(`${PATH}_ADD_FAILED`)

export const pluginRemove = createAction(`${PATH}_REMOVE`)
export const pluginRemoveSuccess = createAction(`${PATH}_REMOVE_SUCCESS`)
export const pluginRemoveFailed = createAction(`${PATH}_REMOVE_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  plugins: [],

  // STATE MANAGEMENT

  // findAll
  pluginGetLoading: false,
  pluginGetSuccess: false,
  pluginGetFailed: false,
  pluginGetError: {},

  // create
  pluginAddLoading: false,
  pluginAddSuccess: false,
  pluginAddFailed: false,
  pluginAddError: {},

  // update
  pluginUpdateLoading: false,
  pluginUpdateSuccess: false,
  pluginUpdateFailed: false,
  pluginUpdateError: {},

  // delete
  pluginRemoveLoading: false,
  pluginRemoveSuccess: false,
  pluginRemoveFailed: false,
  pluginRemoveError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // FIND ALL
  [pluginGet]: (state) => {
    state.pluginGetLoading = true
    state.pluginGetSuccess = false
    state.pluginGetFailed = false
    state.pluginGetError = {}
  },
  [pluginGetSuccess]: (state, action) => {
    state.pluginGetLoading = false
    state.pluginGetSuccess = true
    state.plugins = action.payload
  },
  [pluginGetFailed]: (state, action) => {
    state.pluginGetLoading = false
    state.pluginGetFailed = true
    state.pluginGetError = action.payload
  },

  // ADD
  [pluginAdd]: (state) => {
    state.pluginAddLoading = true
    state.pluginAddSuccess = false
    state.pluginAddFailed = false
    state.pluginAddError = {}
  },
  [pluginAddSuccess]: (state, action) => {
    state.pluginAddLoading = false
    state.pluginAddSuccess = true
    state.plugins.push(action.payload)
  },
  [pluginAddFailed]: (state, action) => {
    state.pluginAddLoading = false
    state.pluginAddFailed = true
    state.pluginAddError = action.payload
  },

  // REMOVE
  [pluginRemove]: (state) => {
    state.pluginRemoveLoading = true
    state.pluginRemoveSuccess = false
    state.pluginRemoveFailed = false
    state.pluginRemoveError = {}
  },
  [pluginRemoveSuccess]: (state, action) => {
    state.pluginRemoveLoading = false
    state.pluginRemoveSuccess = true
    state.plugins = filter(state.plugins, i => i.id !== action.payload.id)
  },
  [pluginRemoveFailed]: (state, action) => {
    state.pluginRemoveLoading = false
    state.pluginRemoveFailed = true
    state.pluginRemoveError = action.payload
  }
})

export default reducer
