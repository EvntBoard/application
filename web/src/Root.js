import React, {useEffect, useMemo} from 'react'
import { useRoutes } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { darkTheme, lightTheme } from './themes'
import { langGet, selectors as langSelectors } from './store/lang'
import { themeGet, selectors as themeSelectors } from './store/theme'
import { buttonFindAll } from './store/button'
import { boardFindAll } from './store/board'
import { wsConnect } from './store/websocket'
import allMessages from './messages'
import routes from './routes'

const Root = () => {
  const dispatch = useDispatch()

  const currentLocale = useSelector(langSelectors.lang)
  const currentTheme = useSelector(themeSelectors.theme)

  useEffect(() => {
    dispatch(langGet())
    dispatch(themeGet())
    dispatch(buttonFindAll())
    dispatch(boardFindAll())
    dispatch(wsConnect({ url: 'ws://localhost:5123/ws' }))
  }, [dispatch])

  const routing = useRoutes(routes)

  const messages = useMemo(() => allMessages[currentLocale], [currentLocale])

  return (
    <MuiThemeProvider theme={createMuiTheme(currentTheme === 'light' ? lightTheme : darkTheme)}>
      <CssBaseline />
      <IntlProvider messages={messages} locale={currentLocale} defaultLocale="en">
        {routing}
      </IntlProvider>
    </MuiThemeProvider>
  )
}

export default Root
