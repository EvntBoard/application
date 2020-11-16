import { put, takeEvery, all, call } from 'redux-saga/effects'
import axios from 'axios'

import {
  cacheGet,
  cacheGetSuccess,
  cacheGetFailed,
} from './'

function* onCacheGet() {
  try {
    const { data } = yield call(axios.get, '/api/cache')
    yield put(cacheGetSuccess(data))
  } catch (e) {
    yield put(cacheGetFailed())
  }
}

export function* saga() {
  console.debug('SAGA - SACHE')
  yield all([
    takeEvery(cacheGet.type, onCacheGet),
  ])
}
