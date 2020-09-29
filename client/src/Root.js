import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Menu from './components/Menu'
import Provider from './context'
import AppProvider from './context/app'
import LangProvider from './context/lang'

import Home from './routes/Home'
import Board from './routes/Board'
import Trigger from './routes/Trigger'
import Admin from './routes/Admin'
import Template from './routes/Template'

export default () => {
  return (
    <LangProvider>
      <AppProvider>
        <Provider>
          <Router>
            <Menu />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/board">
                <Board />
              </Route>
              <Route path="/trigger">
                <Trigger />
              </Route>
              <Route path="/template">
                <Template />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="*">
                404
              </Route>
            </Switch>
          </Router>
        </Provider>
      </AppProvider>
    </LangProvider>
  )
}
