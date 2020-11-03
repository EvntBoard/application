import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  appConfigSet as IPCappConfigSet,
  appConfigGet as IPCappConfigGet,
} from '../../service/appConfigService'

import {
  configGet,
  configGetSuccess,
  configGetFailed,
  configSet,
  configSetSuccess,
  configSetFailed,
} from './'

function* onConfigGet() {
  try {
    const data = yield call(IPCappConfigGet)
    yield put(configGetSuccess(data))
  } catch (e) {
    yield put(configGetFailed(e))
  }
}

function* onConfigSet({ config }) {
  try {
    const data = yield call(IPCappConfigSet, config)
    yield put(configSetSuccess(data))
  } catch (e) {
    yield put(configSetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - CONFIG')
  yield all([
    takeEvery(configGet.type, onConfigGet),
    takeEvery(configSet.type, onConfigSet),
  ])
}
