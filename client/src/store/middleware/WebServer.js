import {
  wsConnect,
  wsSend,
  wsDisconnect,
  wsOnClose,
  wsOnError,
  wsOnMessage,
  wsOnOpen
} from '../feature/websocket'

let websocket;

/**
 * An example middleware to handle WebSocket connections.
 * NB: There is no exception handling!
 */
const middleware = store => next => action => {
  switch (action.type) {
    case wsConnect.type:
      // Configure the object
      websocket = new WebSocket(action.payload.url);

      // Attach the callbacks
      websocket.onopen = () => store.dispatch(wsOnOpen());
      websocket.onerror = (event) => store.dispatch(wsOnError(event));
      websocket.onclose = (event) => store.dispatch(wsOnClose(event));
      websocket.onmessage = (event) => store.dispatch(wsOnMessage(event));

      break;

    case wsSend.type:
      websocket.send(JSON.stringify(action.payload));
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
