import { createAction, createReducer } from '@reduxjs/toolkit'
import { remove } from 'lodash'

export { saga as buttonSaga } from './saga'
export * as selectors from './selector'

const PATH = 'BUTTON'

export const buttonFindAll = createAction(`${PATH}_FINDALL`)
export const buttonFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const buttonFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

export const buttonCreate = createAction(`${PATH}_CREATE`)
export const buttonCreateSuccess = createAction(`${PATH}_CREATE_SUCCESS`)
export const buttonCreateFailed = createAction(`${PATH}_CREATE_FAILED`)

export const buttonUpdate = createAction(`${PATH}_UPDATE`)
export const buttonUpdateSuccess = createAction(`${PATH}_UPDATE_SUCCESS`)
export const buttonUpdateFailed = createAction(`${PATH}_UPDATE_FAILED`)

export const buttonDelete = createAction(`${PATH}_DELETE`)
export const buttonDeleteSuccess = createAction(`${PATH}_DELETE_SUCCESS`)
export const buttonDeleteFailed = createAction(`${PATH}_DELETE_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  buttons: [],

  // STATE MANAGEMENT

  // findAll
  buttonFindAllLoading: false,
  buttonFindAllSuccess: false,
  buttonFindAllFailed: false,
  buttonFindAllError: {},

  // create
  buttonCreateLoading: false,
  buttonCreateSuccess: false,
  buttonCreateFailed: false,
  buttonCreateError: {},

  // update
  buttonUpdateLoading: false,
  buttonUpdateSuccess: false,
  buttonUpdateFailed: false,
  buttonUpdateError: {},

  // delete
  buttonDeleteLoading: false,
  buttonDeleteSuccess: false,
  buttonDeleteFailed: false,
  buttonDeleteError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // FIND ALL
  [buttonFindAll]: (state) => {
    state.buttonFindAllLoading = true
    state.buttonFindAllSuccess = false
    state.buttonFindAllFailed = false
    state.buttonFindAllError = {}
  },
  [buttonFindAllSuccess]: (state, action) => {
    state.buttonFindAllLoading = false
    state.buttonFindAllSuccess = true
    state.buttons = action.payload
  },
  [buttonFindAllFailed]: (state, action) => {
    state.buttonFindAllLoading = false
    state.buttonFindAllFailed = true
    state.buttonFindAllError = action.payload
  },

  // CREATE
  [buttonCreate]: (state) => {
    state.buttonCreateLoading = true
    state.buttonCreateSuccess = false
    state.buttonCreateFailed = false
    state.buttonCreateError = {}
  },
  [buttonCreateSuccess]: (state, action) => {
    state.buttonCreateLoading = false
    state.buttonCreateSuccess = true
    state.buttons.push(action.payload)
  },
  [buttonCreateFailed]: (state, action) => {
    state.buttonCreateLoading = false
    state.buttonCreateFailed = true
    state.buttonCreateError = action.payload
  },

  // UPDATE
  [buttonUpdate]: (state) => {
    state.buttonUpdateLoading = true
    state.buttonUpdateSuccess = false
    state.buttonUpdateFailed = false
    state.buttonUpdateError = {}
  },
  [buttonUpdateSuccess]: (state, action) => {
    state.buttonUpdateLoading = false
    state.buttonUpdateSuccess = true
    state.buttons = [
      ...remove(state.buttons, (i) => i === action.payload.id),
      action.payload
    ]
  },
  [buttonUpdateFailed]: (state, action) => {
    state.buttonUpdateLoading = false
    state.buttonUpdateFailed = true
    state.buttonUpdateError = action.payload
  },

  // DELETE
  [buttonDelete]: (state) => {
    state.buttonDeleteLoading = true
    state.buttonDeleteSuccess = false
    state.buttonDeleteFailed = false
    state.buttonDeleteError = {}
  },
  [buttonDeleteSuccess]: (state, action) => {
    state.buttonDeleteLoading = false
    state.buttonDeleteSuccess = true
    state.buttons = remove(state.buttons, (i) => i === action.payload.id)
  },
  [buttonDeleteFailed]: (state, action) => {
    state.buttonDeleteLoading = false
    state.buttonDeleteFailed = true
    state.buttonDeleteError = action.payload
  }
})

export default reducer
