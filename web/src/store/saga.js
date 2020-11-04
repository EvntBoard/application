import { all } from 'redux-saga/effects'

import { boardSaga } from './board'
import { buttonSaga } from './button'
import { langSaga } from './lang'
import { themeSaga } from './theme'

export default function* rootSaga() {
  yield all([
    boardSaga(),
    buttonSaga(),
    langSaga(),
    themeSaga(),
  ])
}
