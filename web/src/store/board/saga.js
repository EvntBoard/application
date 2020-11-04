import axios from 'axios'
import { find } from 'lodash'
import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  boardChangeCurrentBoard,
  boardFindAll,
  boardFindAllSuccess,
  boardFindAllFailed,
} from './'

function* onBoardGet() {
  try {
    const { data } = yield call(axios.get, '/api/board')
    // find default
    const currentBoard = find(data, { default: true })
    yield put(boardFindAllSuccess(data))
    yield put(boardChangeCurrentBoard(currentBoard))
  } catch (e) {
    yield put(boardFindAllFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - BOARD')
  yield all([
    takeEvery(boardFindAll.type, onBoardGet)
  ])
}
