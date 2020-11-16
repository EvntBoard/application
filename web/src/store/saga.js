import { all } from 'redux-saga/effects'

import { boardSaga } from './board'
import { buttonSaga } from './button'
import { langSaga } from './lang'
import { themeSaga } from './theme'
import { sessionSaga } from './session'
import { cacheSaga } from './cache'

export default function* rootSaga() {
  yield all([
    boardSaga(),
    buttonSaga(),
    langSaga(),
    themeSaga(),
    sessionSaga(),
    cacheSaga(),
  ])
}
