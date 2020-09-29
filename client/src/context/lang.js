import React, {createContext, useState, useEffect, useCallback} from 'react'
import intl from 'react-intl-universal'
import { Spinner } from '@blueprintjs/core'

export const APP_LOCALES = [ 'en-US', 'fr-FR' ]

const LangContext = createContext(undefined)

const Provider = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [locale, setLocale] = useState(localStorage.getItem('lang'))

  const loadLocale = useCallback(() => {
    setLoading(true)
    window.app.utils.locale(locale).then((data) => {
      intl.init({
        currentLocale: locale,
        locales: {
          [locale]: data
        }
      }).then(() => {
        setLoading(false)
      })
    })
  }, [locale])

  useEffect(() => {
    if (APP_LOCALES.includes(locale)) {
      setLocale(locale)
      localStorage.setItem('lang', locale);
      loadLocale()
    }
  }, [loadLocale, locale])

  useEffect(() => {
    let currentLocale = intl.determineLocale({ localStorageLocaleKey: 'lang' })

    if (!APP_LOCALES.includes(currentLocale)) {
      currentLocale = 'en-US'
    }

    setLocale(currentLocale)

    loadLocale()
  }, [loadLocale])

  if (loading) {
    return (
      <Spinner />
    )
  }

  return (
    <LangContext.Provider value={{ locale, setLocale, APP_LOCALES }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLangContext = () => {
  const context = React.useContext(LangContext)
  if (context === undefined) {
    throw new Error('useLangContext must be used within a DispatchContext')
  }
  return context
}

export default Provider
