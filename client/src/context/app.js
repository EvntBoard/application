import React, { createContext, useState } from 'react'

const AppContext = createContext(undefined)

const Provider = ({children}) => {
  const [cacheBoard, setCacheBoard] = useState(null)

  return (
    <AppContext.Provider value={{ cacheBoard, setCacheBoard }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useLangContext must be used within a DispatchContext')
  }
  return context
}

export default Provider
