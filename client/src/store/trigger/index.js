import { createAction, createReducer } from '@reduxjs/toolkit'
import { remove } from 'lodash'

export { saga as triggerSaga } from './saga'
export * as selectors from './selector'

const PATH = 'TRIGGER'

export const triggerFindAll = createAction(`${PATH}_FINDALL`)
export const triggerFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const triggerFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

export const triggerCreate = createAction(`${PATH}_CREATE`)
export const triggerCreateSuccess = createAction(`${PATH}_CREATE_SUCCESS`)
export const triggerCreateFailed = createAction(`${PATH}_CREATE_FAILED`)

export const triggerUpdate = createAction(`${PATH}_UPDATE`)
export const triggerUpdateSuccess = createAction(`${PATH}_UPDATE_SUCCESS`)
export const triggerUpdateFailed = createAction(`${PATH}_UPDATE_FAILED`)

export const triggerDelete = createAction(`${PATH}_DELETE`)
export const triggerDeleteSuccess = createAction(`${PATH}_DELETE_SUCCESS`)
export const triggerDeleteFailed = createAction(`${PATH}_DELETE_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  triggers: [],

  // STATE MANAGEMENT

  // findAll
  triggerFindAllLoading: false,
  triggerFindAllSuccess: false,
  triggerFindAllFailed: false,
  triggerFindAllError: {},

  // create
  triggerCreateLoading: false,
  triggerCreateSuccess: false,
  triggerCreateFailed: false,
  triggerCreateError: {},

  // update
  triggerUpdateLoading: false,
  triggerUpdateSuccess: false,
  triggerUpdateFailed: false,
  triggerUpdateError: {},

  // delete
  triggerDeleteLoading: false,
  triggerDeleteSuccess: false,
  triggerDeleteFailed: false,
  triggerDeleteError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // FIND ALL
  [triggerFindAll]: (state) => {
    state.triggerFindAllLoading = true
    state.triggerFindAllSuccess = false
    state.triggerFindAllFailed = false
    state.triggerFindAllError = {}
  },
  [triggerFindAllSuccess]: (state, action) => {
    state.triggerFindAllLoading = false
    state.triggerFindAllSuccess = true
    state.triggers = action.payload
  },
  [triggerFindAllFailed]: (state, action) => {
    state.triggerFindAllLoading = false
    state.triggerFindAllFailed = true
    state.triggerFindAllError = action.payload
  },

  // CREATE
  [triggerCreate]: (state) => {
    state.triggerCreateLoading = true
    state.triggerCreateSuccess = false
    state.triggerCreateFailed = false
    state.triggerCreateError = {}
  },
  [triggerCreateSuccess]: (state, action) => {
    state.triggerCreateLoading = false
    state.triggerCreateSuccess = true
    state.triggers.push(action.payload)
  },
  [triggerCreateFailed]: (state, action) => {
    state.triggerCreateLoading = false
    state.triggerCreateFailed = true
    state.triggerCreateError = action.payload
  },

  // UPDATE
  [triggerUpdate]: (state) => {
    state.triggerUpdateLoading = true
    state.triggerUpdateSuccess = false
    state.triggerUpdateFailed = false
    state.triggerUpdateError = {}
  },
  [triggerUpdateSuccess]: (state, action) => {
    state.triggerUpdateLoading = false
    state.triggerUpdateSuccess = true
    state.triggers = [
      ...remove(state.triggers, (i) => i === action.payload.id),
      action.payload
    ]
  },
  [triggerUpdateFailed]: (state, action) => {
    state.triggerUpdateLoading = false
    state.triggerUpdateFailed = true
    state.triggerUpdateError = action.payload
  },

  // DELETE
  [triggerDelete]: (state) => {
    state.triggerDeleteLoading = true
    state.triggerDeleteSuccess = false
    state.triggerDeleteFailed = false
    state.triggerDeleteError = {}
  },
  [triggerDeleteSuccess]: (state, action) => {
    state.triggerDeleteLoading = false
    state.triggerDeleteSuccess = true
    state.triggers = remove(state.triggers, (i) => i === action.payload.id)
  },
  [triggerDeleteFailed]: (state, action) => {
    state.triggerDeleteLoading = false
    state.triggerDeleteFailed = true
    state.triggerDeleteError = action.payload
  }
})

export default reducer
