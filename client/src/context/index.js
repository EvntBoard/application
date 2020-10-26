import React from 'react'

import { LangProvider } from './lang'
import { ThemeProvider } from './theme'

const Provider = ({ children }) => (
  <ThemeProvider>
    <LangProvider>
      {children}
    </LangProvider>
  </ThemeProvider>
)

export default Provider
