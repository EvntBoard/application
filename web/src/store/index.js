import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducer'
import WebSocketMiddleware from './WebSocketMiddleware'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(WebSocketMiddleware)
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducer', () => {
    const newRootReducer = require('./reducer').default
    store.replaceReducer(newRootReducer)
  })
}

export default store
