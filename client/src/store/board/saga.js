import { put, takeEvery, all, call } from 'redux-saga/effects'
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
    const current = first(data)
    yield put(boardFindAllSuccess(data))
    yield put(boardChangeCurrentBoard(current))
  } catch (e) {
    yield put(boardFindAllFailed(e))
  }
}

function* onBoardCreate({ devis }) {
  try {
    const data = yield call(IPCboardCreate, devis)
    yield put(boardCreateSuccess(data))
  } catch (e) {
    yield put(boardCreateFailed(e))
  }
}

function* onBoardUpdate({ devis }) {
  try {
    const data = yield call(IPCboardUpdate, devis)
    yield put(boardUpdateSuccess(data))
  } catch (e) {
    yield put(boardUpdateFailed(e))
  }
}

function* onBoardDelete({ devis }) {
  try {
    yield call(IPCboardDelete, devis)
    yield put(boardDeleteSuccess(devis))
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
