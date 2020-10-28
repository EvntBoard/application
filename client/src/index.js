import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import Root from './Root';

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Root />
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);
