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
import { pluginSaga } from './plugin'
import { sessionSaga } from './session'
import { cacheSaga } from './cache'
import { eventHistorySaga } from './eventHistory'
import { debugConfigSaga } from './debugConfig'

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
    pluginSaga(),
    cacheSaga(),
    sessionSaga(),
    eventHistorySaga(),
    debugConfigSaga(),
  ])
}
