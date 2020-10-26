import React, {useContext, useEffect, useState} from "react";

import {createMuiTheme, ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {themeSet, themeGet} from '../../service/themeService'
import { lightTheme, darkTheme } from './theme'

export const ThemeContext = React.createContext(undefined)
export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState()

  useEffect(() => {
    themeGet().then((theme) => {
      setCurrentTheme(theme)
    })
  }, [])

  const setThemeOverride = (theme) => {
    themeSet(theme).then((newTheme) => {
      setCurrentTheme(newTheme)
    })
  }

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      setTheme: setThemeOverride
    }}>
      <MuiThemeProvider theme={createMuiTheme(currentTheme === 'light' ? lightTheme : darkTheme)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
