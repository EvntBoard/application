import React, {useContext, useMemo, useState} from "react";

import enMessages from '../lang/langEn'
import frMessages from '../lang/langFr'

export interface ILangContext {
  messages: any;
  locale: string;
  defaultLocale: string;
  setLocale: (lang:string) => void;
  availableLocale: string[];
}

export const LangContext = React.createContext<ILangContext>({ defaultLocale: "en", locale: "en", messages: {}, setLocale: () => null, availableLocale: [] })
export const useLangContext = () => useContext(LangContext)

const allMessages: {[key: string]: object} = {
  en: enMessages,
  fr: frMessages
}

export const LangProvider = ({ children }: any) => {
  const [defaultLocale] = useState("en")
  const [locale, setLocale] = useState("fr")

  const messages = useMemo(() => allMessages[locale], [locale])

  return (
    <LangContext.Provider value={{ messages, defaultLocale, locale, setLocale, availableLocale: Object.keys(allMessages) }}>
      {children}
    </LangContext.Provider>
  )
}
