import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  pluginGet as IPCpluginGet,
  pluginAdd as IPCpluginAdd,
  pluginRemove as IPCpluginRemove
} from '../../service/pluginService'

import {
  pluginGet,
  pluginGetSuccess,
  pluginGetFailed,
  pluginAdd,
  pluginAddSuccess,
  pluginAddFailed,
  pluginRemove,
  pluginRemoveSuccess,
  pluginRemoveFailed,
} from './'

function* onModuleGet() {
  try {
    const data = yield call(IPCpluginGet)
    yield put(pluginGetSuccess(data))
  } catch (e) {
    yield put(pluginGetFailed(e))
  }
}

function* onModuleAdd({ payload }) {
  try {
    const data = yield call(IPCpluginAdd, payload)
    yield put(pluginAddSuccess(data))
  } catch (e) {
    yield put(pluginAddFailed(e))
  }
}

function* onModuleRemove({ payload }) {
  try {
    yield call(IPCpluginRemove, payload)
    yield put(pluginRemoveSuccess(payload))
  } catch (e) {
    yield put(pluginRemoveFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - PLUGIN')
  yield all([
    takeEvery(pluginGet.type, onModuleGet),
    takeEvery(pluginAdd.type, onModuleAdd),
    takeEvery(pluginRemove.type, onModuleRemove),
  ])
}
