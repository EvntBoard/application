import { createAction, createReducer } from '@reduxjs/toolkit'
import { remove } from 'lodash'

export { saga as boardSaga } from './saga'
export * as selectors from './selector'

const PATH = 'BOARD'

export const boardChangeCurrentBoard = createAction(`${PATH}_CHANGE_CURRENT_BOARD`)

export const boardFindAll = createAction(`${PATH}_FINDALL`)
export const boardFindAllSuccess = createAction(`${PATH}_FINDALL_SUCCESS`)
export const boardFindAllFailed = createAction(`${PATH}_FINDALL_FAILED`)

export const boardCreate = createAction(`${PATH}_CREATE`)
export const boardCreateSuccess = createAction(`${PATH}_CREATE_SUCCESS`)
export const boardCreateFailed = createAction(`${PATH}_CREATE_FAILED`)

export const boardUpdate = createAction(`${PATH}_UPDATE`)
export const boardUpdateSuccess = createAction(`${PATH}_UPDATE_SUCCESS`)
export const boardUpdateFailed = createAction(`${PATH}_UPDATE_FAILED`)

export const boardDelete = createAction(`${PATH}_DELETE`)
export const boardDeleteSuccess = createAction(`${PATH}_DELETE_SUCCESS`)
export const boardDeleteFailed = createAction(`${PATH}_DELETE_FAILED`)

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

  // create
  boardCreateLoading: false,
  boardCreateSuccess: false,
  boardCreateFailed: false,
  boardCreateError: {},

  // update
  boardUpdateLoading: false,
  boardUpdateSuccess: false,
  boardUpdateFailed: false,
  boardUpdateError: {},

  // delete
  boardDeleteLoading: false,
  boardDeleteSuccess: false,
  boardDeleteFailed: false,
  boardDeleteError: {},
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
  [boardCreate]: (state) => {
    state.boardCreateLoading = true
    state.boardCreateSuccess = false
    state.boardCreateFailed = false
    state.boardCreateError = {}
  },
  [boardCreateSuccess]: (state, action) => {
    state.boardCreateLoading = false
    state.boardCreateSuccess = true
    state.boards.push(action.payload)
  },
  [boardCreateFailed]: (state, action) => {
    state.boardCreateLoading = false
    state.boardCreateFailed = true
    state.boardCreateError = action.payload
  },

  // UPDATE
  [boardUpdate]: (state) => {
    state.boardUpdateLoading = true
    state.boardUpdateSuccess = false
    state.boardUpdateFailed = false
    state.boardUpdateError = {}
  },
  [boardUpdateSuccess]: (state, action) => {
    state.boardUpdateLoading = false
    state.boardUpdateSuccess = true
    state.boards = [
      ...remove(state.boards, (i) => i === action.payload.id),
      action.payload
    ]
  },
  [boardUpdateFailed]: (state, action) => {
    state.boardUpdateLoading = false
    state.boardUpdateFailed = true
    state.boardUpdateError = action.payload
  },

  // DELETE
  [boardDelete]: (state) => {
    state.boardDeleteLoading = true
    state.boardDeleteSuccess = false
    state.boardDeleteFailed = false
    state.boardDeleteError = {}
  },
  [boardDeleteSuccess]: (state, action) => {
    state.boardDeleteLoading = false
    state.boardDeleteSuccess = true
    state.boards = remove(state.boards, (i) => i === action.payload.id)
  },
  [boardDeleteFailed]: (state, action) => {
    state.boardDeleteLoading = false
    state.boardDeleteFailed = true
    state.boardDeleteError = action.payload
  }
})

export default reducer
