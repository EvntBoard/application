import React from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from './layout/Main'
import App from './views/App'
import Trigger from './views/Trigger'
import Board from './views/Board'
import Debug from './views/Debug'
import ConfigGlobal from './views/ConfigGlobal'
import ConfigPlugin from './views/ConfigPlugin'

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/board', element: <Board /> },
      { path: '/trigger', element: <Trigger /> },
      { path: '/debug', element: <Debug /> },
      { path: '/plugin', element: <ConfigPlugin /> },
      { path: '/config', element: <ConfigGlobal /> },
      { path: '/404', element: <div>404</div> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
