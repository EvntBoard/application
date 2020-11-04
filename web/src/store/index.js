import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import rootSaga from './saga'
import webSocketMiddleware from './middleware/WebSocketMiddleware'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware).concat(webSocketMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store
