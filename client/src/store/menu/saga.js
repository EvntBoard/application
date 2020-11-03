import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  menuGet as IPCmenuGet,
  menuSet as IPCmenuSet,
} from '../../service/menuService'

import {
  menuGet,
  menuGetSuccess,
  menuGetFailed,
  menuSet,
  menuSetSuccess,
  menuSetFailed,
} from './'

function* onMenuGet() {
  try {
    const data = yield call(IPCmenuGet)
    yield put(menuGetSuccess(data))
  } catch (e) {
    yield put(menuGetFailed(e))
  }
}

function* onMenuSet({ payload }) {
  try {
    const data = yield call(IPCmenuSet, payload)
    yield put(menuSetSuccess(data))
  } catch (e) {
    yield put(menuSetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - MENU')
  yield all([
    takeEvery(menuGet.type, onMenuGet),
    takeEvery(menuSet.type, onMenuSet),
  ])
}
