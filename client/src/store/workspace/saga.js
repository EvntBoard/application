import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  workspaceGetCurrent as IPCworkspaceGetCurrent,
  workspaceSwitch as IPCworkspaceSwitch
} from '../../service/workspaceService'

import {
  workspaceGet,
  workspaceGetSuccess,
  workspaceGetFailed,
  workspaceSet,
  workspaceSetSuccess,
  workspaceSetFailed,
  workspaceOnChange
} from './'

function* onWorkspaceGet() {
  try {
    const data = yield call(IPCworkspaceGetCurrent)
    yield put(workspaceGetSuccess(data))
  } catch (e) {
    yield put(workspaceGetFailed(e))
  }
}

function* onWorkspaceSet({ payload }) {
  try {
    const data = yield call(IPCworkspaceSwitch, payload)
    yield put(workspaceSetSuccess(data))
  } catch (e) {
    yield put(workspaceSetFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - WORKSPACE')
  yield all([
    takeEvery(workspaceGet.type, onWorkspaceGet),
    takeEvery(workspaceSet.type, onWorkspaceSet)
  ])
}
