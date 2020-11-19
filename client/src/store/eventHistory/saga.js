import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  eventHistoryGet as IPCeventHistoryGet,
  eventHistoryGetProcess as IPCeventHistoryProccessGet
} from '../../service/eventHistoryService'

import {
  eventHistoryGet,
  eventHistoryGetFailed,
  eventHistoryGetSuccess,

  eventHistoryProcessGet,
  eventHistoryProcessGetFailed,
  eventHistoryProcessGetSuccess
} from './'

function* onEventHistoryGet() {
  try {
    const data = yield call(IPCeventHistoryGet)
    yield put(eventHistoryGetSuccess(data))
  } catch (e) {
    yield put(eventHistoryGetFailed(e))
  }
}

function* onEventHistoryProcessGet() {
  try {
    const data = yield call(IPCeventHistoryProccessGet)
    yield put(eventHistoryProcessGetSuccess(data))
  } catch (e) {
    yield put(eventHistoryProcessGetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - EVENT HISTORY')
  yield all([
    takeEvery(eventHistoryGet.type, onEventHistoryGet),
    takeEvery(eventHistoryProcessGet.type, onEventHistoryProcessGet),
  ])
}
