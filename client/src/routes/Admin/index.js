import React, {useEffect, useState} from 'react'
import { Switch, Route, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import { Button, ButtonGroup } from '@blueprintjs/core'

import Account from './Account'
import Obs from './Obs'
import WS from './WS'
import Workspace from './Workspace'
import Language from './Language'
import Theme from './Theme'

import './assets/style.scss'
import intl from "react-intl-universal"

export default () => {
  const match = useRouteMatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    let pathnameNormalize = pathname.split('/').filter((i) => i !== null && i !== "")

    setActiveItem(pathnameNormalize[1])
  }, [pathname])

  const onClick = (url) => () => {
    history.push(`${match.path}/${url}`)
  }

  return (
    <div className='app-content admin'>
      <ButtonGroup>
        <Button onClick={onClick('account')} active={activeItem === 'account'}>{intl.get('app.admin.menu.account')}</Button>
        <Button onClick={onClick('obs')} active={activeItem === 'obs'}>{intl.get('app.admin.menu.obs')}</Button>
        <Button onClick={onClick('server')} active={activeItem === 'server'}>{intl.get('app.admin.menu.server')}</Button>
        <Button onClick={onClick('workspace')} active={activeItem === 'workspace'}>{intl.get('app.admin.menu.workspace')}</Button>
        <Button onClick={onClick('language')} active={activeItem === 'language'}>{intl.get('app.admin.menu.language')}</Button>
        <Button onClick={onClick('theme')} active={activeItem === 'theme'}>{intl.get('app.admin.menu.theme')}</Button>
      </ButtonGroup>
      <Switch>
        <Route exact path={match.path}>
          {intl.get('app.admin.none')}
        </Route>
        <Route path={`${match.path}/account`} component={Account} />
        <Route path={`${match.path}/obs`} component={Obs} />
        <Route path={`${match.path}/server`} component={WS} />
        <Route path={`${match.path}/workspace`} component={Workspace} />
        <Route path={`${match.path}/language`} component={Language} />
        <Route path={`${match.path}/theme`} component={Theme} />
      </Switch>
    </div>
  )
}
