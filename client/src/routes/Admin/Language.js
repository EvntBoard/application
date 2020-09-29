import React from 'react'
import intl from 'react-intl-universal'

import { useLangContext } from '../../context/lang'

export default () => {
  const { locale, setLocale, APP_LOCALES } = useLangContext()

  const onSelectLocale = (e) => {
    const lang = e.target.value;
    setLocale(lang)
  }

  return (
    <div>
      <h1>{intl.get('app.admin.language.title')}</h1>
      {intl.get('app.admin.language.change')}
      <select onChange={onSelectLocale} value={locale || ''}>
        <option value="" disabled>{intl.get('app.admin.language.change')}</option>
        {APP_LOCALES.map(iLocale => (
          <option key={iLocale} value={iLocale}>{intl.get(iLocale)}</option>
        ))}
      </select>
    </div>
  )
}
