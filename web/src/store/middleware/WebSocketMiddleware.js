import { io as SocketIoClient } from 'socket.io-client'

import {
  wsConnect,
  wsSend,
  wsDisconnect,
  wsOnClose,
  wsOnError,
  wsOnOpen
} from '../websocket'

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
        websocket.onmessage = (event) => {
         console.log(event)
        };
      } catch (e) {
        store.dispatch(wsOnError(e));
      }
      break;

    case wsSend.type:
      websocket.send(action.payload);
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
