import { io as SocketIoClient } from 'socket.io-client'

import {
  wsConnect,
  wsCreateEvent,
  wsDisconnect,
  wsOnClose,
  wsOnError,
  wsOnOpen
} from '../websocket'
import { boardCreate, boardUpdate, boardDelete } from '../board'
import { buttonCreate, buttonUpdate, buttonDelete, buttonDeleteForBoard } from '../button'
import { langOnChange } from '../lang'
import { themeOnChange } from '../theme'
import { sessionOnChange } from '../session'
import { cacheOnChange } from '../cache'

import { eventHistoryOnNew, eventHistoryProcessOnStart, eventHistoryProcessOnEnd, eventHistoryProcessOnError } from '../eventHistory'

let websocket;

const middleware = store => next => action => {
  switch (action.type) {
    case wsConnect.type:
      // Configure the object
      try {
        websocket = new SocketIoClient({ path: '/ws' });

        // Attach the callbacks
        websocket.on('connect', () => store.dispatch(wsOnOpen(websocket.id)));
        websocket.on('error', (event) => store.dispatch(wsOnError(event)));
        websocket.on('disconnect', (event) => store.dispatch(wsOnClose(event)));

        // Board
        websocket.on('boardCreate', (board) => {
          store.dispatch(boardCreate(board))
        })

        websocket.on('boardUpdate', (board) => {
          store.dispatch(boardUpdate(board))
        })

        websocket.on('boardDelete', (board) => {
          store.dispatch(boardDelete(board))
          store.dispatch(buttonDeleteForBoard(board))
        })

        // Button
        websocket.on('buttonCreate', (button) => {
          store.dispatch(buttonCreate(button))
        })

        websocket.on('buttonUpdate', (button) => {
          store.dispatch(buttonUpdate(button))
        })

        websocket.on('buttonDelete', (button) => {
          store.dispatch(buttonDelete(button))
        })

        // Lang
        websocket.on('langSet', (lang) => {
          store.dispatch(langOnChange(lang))
        })

        // Theme
        websocket.on('themeSet', (theme) => {
          store.dispatch(themeOnChange(theme))
        })

        // events
        websocket.on('newEvent', (data) => {
          store.dispatch(eventHistoryOnNew(data))
        })

        // process
        websocket.on('startProcessEvent', (data) => {
          store.dispatch(eventHistoryProcessOnStart(data))
        })
        websocket.on('endProcessEvent', (data) => {
          store.dispatch(eventHistoryProcessOnEnd(data))
        })
        websocket.on('errorProcessEvent', (data) => {
          store.dispatch(eventHistoryProcessOnError(data))
        })

        // session
        websocket.on('sessionUpdate', (data) => {
          store.dispatch(sessionOnChange(data))
        })

        // cache
        websocket.on('cacheUpdate', (data) => {
          store.dispatch(cacheOnChange(data))
        })

      } catch (e) {
        store.dispatch(wsOnError(e));
      }
      break;

    case wsCreateEvent.type:
      websocket.emit('createEvent', action.payload)
      break;

    case wsDisconnect.type:
      websocket.close();
      break;

    default: // We don't really need the default but ...
      break;
  }

  return next(action)
};

export default middleware
