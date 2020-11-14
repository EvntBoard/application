import { io as SocketIoClient } from 'socket.io-client'

import {
  wsConnect,
  wsNewEvent,
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


        websocket.on('buttonCreate', (button) => {
          store.dispatch(buttonCreate(button))
        })

        websocket.on('buttonUpdate', (button) => {
          store.dispatch(buttonUpdate(button))
        })

        websocket.on('buttonDelete', (button) => {
          store.dispatch(buttonDelete(button))
        })

        websocket.on('langSet', (lang) => {
          store.dispatch(langOnChange(lang))
        })

        websocket.on('themeSet', (theme) => {
          store.dispatch(themeOnChange(theme))
        })

      } catch (e) {
        store.dispatch(wsOnError(e));
      }
      break;

    case wsNewEvent.type:
      websocket.emit('newEvent', action.payload)
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
