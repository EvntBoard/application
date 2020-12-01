import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  debugConfigSet as IPCdebugConfigSet,
  debugConfigGet as IPCdebugConfigGet,
} from '../../service/debugConfigService'

import {
  debugConfigGet,
  debugConfigGetSuccess,
  debugConfigGetFailed,
  debugConfigSet,
  debugConfigSetSuccess,
  debugConfigSetFailed,
} from './'

function* onConfigGet() {
  try {
    const data = yield call(IPCdebugConfigGet)
    yield put(debugConfigGetSuccess(data))
  } catch (e) {
    yield put(debugConfigGetFailed(e))
  }
}

function* onConfigSet({ payload }) {
  try {
    const data = yield call(IPCdebugConfigSet, payload)
    yield put(debugConfigSetSuccess(data))
  } catch (e) {
    yield put(debugConfigSetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - DEBUG CONFIG')
  yield all([
    takeEvery(debugConfigGet.type, onConfigGet),
    takeEvery(debugConfigSet.type, onConfigSet),
  ])
}
