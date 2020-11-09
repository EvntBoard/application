import { createAction, createReducer } from '@reduxjs/toolkit'
import { filter } from 'lodash'

export { saga as moduleSaga } from './saga'
export * as selectors from './selector'

const PATH = 'MODULE'

export const moduleFindAll = createAction(`${PATH}_FINDALL`)
export const moduleFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const moduleFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

export const moduleCreate = createAction(`${PATH}_CREATE`)
export const moduleCreateSuccess = createAction(`${PATH}_CREATE_SUCCESS`)
export const moduleCreateFailed = createAction(`${PATH}_CREATE_FAILED`)

export const moduleUpdate = createAction(`${PATH}_UPDATE`)
export const moduleUpdateSuccess = createAction(`${PATH}_UPDATE_SUCCESS`)
export const moduleUpdateFailed = createAction(`${PATH}_UPDATE_FAILED`)

export const moduleDelete = createAction(`${PATH}_DELETE`)
export const moduleDeleteSuccess = createAction(`${PATH}_DELETE_SUCCESS`)
export const moduleDeleteFailed = createAction(`${PATH}_DELETE_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  modules: [],

  // STATE MANAGEMENT

  // findAll
  moduleFindAllLoading: false,
  moduleFindAllSuccess: false,
  moduleFindAllFailed: false,
  moduleFindAllError: {},

  // create
  moduleCreateLoading: false,
  moduleCreateSuccess: false,
  moduleCreateFailed: false,
  moduleCreateError: {},

  // update
  moduleUpdateLoading: false,
  moduleUpdateSuccess: false,
  moduleUpdateFailed: false,
  moduleUpdateError: {},

  // delete
  moduleDeleteLoading: false,
  moduleDeleteSuccess: false,
  moduleDeleteFailed: false,
  moduleDeleteError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // FIND ALL
  [moduleFindAll]: (state) => {
    state.moduleFindAllLoading = true
    state.moduleFindAllSuccess = false
    state.moduleFindAllFailed = false
    state.moduleFindAllError = {}
  },
  [moduleFindAllSuccess]: (state, action) => {
    state.moduleFindAllLoading = false
    state.moduleFindAllSuccess = true
    state.modules = action.payload
  },
  [moduleFindAllFailed]: (state, action) => {
    state.moduleFindAllLoading = false
    state.moduleFindAllFailed = true
    state.moduleFindAllError = action.payload
  },

  // CREATE
  [moduleCreate]: (state) => {
    state.moduleCreateLoading = true
    state.moduleCreateSuccess = false
    state.moduleCreateFailed = false
    state.moduleCreateError = {}
  },
  [moduleCreateSuccess]: (state, action) => {
    state.moduleCreateLoading = false
    state.moduleCreateSuccess = true
    state.modules.push(action.payload)
  },
  [moduleCreateFailed]: (state, action) => {
    state.moduleCreateLoading = false
    state.moduleCreateFailed = true
    state.moduleCreateError = action.payload
  },

  // UPDATE
  [moduleUpdate]: (state) => {
    state.moduleUpdateLoading = true
    state.moduleUpdateSuccess = false
    state.moduleUpdateFailed = false
    state.moduleUpdateError = {}
  },
  [moduleUpdateSuccess]: (state, action) => {
    state.moduleUpdateLoading = false
    state.moduleUpdateSuccess = true
    state.modules = [
      ...filter(state.modules, i => i.id !== action.payload.id),
      action.payload
    ]
  },
  [moduleUpdateFailed]: (state, action) => {
    state.moduleUpdateLoading = false
    state.moduleUpdateFailed = true
    state.moduleUpdateError = action.payload
  },

  // DELETE
  [moduleDelete]: (state) => {
    state.moduleDeleteLoading = true
    state.moduleDeleteSuccess = false
    state.moduleDeleteFailed = false
    state.moduleDeleteError = {}
  },
  [moduleDeleteSuccess]: (state, action) => {
    state.moduleDeleteLoading = false
    state.moduleDeleteSuccess = true
    state.modules = filter(state.modules, i => i.id !== action.payload.id)
  },
  [moduleDeleteFailed]: (state, action) => {
    state.moduleDeleteLoading = false
    state.moduleDeleteFailed = true
    state.moduleDeleteError = action.payload
  }
})

export default reducer
