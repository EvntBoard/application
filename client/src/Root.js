import React from 'react'
import { useRoutes } from 'react-router-dom';

import routes from './routes'
import AppProvider from './context'
import GlobalStyles from './components/GlobalStyles'

const Root = () => {
  const routing = useRoutes(routes);
  return (
    <AppProvider>
      <GlobalStyles />
      {routing}
    </AppProvider>
  )
}

export default Root
