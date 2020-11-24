import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  triggerFindAll as IPCtriggerFindAll,
  triggerCreate as IPCtriggerCreate,
  triggerDelete as IPCtriggerDelete,
  triggerUpdate as IPCtriggerUpdate,
  triggerDuplicate as IPCtriggerDuplicate,
} from '../../service/triggerService'

import {
  triggerFindAll,
  triggerFindAllSuccess,
  triggerFindAllFailed,
  triggerCreate,
  triggerCreateSuccess,
  triggerCreateFailed,
  triggerUpdate,
  triggerUpdateSuccess,
  triggerUpdateFailed,
  triggerDelete,
  triggerDeleteSuccess,
  triggerDeleteFailed,
  triggerDuplicate,
  triggerDuplicateSuccess,
  triggerDuplicateFailed
} from './'

function* onTriggerFindAll() {
  try {
    const data = yield call(IPCtriggerFindAll)
    yield put(triggerFindAllSuccess(data))
  } catch (e) {
    yield put(triggerFindAllFailed(e))
  }
}

function* onTriggerCreate({ payload }) {
  try {
    const data = yield call(IPCtriggerCreate, payload)
    yield put(triggerCreateSuccess(data))
  } catch (e) {
    yield put(triggerCreateFailed(e))
  }
}

function* onTriggerDuplicate({ payload }) {
  try {
    const data = yield call(IPCtriggerDuplicate, payload)
    yield put(triggerDuplicateSuccess(data))
  } catch (e) {
    yield put(triggerDuplicateFailed(e))
  }
}

function* onTriggerUpdate({ payload }) {
  try {
    const data = yield call(IPCtriggerUpdate, payload)
    yield put(triggerUpdateSuccess(data))
  } catch (e) {
    yield put(triggerUpdateFailed(e))
  }
}

function* onTriggerDelete({ payload }) {
  try {
    yield call(IPCtriggerDelete, payload)
    yield put(triggerDeleteSuccess(payload))
  } catch (e) {
    yield put(triggerDeleteFailed(e))
  }
}

export function* saga() {
  console.debug('SAGA - TRIGGER')
  yield all([
    takeEvery(triggerFindAll.type, onTriggerFindAll),
    takeEvery(triggerCreate.type, onTriggerCreate),
    takeEvery(triggerUpdate.type, onTriggerUpdate),
    takeEvery(triggerDelete.type, onTriggerDelete),
    takeEvery(triggerDuplicate.type, onTriggerDuplicate),
  ])
}
