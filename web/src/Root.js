import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Provider from './context'

import Home from './routes/Home'

export default () => {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            404
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}
