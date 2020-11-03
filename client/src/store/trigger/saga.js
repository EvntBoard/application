import { put, takeEvery, all, call } from 'redux-saga/effects'

import {
  triggerFindAll as IPCtriggerFindAll,
  triggerCreate as IPCtriggerCreate,
  triggerDelete as IPCtriggerDelete,
  triggerUpdate as IPCtriggerUpdate,
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
} from './'

function* onTriggerFindAll() {
  try {
    const data = yield call(IPCtriggerFindAll)
    yield put(triggerFindAllSuccess(data))
  } catch (e) {
    yield put(triggerFindAllFailed(e))
  }
}

function* onTriggerCreate({ devis }) {
  try {
    const data = yield call(IPCtriggerCreate, devis)
    yield put(triggerCreateSuccess(data))
  } catch (e) {
    yield put(triggerCreateFailed(e))
  }
}

function* onTriggerUpdate({ devis }) {
  try {
    const data = yield call(IPCtriggerUpdate, devis)
    yield put(triggerUpdateSuccess(data))
  } catch (e) {
    yield put(triggerUpdateFailed(e))
  }
}

function* onTriggerDelete({ devis }) {
  try {
    yield call(IPCtriggerDelete, devis)
    yield put(triggerDeleteSuccess(devis))
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
  ])
}
