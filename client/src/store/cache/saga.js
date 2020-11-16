import { put, takeEvery, all, call, select } from 'redux-saga/effects'

import { cacheGet as IPCCacheGet } from '../../service/cacheService'

import {
  cacheGet,
  cacheGetSuccess,
  cacheGetFailed,
} from './'

function* onCacheGet() {
  try {
    const currentCache = yield select(state => state.cache.cache)
    const data = yield call(IPCCacheGet, currentCache)
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
