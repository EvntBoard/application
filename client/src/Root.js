import React, { useMemo } from 'react'
import { useRoutes } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import allMessages from './messages'
import routes from './routes'
import { darkTheme, lightTheme } from './themes'

const Root = () => {
  const currentLocale = useSelector(state => state.lang)
  const currentTheme = useSelector(state => state.theme)
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
