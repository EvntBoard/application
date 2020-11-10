import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  pluginInstanceFindAll as IPCpluginInstanceFindAll,
  pluginInstanceCreate as IPCpluginInstanceCreate,
  pluginInstanceDelete as IPCpluginInstanceDelete,
  pluginInstanceUpdate as IPCpluginInstanceUpdate,
} from '../../service/pluginInstanceService'

import {
  pluginInstanceFindAll,
  pluginInstanceFindAllSuccess,
  pluginInstanceFindAllFailed,
  pluginInstanceCreate,
  pluginInstanceCreateSuccess,
  pluginInstanceCreateFailed,
  pluginInstanceUpdate,
  pluginInstanceUpdateSuccess,
  pluginInstanceUpdateFailed,
  pluginInstanceDelete,
  pluginInstanceDeleteSuccess,
  pluginInstanceDeleteFailed,
} from './'

function* onModuleFindAll() {
  try {
    const data = yield call(IPCpluginInstanceFindAll)
    yield put(pluginInstanceFindAllSuccess(data))
  } catch (e) {
    yield put(pluginInstanceFindAllFailed(e))
  }
}

function* onModuleCreate({ payload }) {
  try {
    const data = yield call(IPCpluginInstanceCreate, payload)
    yield put(pluginInstanceCreateSuccess(data))
  } catch (e) {
    yield put(pluginInstanceCreateFailed(e))
  }
}

function* onModuleUpdate({ payload }) {
  try {
    const data = yield call(IPCpluginInstanceUpdate, payload)
    yield put(pluginInstanceUpdateSuccess(data))
  } catch (e) {
    yield put(pluginInstanceUpdateFailed(e))
  }
}

function* onModuleDelete({ payload }) {
  try {
    yield call(IPCpluginInstanceDelete, payload)
    yield put(pluginInstanceDeleteSuccess(payload))
  } catch (e) {
    yield put(pluginInstanceDeleteFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - PLUGIN INSTANCE')
  yield all([
    takeEvery(pluginInstanceFindAll.type, onModuleFindAll),
    takeEvery(pluginInstanceCreate.type, onModuleCreate),
    takeEvery(pluginInstanceUpdate.type, onModuleUpdate),
    takeEvery(pluginInstanceDelete.type, onModuleDelete),
  ])
}
