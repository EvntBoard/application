import React from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from './layout/Main'
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
      { path: '/config', element: <Config /> },
      { path: '/707', element: <div>404</div> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
