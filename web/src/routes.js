import React from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from './layout/Main'
import App from './views/App'

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/404', element: <div>404</div> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
