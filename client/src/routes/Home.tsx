import React from 'react';
import { useIntl } from "react-intl";
import { useLangContext } from "../components/LangProvider";

function Home() {
  const intl = useIntl()
  const { locale, availableLocale, setLocale } = useLangContext()
  return (
    <div className="App">
     Home
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>{
        availableLocale.map(i => <option key={i} value={i}>{i}</option>)
      }</select>
      <p>
        {intl.formatMessage({ id: "myMessage" }, {ts: Date.now()})}
        <br />
        {intl.formatNumber(19, { currency: "EUR", style: "currency" })}
      </p>
    </div>
  );
}

export default Home;
