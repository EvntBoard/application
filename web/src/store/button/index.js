import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as buttonSaga } from './saga'
export * as selectors from './selector'

const PATH = 'BUTTON'

export const buttonFindAll = createAction(`${PATH}_FINDALL`)
export const buttonFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const buttonFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

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
})

export default reducer
