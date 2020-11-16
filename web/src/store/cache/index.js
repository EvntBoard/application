import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as cacheSaga } from './saga'
export * as selectors from './selector'

const PATH = 'CACHE'

export const cacheOnChange = createAction(`${PATH}_ON_CHANGE`)

export const cacheGet = createAction(`${PATH}_GET`)
export const cacheGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const cacheGetFailed = createAction(`${PATH}_GET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  boards: [],
  buttons: [],

  // STATE MANAGEMENT

  // get
  cacheGetLoading: false,
  cacheGetSuccess: false,
  cacheGetFailed: false,
  cacheGetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [cacheGet]: (state) => {
    state.cacheGetLoading = true
    state.cacheGetSuccess = false
    state.cacheGetFailed = false
    state.cacheGetError = {}
  },
  [cacheGetSuccess]: (state, action) => {
    state.cacheGetLoading = false
    state.cacheGetSuccess = true
    state.currentBoard = action.payload.currentBoard
    state.boards = action.payload.boards
    state.buttons = action.payload.buttons
  },
  [cacheGetFailed]: (state, action) => {
    state.cacheGetLoading = false
    state.cacheGetFailed = true
    state.cacheGetError = action.payload
    state.currentBoard = null
    state.boards = []
    state.buttons = []
  },

  [cacheOnChange]: (state, action) => {
    if (action.payload.cache === state.cache) {
      state.currentBoard = action.payload.currentBoard
      state.boards = action.payload.boards
      state.buttons = action.payload.buttons
    }
  },
})

export default reducer
