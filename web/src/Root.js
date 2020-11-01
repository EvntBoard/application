import React from 'react'
import { Provider } from 'react-redux'

import GlobalStyles from './components/GlobalStyles'
import App from './views/App'

import store from './store';

const Root = () => {
  return (
    <Provider store={store}>
      <>
        <GlobalStyles />
        <App />
      </>
    </Provider>
  )
}

export default Root
