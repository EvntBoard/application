import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import axios from 'axios'

import {
  sessionGet,
  sessionGetSuccess,
  sessionGetFailed,
} from './'

function* onSessionGet() {
  try {
    const id = yield select(state => state.websocket.id)
    if (id) {
      const {data} = yield call(axios.get, `/api/session?id=${id}`)
      yield put(sessionGetSuccess(data))
    }
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
