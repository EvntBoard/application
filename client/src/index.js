import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'

import GlobalStyles from './components/GlobalStyles'
import Root from './Root'
import store from './store'

Map.prototype.inspect = function() {
  return `Map(${mapEntriesToString(this.entries())})`
}

function mapEntriesToString(entries) {
  return Array
    .from(entries, ([k, v]) => `\n  ${k}: ${v}`)
    .join("") + "\n";
}

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
