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
      Main
    </div>
  );
}

export default App;
