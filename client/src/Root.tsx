import React, {useEffect} from 'react';
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProvider } from 'react-intl'

import Home from './routes/Home'
import Board from './routes/Board'
import Trigger from './routes/Trigger'
import Config from './routes/Config'

import Menu from './components/Menu'
import { useLangContext } from "./components/LangProvider";
import {themeGet} from "./services/ThemeService";

export default () => {
  const { messages, locale, defaultLocale }: any = useLangContext()

  useEffect(() => {
    // init theme :)
    themeGet()
  }, [])

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
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
          <Route path="/config">
            <Config />
          </Route>
          <Route path="*">
            How do you get there ?!
          </Route>
        </Switch>
      </Router>
    </IntlProvider>
  );
}
