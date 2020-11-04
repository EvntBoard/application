import { combineReducers } from '@reduxjs/toolkit'

import boardReducer from './board'
import buttonReducer from './button'
import langReducer from './lang'
import themeReducer from './theme'
import websocketReducer from './websocket'

export default combineReducers({
  board: boardReducer,
  button: buttonReducer,
  lang: langReducer,
  theme: themeReducer,
  websocket: websocketReducer
})