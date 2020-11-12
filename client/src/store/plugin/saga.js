import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  pluginFindAll as IPCpluginFindAll,
  pluginCreate as IPCpluginCreate,
  pluginDelete as IPCpluginDelete,
  pluginUpdate as IPCpluginUpdate,
} from '../../service/pluginService'

import {
  pluginFindAll,
  pluginFindAllSuccess,
  pluginFindAllFailed,
  pluginCreate,
  pluginCreateSuccess,
  pluginCreateFailed,
  pluginUpdate,
  pluginUpdateSuccess,
  pluginUpdateFailed,
  pluginDelete,
  pluginDeleteSuccess,
  pluginDeleteFailed,
} from './'

function* onPluginFindAll() {
  try {
    const data = yield call(IPCpluginFindAll)
    yield put(pluginFindAllSuccess(data))
  } catch (e) {
    yield put(pluginFindAllFailed(e))
  }
}

function* onPluginCreate({ payload }) {
  try {
    const data = yield call(IPCpluginCreate, payload)
    yield put(pluginCreateSuccess(data))
  } catch (e) {
    yield put(pluginCreateFailed(e))
  }
}

function* onPluginUpdate({ payload }) {
  try {
    const data = yield call(IPCpluginUpdate, payload)
    yield put(pluginUpdateSuccess(data))
  } catch (e) {
    yield put(pluginUpdateFailed(e))
  }
}

function* onPluginDelete({ payload }) {
  try {
    yield call(IPCpluginDelete, payload)
    yield put(pluginDeleteSuccess(payload))
  } catch (e) {
    yield put(pluginDeleteFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - PLUGIN')
  yield all([
    takeEvery(pluginFindAll.type, onPluginFindAll),
    takeEvery(pluginCreate.type, onPluginCreate),
    takeEvery(pluginUpdate.type, onPluginUpdate),
    takeEvery(pluginDelete.type, onPluginDelete),
  ])
}
