import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl'

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GridOnIcon from '@material-ui/icons/GridOn';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';

import M from '../../context/lang/messages/constants'
import { useMenuContext } from '../../context/menu'
import { useStyles } from './assets/styles'

const Menu = () => {
  const classes = useStyles();
  const intl = useIntl()
  const { menu: open, setMenu } = useMenuContext()
  const { pathname } = useLocation()
  const [activeItem, setActiveItem] = useState('home')

  useEffect(() => {
    let pathnameNormalize = pathname.split('/').filter((i) => i !== null && i !== "")[0]

    if (pathnameNormalize === undefined) {
      pathnameNormalize = 'home'
    }

    setActiveItem(pathnameNormalize)
  }, [pathname])

  const handleDrawerClose = () => {
    setMenu(!open);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <List className={clsx(classes.fullgrow)}>
        <ListItem button component={Link} to="/" selected={activeItem === 'home'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: M.AppMenuHome })} />
        </ListItem>
        <ListItem button component={Link} to="/board" selected={activeItem === 'board'}>
          <ListItemIcon>
            <GridOnIcon />
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: M.AppMenuBoard })} />
        </ListItem>
        <ListItem button component={Link} to="/trigger" selected={activeItem === 'trigger'}>
          <ListItemIcon>
            <SettingsInputAntennaIcon />
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: M.AppMenuBoard })} />
        </ListItem>
      </List>
      <List>
        <ListItem button component={Link} to="/config" selected={activeItem === 'config'}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: M.AppMenuSettings })} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleDrawerClose}>
          <ListItemIcon>
            { open ? <ChevronLeftIcon /> : <ChevronRightIcon />  }
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Menu
