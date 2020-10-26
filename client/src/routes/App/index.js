import React from 'react'
import { useIntl} from 'react-intl'

import {useThemeContext} from '../../context/theme'
import {useLangContext} from '../../context/lang'
import MSG from '../../context/lang/messages/constants'

function App() {
  const intl = useIntl()
  const { theme, setTheme } = useThemeContext()
  const { locale, setLocale } = useLangContext()

  return (
    <div className="App">
      <div>
        <div>{intl.formatMessage({ id: MSG.AppMenuSettings })} : {locale}</div>

        <select value={locale} onChange={(e) => setLocale(e.target.value)}>
          <option value='fr'>fr</option>
          <option value='en'>en</option>
        </select>
      </div>
      <div>
        <div>Current theme : {theme}</div>

        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value='dark'>Dark</option>
          <option value='light'>Light</option>
        </select>
      </div>
    </div>
  );
}

export default App;
