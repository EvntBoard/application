import axios from 'axios'
import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  buttonFindAll,
  buttonFindAllSuccess,
  buttonFindAllFailed,
} from './'

function* onButtonGet() {
  try {
    const { data } = yield call(axios.get, '/api/button')
    yield put(buttonFindAllSuccess(data))
  } catch (e) {
    yield put(buttonFindAllFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - BUTTON')
  yield all([
    takeEvery(buttonFindAll.type, onButtonGet)
  ])
}
