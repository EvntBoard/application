import { combineReducers } from 'redux'

import configReducer from './feature/config'
import boardReducer from './feature/board'
import buttonReducer from './feature/button'
import langReducer from './feature/lang'
import menuReducer from './feature/menu'
import themeReducer from './feature/theme'
import triggerReducer from './feature/trigger'
import websocketReducer from './feature/websocket'
import webserverReducer from './feature/webserver'
import workspaceReducer from './feature/workspace'

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
  websocket: websocketReducer
})
