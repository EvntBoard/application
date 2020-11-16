import { put, takeEvery, all, call } from 'redux-saga/effects'

import { sessionGet as IPCSessionGet } from '../../service/sessionService'

import {
  sessionGet,
  sessionGetSuccess,
  sessionGetFailed,
} from './'

function* onSessionGet() {
  try {
    const data = yield call(IPCSessionGet)
    console.log({ data })
    yield put(sessionGetSuccess(data))
  } catch (e) {
    yield put(sessionGetFailed())
  }
}

export function* saga() {
  console.debug('SAGA - SESSION')
  yield all([
    takeEvery(sessionGet.type, onSessionGet),
  ])
}
