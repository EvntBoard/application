import React, {useEffect, useState} from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link as MuiLink } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import M from '../../messages/constants'

const useStyles = makeStyles((theme) => ({
  header: {
    flexShrink: 0,
    overflow: 'hidden'
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'auto',
    paddingTop: theme.spacing(2)
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const ConfigLayout = () => {
  const intl = useIntl()
  const classes = useStyles()

  const { pathname } = useLocation()
  const [activeItem, setActiveItem] = useState('global')

  useEffect(() => {
    let pathnameNormalize = pathname.split('/').filter((i) => i !== null && i !== "").join('-')

    if (pathnameNormalize === undefined) {
      pathnameNormalize = 'config-global'
    }

    setActiveItem(pathnameNormalize)
  }, [pathname])

  return (
    <>
      <div className={classes.header}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <nav>
              <MuiLink component={Link} to="/config/global" selected={activeItem === 'config-global'} variant="button" color="textPrimary" className={classes.link}>
                {intl.formatMessage({ id: M.AppSettingsMenuGlobal })}
              </MuiLink>
              <MuiLink component={Link} to="/config/module" selected={activeItem === 'config-module'} variant="button" color="textPrimary" className={classes.link}>
                {intl.formatMessage({ id: M.AppSettingsMenuModule })}
              </MuiLink>
            </nav>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </>
  )
}
export default ConfigLayout
