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

let websocket;

const middleware = store => next => action => {
  switch (action.type) {
    case wsConnect.type:
      // Configure the object
      try {
        websocket = new SocketIoClient({ path: '/ws' });

        // Attach the callbacks
        websocket.onopen = () => store.dispatch(wsOnOpen());
        websocket.onerror = (event) => store.dispatch(wsOnError(event));
        websocket.onclose = (event) => store.dispatch(wsOnClose(event));

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
        websocket.on('newEvent', (evnt) => {
          console.log({ newEvent: evnt })
        })
        websocket.on('startEvent', (evnt) => {
          console.log({ startEvent: evnt })
        })
        websocket.on('endEvent', (evnt) => {
          console.log({ endEvent: evnt })
        })
        websocket.on('errorEvent', (evnt, error) => {
          console.log({ errorEvent: evnt, error })
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
