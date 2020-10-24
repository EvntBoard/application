import React, {useContext, useEffect, useMemo, useState} from "react";

import enMessages from '../lang/langEn'
import frMessages from '../lang/langFr'
import {langGet, langSet} from '../services/LangService'
import {ILang} from "../shared/types";

export interface ILangContext {
  messages: any;
  locale: string;
  defaultLocale: string;
  setLocale: (lang:string) => void;
  availableLocale: string[];
}

export const LangContext = React.createContext<ILangContext>({ defaultLocale: ILang.EN, locale: ILang.EN, messages: {}, setLocale: () => null, availableLocale: [] })
export const useLangContext = () => useContext(LangContext)

const allMessages: {[key: string]: object} = {
  en: enMessages,
  fr: frMessages
}

export const LangProvider = ({ children }: any) => {
  const [defaultLocale] = useState<string>(ILang.EN)
  const [locale, setLocale] = useState<string>(ILang.EN)

  useEffect(() => {
    langGet().then((lang) => {
      setLocale(lang)
    })
  }, [])

  const setLocaleOverrided = (lang: string) => {
    langSet(lang as ILang).then((newLang) => {
      setLocale(newLang)
    })
  }

  const messages = useMemo(() => allMessages[locale], [locale])

  return (
    <LangContext.Provider value={{ messages, defaultLocale, locale, setLocale: setLocaleOverrided
      , availableLocale: Object.keys(allMessages) }}>
      {children}
    </LangContext.Provider>
  )
}
