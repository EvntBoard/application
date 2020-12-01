import { combineReducers } from '@reduxjs/toolkit'

import configReducer from './config'
import boardReducer from './board'
import buttonReducer from './button'
import langReducer from './lang'
import menuReducer from './menu'
import themeReducer from './theme'
import triggerReducer from './trigger'
import webserverReducer from './webserver'
import workspaceReducer from './workspace'
import eventHistoryReducer from './eventHistory'
import pluginReducer from './plugin'
import sessionReducer from './session'
import cacheReducer from './cache'
import debugConfigReducer from './debugConfig'

export default combineReducers({
  config: configReducer,
  board: boardReducer,
  button: buttonReducer,
  lang: langReducer,
  menu: menuReducer,
  theme: themeReducer,
  trigger: triggerReducer,
  workspace: workspaceReducer,
  webserver: webserverReducer,
  eventHistory: eventHistoryReducer,
  plugin: pluginReducer,
  session: sessionReducer,
  cache: cacheReducer,
  debugConfig: debugConfigReducer
})
