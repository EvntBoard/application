import axios from 'axios'
import { put, takeEvery, all, call } from 'redux-saga/effects'


import {
  themeGet,
  themeGetSuccess,
  themeGetFailed,
} from './'

function* onThemeGet() {
  try {
    const { data } = yield call(axios.get, '/api/theme')
    yield put(themeGetSuccess(data))
  } catch (e) {
    yield put(themeGetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - THEME')
  yield all([
    takeEvery(themeGet.type, onThemeGet)
  ])
}
