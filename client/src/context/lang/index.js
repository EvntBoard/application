import React, {useContext, useEffect, useMemo, useState} from "react";

import {langGet, langSet} from '../../service/langService'
import allMessages from './messages'
import {IntlProvider} from 'react-intl'

export const LangContext = React.createContext(undefined)
export const useLangContext = () => useContext(LangContext)

export const LangProvider = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState("en")

  useEffect(() => {
    langGet().then((lang) => {
      setCurrentLocale(lang)
    })
  }, [])

  const setLocaleOverrided = (lang) => {
    langSet(lang).then((newLang) => {
      setCurrentLocale(newLang)
    })
  }

  const messages = useMemo(() => allMessages[currentLocale], [currentLocale])

  return (
    <LangContext.Provider value={{
      locale: currentLocale,
      setLocale: setLocaleOverrided
    }}>
      <IntlProvider messages={messages} locale={currentLocale} defaultLocale="en">
      {children}
      </IntlProvider>
    </LangContext.Provider>
  )
}
