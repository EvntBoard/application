import React from 'react';
import ReactDOM from 'react-dom';

import AppProvider from './context';
import Root from './Root';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Root />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
