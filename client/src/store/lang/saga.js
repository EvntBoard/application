import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  langGet as IPClangGet,
  langSet as IPClangSet,
} from '../../service/langService'

import {
  langGet,
  langGetSuccess,
  langGetFailed,
  langSet,
  langSetSuccess,
  langSetFailed,
} from './'

function* onLangGet() {
  try {
    const data = yield call(IPClangGet)
    yield put(langGetSuccess(data))
  } catch (e) {
    yield put(langGetFailed(e))
  }
}

function* onLangSet({ lang }) {
  try {
    const data = yield call(IPClangSet, lang)
    yield put(langSetSuccess(data))
  } catch (e) {
    yield put(langSetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - LANG')
  yield all([
    takeEvery(langGet.type, onLangGet),
    takeEvery(langSet.type, onLangSet),
  ])
}
