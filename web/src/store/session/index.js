import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as sessionSaga } from './saga'
export * as selectors from './selector'

const PATH = 'SESSION'

export const sessionOnChange = createAction(`${PATH}_ON_CHANGE`)

export const sessionGet = createAction(`${PATH}_GET`)
export const sessionGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const sessionGetFailed = createAction(`${PATH}_GET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  currentBoardId: null,

  // get
  sessionGetLoading: false,
  sessionGetSuccess: false,
  sessionGetFailed: false,
  sessionGetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [sessionGet]: (state) => {
    state.sessionGetLoading = true
    state.sessionGetSuccess = false
    state.sessionGetFailed = false
    state.sessionGetError = {}
  },
  [sessionGetSuccess]: (state, action) => {
    state.sessionGetLoading = false
    state.sessionGetSuccess = true
    state.currentBoardId = action.payload
  },
  [sessionGetFailed]: (state, action) => {
    state.sessionGetLoading = false
    state.sessionGetFailed = true
    state.sessionGetError = action.payload
    state.currentBoardId = null
  },

  [sessionOnChange]: (state, action) => {
    state.currentBoardId = action.payload
  },
})

export default reducer
