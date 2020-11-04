import React from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from './layout/Main'
import App from './views/App'
import Board from './views/Board'

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/board', element: <Board /> },
      { path: '/404', element: <div>404</div> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
