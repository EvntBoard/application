import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import Menu from './Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    overflow: 'hidden',
    flexGrow: 1
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'auto',
    flexDirection: 'column'
  },
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Menu />
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
