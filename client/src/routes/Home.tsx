import React from 'react';
import { useIntl } from "react-intl";

function Home() {
  const intl = useIntl()
  return (
    <div className="App">
     Home
      <p>
        {intl.formatMessage({ id: "myMessage" }, {ts: Date.now()})}
        <br />
        {intl.formatNumber(19, { currency: "EUR", style: "currency" })}
      </p>
    </div>
  );
}

export default Home;
