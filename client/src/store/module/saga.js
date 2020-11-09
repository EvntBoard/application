import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  moduleFindAll as IPCmoduleFindAll,
  moduleCreate as IPCmoduleCreate,
  moduleDelete as IPCmoduleDelete,
  moduleUpdate as IPCmoduleUpdate,
} from '../../service/moduleService'

import {
  moduleFindAll,
  moduleFindAllSuccess,
  moduleFindAllFailed,
  moduleCreate,
  moduleCreateSuccess,
  moduleCreateFailed,
  moduleUpdate,
  moduleUpdateSuccess,
  moduleUpdateFailed,
  moduleDelete,
  moduleDeleteSuccess,
  moduleDeleteFailed,
} from './'

function* onModuleFindAll() {
  try {
    const data = yield call(IPCmoduleFindAll)
    yield put(moduleFindAllSuccess(data))
  } catch (e) {
    yield put(moduleFindAllFailed(e))
  }
}

function* onModuleCreate({ payload }) {
  try {
    const data = yield call(IPCmoduleCreate, payload)
    yield put(moduleCreateSuccess(data))
  } catch (e) {
    yield put(moduleCreateFailed(e))
  }
}

function* onModuleUpdate({ payload }) {
  try {
    const data = yield call(IPCmoduleUpdate, payload)
    yield put(moduleUpdateSuccess(data))
  } catch (e) {
    yield put(moduleUpdateFailed(e))
  }
}

function* onModuleDelete({ payload }) {
  try {
    yield call(IPCmoduleDelete, payload)
    yield put(moduleDeleteSuccess(payload))
  } catch (e) {
    yield put(moduleDeleteFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - MODULE')
  yield all([
    takeEvery(moduleFindAll.type, onModuleFindAll),
    takeEvery(moduleCreate.type, onModuleCreate),
    takeEvery(moduleUpdate.type, onModuleUpdate),
    takeEvery(moduleDelete.type, onModuleDelete),
  ])
}
