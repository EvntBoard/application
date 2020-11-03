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

import { themeGet } from '../theme'
import { langGet } from '../lang'
import { configGet } from '../config'
import { menuGet } from '../menu'

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

function* onWorkspaceChange() {
  yield all([
    put(themeGet()),
    put(langGet()),
    put(configGet()),
    put(menuGet())
  ])
}

export function* saga() {
  console.debug('SAGA - WORKSPACE')
  yield all([
    takeEvery(workspaceGet.type, onWorkspaceGet),
    takeEvery(workspaceSet.type, onWorkspaceSet),
    takeEvery(workspaceOnChange.type, onWorkspaceChange),
  ])
}
