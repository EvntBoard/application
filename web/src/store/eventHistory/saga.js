import { put, takeEvery, all, call } from 'redux-saga/effects'
import axios from 'axios'

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
    const { data } = yield call(axios.get, '/api/eventhistory')
    yield put(eventHistoryGetSuccess(data))
  } catch (e) {
    yield put(eventHistoryGetFailed(e))
  }
}

function* onEventHistoryProcessGet() {
  try {
    const { data } = yield call(axios.get, '/api/processhistory')
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
