import { createAction, createReducer } from '@reduxjs/toolkit'
import { filter } from 'lodash'

export { saga as pluginSaga } from './saga'
export * as selectors from './selector'

const PATH = 'PLUGIN'

export const pluginFindAll = createAction(`${PATH}_FINDALL`)
export const pluginFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const pluginFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

export const pluginCreate = createAction(`${PATH}_CREATE`)
export const pluginCreateSuccess = createAction(`${PATH}_CREATE_SUCCESS`)
export const pluginCreateFailed = createAction(`${PATH}_CREATE_FAILED`)

export const pluginUpdate = createAction(`${PATH}_UPDATE`)
export const pluginUpdateSuccess = createAction(`${PATH}_UPDATE_SUCCESS`)
export const pluginUpdateFailed = createAction(`${PATH}_UPDATE_FAILED`)

export const pluginDelete = createAction(`${PATH}_DELETE`)
export const pluginDeleteSuccess = createAction(`${PATH}_DELETE_SUCCESS`)
export const pluginDeleteFailed = createAction(`${PATH}_DELETE_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  plugins: [],

  // STATE MANAGEMENT

  // findAll
  pluginFindAllLoading: false,
  pluginFindAllSuccess: false,
  pluginFindAllFailed: false,
  pluginFindAllError: {},

  // create
  pluginCreateLoading: false,
  pluginCreateSuccess: false,
  pluginCreateFailed: false,
  pluginCreateError: {},

  // update
  pluginUpdateLoading: false,
  pluginUpdateSuccess: false,
  pluginUpdateFailed: false,
  pluginUpdateError: {},

  // delete
  pluginDeleteLoading: false,
  pluginDeleteSuccess: false,
  pluginDeleteFailed: false,
  pluginDeleteError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // FIND ALL
  [pluginFindAll]: (state) => {
    state.pluginFindAllLoading = true
    state.pluginFindAllSuccess = false
    state.pluginFindAllFailed = false
    state.pluginFindAllError = {}
  },
  [pluginFindAllSuccess]: (state, action) => {
    state.pluginFindAllLoading = false
    state.pluginFindAllSuccess = true
    state.plugins = action.payload
  },
  [pluginFindAllFailed]: (state, action) => {
    state.pluginFindAllLoading = false
    state.pluginFindAllFailed = true
    state.pluginFindAllError = action.payload
  },

  // CREATE
  [pluginCreate]: (state) => {
    state.pluginCreateLoading = true
    state.pluginCreateSuccess = false
    state.pluginCreateFailed = false
    state.pluginCreateError = {}
  },
  [pluginCreateSuccess]: (state, action) => {
    state.pluginCreateLoading = false
    state.pluginCreateSuccess = true
    state.plugins.push(action.payload)
  },
  [pluginCreateFailed]: (state, action) => {
    state.pluginCreateLoading = false
    state.pluginCreateFailed = true
    state.pluginCreateError = action.payload
  },

  // UPDATE
  [pluginUpdate]: (state) => {
    state.pluginUpdateLoading = true
    state.pluginUpdateSuccess = false
    state.pluginUpdateFailed = false
    state.pluginUpdateError = {}
  },
  [pluginUpdateSuccess]: (state, action) => {
    state.pluginUpdateLoading = false
    state.pluginUpdateSuccess = true
    state.plugins = [
      ...filter(state.plugins, i => i.id !== action.payload.id),
      action.payload
    ]
  },
  [pluginUpdateFailed]: (state, action) => {
    state.pluginUpdateLoading = false
    state.pluginUpdateFailed = true
    state.pluginUpdateError = action.payload
  },

  // DELETE
  [pluginDelete]: (state) => {
    state.pluginDeleteLoading = true
    state.pluginDeleteSuccess = false
    state.pluginDeleteFailed = false
    state.pluginDeleteError = {}
  },
  [pluginDeleteSuccess]: (state, action) => {
    state.pluginDeleteLoading = false
    state.pluginDeleteSuccess = true
    state.plugins = filter(state.plugins, i => i.id !== action.payload.id)
  },
  [pluginDeleteFailed]: (state, action) => {
    state.pluginDeleteLoading = false
    state.pluginDeleteFailed = true
    state.pluginDeleteError = action.payload
  }
})

export default reducer
