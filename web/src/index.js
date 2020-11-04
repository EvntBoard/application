import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

import GlobalStyles from './components/GlobalStyles'
import Root from './Root'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <>
      <GlobalStyles />
      <Router>
        <Root />
      </Router>
    </>
  </Provider>,
  document.getElementById('root')
);
