import { combineReducers } from 'redux'

import boardReducer from './boards'
import websocketReducer from './websocket'

export default combineReducers({
  boards: boardReducer,
  websocket: websocketReducer
})
