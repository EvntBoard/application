import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  eventHistoryGet as IPCeventHistoryGet
} from '../../service/eventHistoryService'

import {
  eventHistoryGet,
  eventHistoryGetFailed,
  eventHistoryGetSuccess
} from './'

function* onLangGet() {
  try {
    const data = yield call(IPCeventHistoryGet)
    yield put(eventHistoryGetSuccess(data))
  } catch (e) {
    yield put(eventHistoryGetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - EVENT HISTORY')
  yield all([
    takeEvery(eventHistoryGet.type, onLangGet),
  ])
}
