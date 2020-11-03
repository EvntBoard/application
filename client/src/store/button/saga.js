import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  buttonFindAll as IPCbuttonFindAll,
  buttonCreate as IPCbuttonCreate,
  buttonDelete as IPCbuttonDelete,
  buttonUpdate as IPCbuttonUpdate,
} from '../../service/buttonService'

import {
  buttonFindAll,
  buttonFindAllSuccess,
  buttonFindAllFailed,
  buttonCreate,
  buttonCreateSuccess,
  buttonCreateFailed,
  buttonUpdate,
  buttonUpdateSuccess,
  buttonUpdateFailed,
  buttonDelete,
  buttonDeleteSuccess,
  buttonDeleteFailed,
} from './'

function* onButtonFindAll() {
  try {
    const data = yield call(IPCbuttonFindAll)
    yield put(buttonFindAllSuccess(data))
  } catch (e) {
    yield put(buttonFindAllFailed(e))
  }
}

function* onButtonCreate({ payload }) {
  try {
    const data = yield call(IPCbuttonCreate, payload)
    yield put(buttonCreateSuccess(data))
  } catch (e) {
    yield put(buttonCreateFailed(e))
  }
}

function* onButtonUpdate({ payload }) {
  try {
    const data = yield call(IPCbuttonUpdate, payload)
    yield put(buttonUpdateSuccess(data))
  } catch (e) {
    yield put(buttonUpdateFailed(e))
  }
}

function* onButtonDelete({ payload }) {
  try {
    yield call(IPCbuttonDelete, payload)
    yield put(buttonDeleteSuccess(payload))
  } catch (e) {
    yield put(buttonDeleteFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - BUTTON')
  yield all([
    takeEvery(buttonFindAll.type, onButtonFindAll),
    takeEvery(buttonCreate.type, onButtonCreate),
    takeEvery(buttonUpdate.type, onButtonUpdate),
    takeEvery(buttonDelete.type, onButtonDelete),
  ])
}
