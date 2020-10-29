import React from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from './layout/Main'
import ConfigLayout from './layout/Config'
import App from './views/App'
import Trigger from './views/Trigger'
import Board from './views/Board'
import Config from './views/Config'

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/board', element: <Board /> },
      { path: '/trigger', element: <Trigger /> },
      {
        path: '/config',
        element: <ConfigLayout />,
        children: [
          { path: '/', element: <Navigate to="/config/global" /> },
          { path: '/global', element: <Config /> },
          { path: '/module', element: <div>module</div> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      },
      { path: '/404', element: <div>404</div> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
