import axios from 'axios'
import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  boardFindAll,
  boardFindAllSuccess,
  boardFindAllFailed,
} from './'

function* onBoardGet() {
  try {
    const { data } = yield call(axios.get, '/api/board')
    yield put(boardFindAllSuccess(data))
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
