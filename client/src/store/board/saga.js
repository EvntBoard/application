import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import { first, find } from 'lodash'

import {
  boardFindAll as IPCboardFindAll,
  boardCreate as IPCboardCreate,
  boardDelete as IPCboardDelete,
  boardUpdate as IPCboardUpdate,
  boardSetDefault as IPCboardSetDefault,
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
  boardSetDefault,
  boardSetDefaultSuccess,
  boardSetDefaultFailed,
} from './'

import { appStateChangeCurrentBoard } from '../appState'

function* onBoardFindAll() {
  try {
    const data = yield call(IPCboardFindAll)
    yield put(boardFindAllSuccess(data))

    const currentBoardId = yield select(state => state.board.currentBoardId)

    // on set la current a celle par défaut
    const defaultBoard = find(data, { default: true })
    if (currentBoardId === null) {
      yield put(boardChangeCurrentBoard(defaultBoard))
    }

    const currentBoardIdAppState = yield select(state => state.appState.currentBoardId)
    if (currentBoardIdAppState === null) {
      yield put(appStateChangeCurrentBoard(defaultBoard))
    }

  } catch (e) {
    yield put(boardFindAllFailed(e))
  }
}

function* onBoardSetDefault({ payload }) {
  try {
    const data = yield call(IPCboardSetDefault, payload)
    yield put(boardSetDefaultSuccess(data))
  } catch (e) {
    yield put(boardSetDefaultFailed(e))
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

    // c'était la board par défaut ! on va donc faire que la premiere de la liste
    // soit la nouvelle defaut

    const allBoards = yield select((state) => state.board.boards)

    if (payload.default) {
      const newDefault = first(allBoards)
      yield put(boardChangeCurrentBoard(newDefault))
      yield put(boardSetDefault(newDefault))
    } else {
      const defaultBoard = find(allBoards, { default: true })
      yield put(boardChangeCurrentBoard(defaultBoard))
    }

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
    takeEvery(boardSetDefault.type, onBoardSetDefault),
  ])
}
