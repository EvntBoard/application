import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import rootReducer from './reducer'
import rootSaga from './saga'

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga)

export default store
