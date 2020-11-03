import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  webServerGetStatus as IPCwebServerGetStatus,
} from '../../service/webServerService'

import {
  webserverGet,
  webserverGetSuccess,
  webserverGetFailed,
} from './'

function* onWebserverGet() {
  try {
    const data = yield call(IPCwebServerGetStatus)
    yield put(webserverGetSuccess(data))
  } catch (e) {
    yield put(webserverGetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - WEBSERVER')
  yield all([
    takeEvery(webserverGet.type, onWebserverGet)
  ])
}
