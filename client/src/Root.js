import React from 'react'
import {
  MemoryRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from '@material-ui/core/Container';

import Menu from './components/Menu'
import App from './routes/App'
import Board from './routes/Board'
import Trigger from './routes/Trigger'
import Config from './routes/Config'
import { useStyles } from './assets/styles'

const Root = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Menu />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/">
                <App />
              </Route>
              <Route path="/board">
                <Board />
              </Route>
              <Route path="/trigger">
                <Trigger />
              </Route>
              <Route path="/config">
                <Config />
              </Route>
              <Route path="*">
                WTF
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
  )
}

export default Root
