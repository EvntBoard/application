import axios from 'axios'
import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  langGet,
  langGetSuccess,
  langGetFailed,
} from './'

function* onLangGet() {
  try {
    const { data } = yield call(axios.get, '/api/lang')
    yield put(langGetSuccess(data))
  } catch (e) {
    yield put(langGetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - LANG')
  yield all([
    takeEvery(langGet.type, onLangGet)
  ])
}
