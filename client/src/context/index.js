import React from 'react'

import { LangProvider } from './lang'
import { ThemeProvider } from './theme'
import { MenuProvider } from './menu'

const Provider = ({ children }) => (
  <ThemeProvider>
    <LangProvider>
      <MenuProvider>
        {children}
      </MenuProvider>
    </LangProvider>
  </ThemeProvider>
)

export default Provider
