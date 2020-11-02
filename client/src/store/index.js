import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import rootReducer from './reducer'

const logger = createLogger({
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(logger)
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducer', () => {
    const newRootReducer = require('./reducer').default
    store.replaceReducer(newRootReducer)
  })
}

export default store
