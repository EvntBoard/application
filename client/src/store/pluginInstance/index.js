import { createAction, createReducer } from '@reduxjs/toolkit'
import { filter } from 'lodash'

export { saga as pluginInstanceSaga } from './saga'
export * as selectors from './selector'

const PATH = 'PLUGIN_INSTANCE'

export const pluginInstanceFindAll = createAction(`${PATH}_FINDALL`)
export const pluginInstanceFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const pluginInstanceFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

export const pluginInstanceCreate = createAction(`${PATH}_CREATE`)
export const pluginInstanceCreateSuccess = createAction(`${PATH}_CREATE_SUCCESS`)
export const pluginInstanceCreateFailed = createAction(`${PATH}_CREATE_FAILED`)

export const pluginInstanceUpdate = createAction(`${PATH}_UPDATE`)
export const pluginInstanceUpdateSuccess = createAction(`${PATH}_UPDATE_SUCCESS`)
export const pluginInstanceUpdateFailed = createAction(`${PATH}_UPDATE_FAILED`)

export const pluginInstanceDelete = createAction(`${PATH}_DELETE`)
export const pluginInstanceDeleteSuccess = createAction(`${PATH}_DELETE_SUCCESS`)
export const pluginInstanceDeleteFailed = createAction(`${PATH}_DELETE_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  pluginInstances: [],

  // STATE MANAGEMENT

  // findAll
  pluginInstanceFindAllLoading: false,
  pluginInstanceFindAllSuccess: false,
  pluginInstanceFindAllFailed: false,
  pluginInstanceFindAllError: {},

  // create
  pluginInstanceCreateLoading: false,
  pluginInstanceCreateSuccess: false,
  pluginInstanceCreateFailed: false,
  pluginInstanceCreateError: {},

  // update
  pluginInstanceUpdateLoading: false,
  pluginInstanceUpdateSuccess: false,
  pluginInstanceUpdateFailed: false,
  pluginInstanceUpdateError: {},

  // delete
  pluginInstanceDeleteLoading: false,
  pluginInstanceDeleteSuccess: false,
  pluginInstanceDeleteFailed: false,
  pluginInstanceDeleteError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // FIND ALL
  [pluginInstanceFindAll]: (state) => {
    state.pluginInstanceFindAllLoading = true
    state.pluginInstanceFindAllSuccess = false
    state.pluginInstanceFindAllFailed = false
    state.pluginInstanceFindAllError = {}
  },
  [pluginInstanceFindAllSuccess]: (state, action) => {
    state.pluginInstanceFindAllLoading = false
    state.pluginInstanceFindAllSuccess = true
    state.pluginInstances = action.payload
  },
  [pluginInstanceFindAllFailed]: (state, action) => {
    state.pluginInstanceFindAllLoading = false
    state.pluginInstanceFindAllFailed = true
    state.pluginInstanceFindAllError = action.payload
  },

  // CREATE
  [pluginInstanceCreate]: (state) => {
    state.pluginInstanceCreateLoading = true
    state.pluginInstanceCreateSuccess = false
    state.pluginInstanceCreateFailed = false
    state.pluginInstanceCreateError = {}
  },
  [pluginInstanceCreateSuccess]: (state, action) => {
    state.pluginInstanceCreateLoading = false
    state.pluginInstanceCreateSuccess = true
    state.pluginInstances.push(action.payload)
  },
  [pluginInstanceCreateFailed]: (state, action) => {
    state.pluginInstanceCreateLoading = false
    state.pluginInstanceCreateFailed = true
    state.pluginInstanceCreateError = action.payload
  },

  // UPDATE
  [pluginInstanceUpdate]: (state) => {
    state.pluginInstanceUpdateLoading = true
    state.pluginInstanceUpdateSuccess = false
    state.pluginInstanceUpdateFailed = false
    state.pluginInstanceUpdateError = {}
  },
  [pluginInstanceUpdateSuccess]: (state, action) => {
    state.pluginInstanceUpdateLoading = false
    state.pluginInstanceUpdateSuccess = true
    state.pluginInstances = [
      ...filter(state.pluginInstances, i => i.id !== action.payload.id),
      action.payload
    ]
  },
  [pluginInstanceUpdateFailed]: (state, action) => {
    state.pluginInstanceUpdateLoading = false
    state.pluginInstanceUpdateFailed = true
    state.pluginInstanceUpdateError = action.payload
  },

  // DELETE
  [pluginInstanceDelete]: (state) => {
    state.pluginInstanceDeleteLoading = true
    state.pluginInstanceDeleteSuccess = false
    state.pluginInstanceDeleteFailed = false
    state.pluginInstanceDeleteError = {}
  },
  [pluginInstanceDeleteSuccess]: (state, action) => {
    state.pluginInstanceDeleteLoading = false
    state.pluginInstanceDeleteSuccess = true
    state.pluginInstances = filter(state.pluginInstances, i => i.id !== action.payload.id)
  },
  [pluginInstanceDeleteFailed]: (state, action) => {
    state.pluginInstanceDeleteLoading = false
    state.pluginInstanceDeleteFailed = true
    state.pluginInstanceDeleteError = action.payload
  }
})

export default reducer
