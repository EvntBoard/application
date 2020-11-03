import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import { first } from 'lodash'

import {
  boardFindAll as IPCboardFindAll,
  boardCreate as IPCboardCreate,
  boardDelete as IPCboardDelete,
  boardUpdate as IPCboardUpdate,
} from '../../service/boardService'

import {
  boardFindAll,
  boardFindAllSuccess,
  boardFindAllFailed,
  boardCreate,
  boardCreateSuccess,
  boardCreateFailed,
  boardUpdate,
  boardUpdateSuccess,
  boardUpdateFailed,
  boardDelete,
  boardDeleteSuccess,
  boardDeleteFailed,
  boardChangeCurrentBoard,
} from './'

function* onBoardFindAll() {
  try {
    const data = yield call(IPCboardFindAll)
    yield put(boardFindAllSuccess(data))
    // TODO CURRENT BOARD
    yield put(boardChangeCurrentBoard(first(data)))
  } catch (e) {
    yield put(boardFindAllFailed(e))
  }
}

function* onBoardCreate({ payload }) {
  try {
    const data = yield call(IPCboardCreate, payload)
    yield put(boardCreateSuccess(data))
    yield put(boardChangeCurrentBoard(data))
  } catch (e) {
    yield put(boardCreateFailed(e))
  }
}

function* onBoardUpdate({ payload }) {
  try {
    const data = yield call(IPCboardUpdate, payload)
    yield put(boardUpdateSuccess(data))
  } catch (e) {
    yield put(boardUpdateFailed(e))
  }
}

function* onBoardDelete({ payload }) {
  try {
    yield call(IPCboardDelete, payload)
    yield put(boardDeleteSuccess(payload))
    // TODO CURRENT BOARD
    const allBoards = yield select((state) => state.board.boards)
    yield put(boardChangeCurrentBoard(first(allBoards)))
  } catch (e) {
    yield put(boardDeleteFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - BOARD')
  yield all([
    takeEvery(boardFindAll.type, onBoardFindAll),
    takeEvery(boardCreate.type, onBoardCreate),
    takeEvery(boardUpdate.type, onBoardUpdate),
    takeEvery(boardDelete.type, onBoardDelete),
  ])
}
