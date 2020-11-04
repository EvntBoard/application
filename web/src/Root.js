import React, { useMemo } from 'react'
import { useRoutes } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { darkTheme, lightTheme } from './themes'
import { selectors as langSelectors } from './store/lang'
import { selectors as themeSelectors } from './store/theme'
import allMessages from './messages'
import routes from './routes'

const Root = () => {
  const currentLocale = useSelector(langSelectors.lang)
  const currentTheme = useSelector(themeSelectors.theme)

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
