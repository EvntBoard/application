import { createAction, createReducer } from '@reduxjs/toolkit'
import { filter } from 'lodash'

export { saga as buttonSaga } from './saga'
export * as selectors from './selector'

const PATH = 'BUTTON'

export const buttonFindAll = createAction(`${PATH}_FINDALL`)
export const buttonFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const buttonFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

export const buttonCreate = createAction(`${PATH}_CREATE`)
export const buttonUpdate = createAction(`${PATH}_UPDATE`)
export const buttonDelete = createAction(`${PATH}_DELETE`)

const INITIAL_STATE = {
  // REAL DATA
  buttons: [],

  // STATE MANAGEMENT

  // findAll
  buttonFindAllLoading: false,
  buttonFindAllSuccess: false,
  buttonFindAllFailed: false,
  buttonFindAllError: {},
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
  [buttonCreate]: (state, action) => {
    state.buttons.push(action.payload)
  },

  // UPDATE
  [buttonUpdate]: (state, action) => {
    state.buttons = [
      ...filter(state.buttons, i => i.id !== action.payload.id),
      action.payload
    ]
  },

  // DELETE
  [buttonDelete]: (state, action) => {
    state.buttons = filter(state.buttons, i => i.id !== action.payload.id)
  }
})

export default reducer
