import React from 'react'
import {
  MemoryRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from '@material-ui/core/Container';

import Menu from './components/Menu'
import App from './routes/App'
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
              <Route path="/about">
                <App />
              </Route>
              <Route path="/users">
                <App />
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
  )
}

export default Root
