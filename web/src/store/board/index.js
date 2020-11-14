import { createAction, createReducer } from '@reduxjs/toolkit'
import { filter } from 'lodash'

export { saga as boardSaga } from './saga'
export * as selectors from './selector'

const PATH = 'BOARD'

export const boardChangeCurrentBoard = createAction(`${PATH}_CHANGE_CURRENT_BOARD`)

export const boardFindAll = createAction(`${PATH}_FINDALL`)
export const boardFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const boardFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

export const boardCreate = createAction(`${PATH}_CREATE`)
export const boardUpdate = createAction(`${PATH}_UPDATE`)
export const boardDelete = createAction(`${PATH}_DELETE`)

const INITIAL_STATE = {
  // REAL DATA
  boards: [],
  currentBoardId: null,

  // STATE MANAGEMENT

  // findAll
  boardFindAllLoading: false,
  boardFindAllSuccess: false,
  boardFindAllFailed: false,
  boardFindAllError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  //
  [boardChangeCurrentBoard]: (state, action) => {
    state.currentBoardId = action.payload.id
  },

  // FIND ALL
  [boardFindAll]: (state) => {
    state.boardFindAllLoading = true
    state.boardFindAllSuccess = false
    state.boardFindAllFailed = false
    state.boardFindAllError = {}
  },
  [boardFindAllSuccess]: (state, action) => {
    state.boardFindAllLoading = false
    state.boardFindAllSuccess = true
    state.boards = action.payload
  },
  [boardFindAllFailed]: (state, action) => {
    state.boardFindAllLoading = false
    state.boardFindAllFailed = true
    state.boardFindAllError = action.payload
  },

  // CREATE
  [boardCreate]: (state, action) => {
    state.boards.push(action.payload)
  },

  // UPDATE
  [boardUpdate]: (state, action) => {
    state.boards = [
      ...filter(state.boards, i => i.id !== action.payload.id),
      action.payload
    ]
  },

  // DELETE
  [boardDelete]: (state, action) => {
    state.boards = filter(state.boards, i => i.id !== action.payload.id)
  }
})

export default reducer
