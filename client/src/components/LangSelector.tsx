import React from 'react';
import { useIntl } from "react-intl";

import { useLangContext } from "./LangProvider";

const LangSelector = () => {
  const intl = useIntl()
  const { locale, availableLocale, setLocale } = useLangContext() // ILang

  return (
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocale.map(i => <option key={i} value={i}>{intl.formatMessage({ id: i })}</option>)}
      </select>
  );
}

export default LangSelector;
