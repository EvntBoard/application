import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import rootReducer from './reducer'
import WebSocketMiddleware from './middleware/WebSocket'

const logger = createLogger({
  // ...options
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(WebSocketMiddleware).concat(logger)
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducer', () => {
    const newRootReducer = require('./reducer').default
    store.replaceReducer(newRootReducer)
  })
}

export default store
