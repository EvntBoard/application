import { all } from 'redux-saga/effects'

import { configSaga } from './config'
import { boardSaga } from './board'
import { buttonSaga } from './button'
import { langSaga } from './lang'
import { menuSaga } from './menu'
import { themeSaga } from './theme'
import { triggerSaga } from './trigger'
import { webserverSaga } from './webserver'
import { workspaceSaga } from './workspace'
import { moduleSaga } from './module'

export default function* rootSaga() {
  yield all([
    configSaga(),
    boardSaga(),
    buttonSaga(),
    langSaga(),
    menuSaga(),
    themeSaga(),
    triggerSaga(),
    webserverSaga(),
    workspaceSaga(),
    moduleSaga(),
  ])
}
