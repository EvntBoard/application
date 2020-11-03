import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  themeGet as IPCthemeGet,
  themeSet as IPCthemeSet,
} from '../../service/themeService'

import {
  themeGet,
  themeGetSuccess,
  themeGetFailed,
  themeSet,
  themeSetSuccess,
  themeSetFailed,
} from './'

function* onLangGet() {
  try {
    const data = yield call(IPCthemeGet)
    yield put(themeGetSuccess(data))
  } catch (e) {
    yield put(themeGetFailed(e))
  }
}

function* onLangSet({ theme }) {
  try {
    const data = yield call(IPCthemeSet, theme)
    yield put(themeSetSuccess(data))
  } catch (e) {
    yield put(themeSetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - THEME')
  yield all([
    takeEvery(themeGet.type, onLangGet),
    takeEvery(themeSet.type, onLangSet),
  ])
}
