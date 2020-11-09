import React from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from './layout/Main'
import ConfigLayout from './layout/Config'
import App from './views/App'
import Trigger from './views/Trigger'
import Board from './views/Board'
import Debug from './views/Debug'
import ConfigGlobal from './views/ConfigGlobal'
import ConfigModule from './views/ConfigModule'

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/board', element: <Board /> },
      { path: '/trigger', element: <Trigger /> },
      { path: '/debug', element: <Debug /> },
      {
        path: '/config',
        element: <ConfigLayout />,
        children: [
          { path: '/', element: <Navigate to="/config/global" /> },
          { path: '/global', element: <ConfigGlobal /> },
          { path: '/module', element: <ConfigModule /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      },
      { path: '/404', element: <div>404</div> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
